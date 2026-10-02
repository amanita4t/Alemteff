import { cp, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { getSiteUrl } from "../site.config.mjs";
import { pages, notFoundPage } from "../src/pages.mjs";
import { escapeHtml, renderDocument } from "../src/shared.mjs";

const output = fileURLToPath(new URL("../dist/", import.meta.url));
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const siteUrl = getSiteUrl();

await mkdir(output, { recursive: true });
await cp(publicDirectory, output, { recursive: true });
await Promise.all([...pages, notFoundPage].map((page) => {
  const filename = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  return writeFile(join(output, filename), renderDocument(page, siteUrl));
}));
await writeFile(join(output, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${escapeHtml(`${siteUrl}${page.path}`)}</loc></url>`).join("\n")}
</urlset>
`);
console.log(`Built ${pages.length} public pages, a 404 page, and SEO assets in dist.`);
