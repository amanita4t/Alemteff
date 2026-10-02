import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { business, getSiteUrl } from "../site.config.mjs";

const routes = ["/", "/about", "/services", "/contact", "/privacy-policy", "/terms-and-conditions"];

for (const route of routes) {
  test(`${route} is accessible, responsive, and directly reachable`, async ({ page, request }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/ALEM TEFF LLC/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `http://localhost:3000${route}`);
    await expect(page.locator("footer").getByRole("link", { name: "Privacy Policy", exact: true })).toHaveAttribute("href", "/privacy-policy");
    await expect(page.locator("footer").getByRole("link", { name: "Terms & Conditions", exact: true })).toHaveAttribute("href", "/terms-and-conditions");

    const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")));
    for (const href of new Set(links)) {
      if (href.startsWith("#")) {
        await expect(page.locator(href)).toHaveCount(1);
      } else if (href.startsWith("/")) {
        expect((await request.get(href)).status(), href).toBe(200);
      } else {
        expect([`mailto:${business.email}`, `tel:${business.phoneHref}`]).toContain(href);
      }
    }
    const assets = await page.locator('link[rel="stylesheet"], link[rel="icon"], script[src], img[src]').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("href") || node.getAttribute("src")));
    for (const asset of assets) {
      expect((await request.get(asset)).status(), asset).toBe(200);
    }
    expect(await page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("navigation works by keyboard and identifies the current page", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  const toggle = page.locator(".menu-toggle");
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("Close menu");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  if (await page.locator(".menu-toggle").isVisible()) {
    await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
    await page.locator(".menu-toggle").click();
  }
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toHaveAttribute("aria-current", "page");
});

test("contact is functional without collecting website SMS consent", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("main").getByRole("link", { name: business.email, exact: true })).toHaveAttribute("href", `mailto:${business.email}`);
  await expect(page.locator("main").getByRole("link", { name: business.phone, exact: true })).toHaveAttribute("href", `tel:${business.phoneHref}`);
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("For SMS communications, consent is obtained directly through business phone conversations. The website is not used to collect SMS opt-in consent for this campaign.");
  await expect(page.locator("main")).toContainText(business.address);
});

test("privacy and terms retain the required SMS protections", async ({ page }) => {
  await page.goto("/privacy-policy");
  for (const text of [
    "ALEM TEFF LLC does not sell or rent mobile telephone numbers or SMS opt-in information.",
    "Mobile phone numbers and SMS consent information will not be shared with third parties or affiliates for their own marketing or promotional purposes.",
    "Text messaging originator opt-in data and consent will not be shared with third parties for their own marketing purposes.",
    "We do not use SMS consent obtained for ALEM TEFF LLC to authorize another company to send messages to the individual.",
    "mobile telephone numbers and SMS opt-in information will not be sold, rented, or shared with third parties or affiliates for their own marketing or promotional purposes.",
    "Mobile phone numbers and SMS opt-in/consent information will not be provided to third parties for their own marketing or promotional purposes.",
  ]) {
    await expect(page.locator("main")).toContainText(text);
  }
  for (const route of ["/privacy-policy", "/terms-and-conditions"]) {
    await page.goto(route);
    for (const text of ["STOP", "HELP", "Message and data rates may apply.", "Message frequency varies", "SMS consent is obtained through direct business communications, including verbal consent when applicable."]) {
      await expect(page.locator("main")).toContainText(text);
    }
  }
  await expect(page.locator("main")).toContainText("SMS consent is not a condition of purchasing goods or services.");
  await expect(page.locator("main")).toContainText("The ALEM TEFF LLC website is not used as the SMS opt-in mechanism for this campaign.");
  await page.locator("main").getByRole("link", { name: "Privacy Policy", exact: true }).click();
  await expect(page).toHaveURL(/\/privacy-policy$/);
});

test("clean URL redirects, real 404s, and crawler assets are correct", async ({ request }) => {
  for (const route of routes.filter((route) => route !== "/")) {
    for (const suffix of [".html", "/"]) {
      const redirect = await request.get(`${route}${suffix}`, { maxRedirects: 0 });
      expect(redirect.status()).toBe(308);
      expect(redirect.headers().location).toBe(route);
    }
  }
  const missing = await request.get("/this-page-does-not-exist");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("Back to home");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const sitemapText = await sitemap.text();
  expect((sitemapText.match(/<loc>/g) || []).length).toBe(6);
  for (const route of routes) expect(sitemapText).toContain(`<loc>http://localhost:3000${route}</loc>`);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: http://localhost:3000/sitemap.xml");
  const deployment = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  expect(deployment.cleanUrls).toBe(true);
  expect(deployment.trailingSlash).toBe(false);
  expect(deployment.outputDirectory).toBe("dist");
});

test("all pages reflow on narrow screens and with enlarged text", async ({ page }) => {
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${route} at ${width}px`).toBeLessThanOrEqual(width);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${route} with enlarged text`).toBeLessThanOrEqual(390);
  }
});

test("content and navigation remain available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact", exact: true })).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".menu-toggle")).toBeHidden();
  }
  await context.close();
});

test("reduced motion preference is respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("deployment URLs use a real configurable origin", () => {
  expect(getSiteUrl({ SITE_URL: "https://example.com/" })).toBe("https://example.com");
  expect(getSiteUrl({ VERCEL: "1", VERCEL_PROJECT_PRODUCTION_URL: "production.vercel.app", VERCEL_URL: "preview.vercel.app" })).toBe("https://production.vercel.app");
  expect(() => getSiteUrl({ NODE_ENV: "production" })).toThrow(/SITE_URL/);
  expect(() => getSiteUrl({ SITE_URL: "https://example.com/subpath" })).toThrow(/origin/);
  expect(() => getSiteUrl({ SITE_URL: "http://example.com", VERCEL: "1" })).toThrow(/HTTPS/);
  expect(() => getSiteUrl({ SITE_URL: "https://user:password@example.com" })).toThrow(/credentials/);
});
