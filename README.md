# ALEM TEFF LLC

A fast, responsive, six-page transportation and logistics website. It uses semantic HTML, CSS, and a small vanilla JavaScript navigation script. A dependency-free Node.js build shares the header, footer, business information, and legal layouts across fully rendered static pages. No React runtime, database, API keys, analytics, cookies, or third-party fonts are included.

## Run locally

Use Node.js 22 or later.

```powershell
npm run dev
```

Open `http://127.0.0.1:3000`. This builds the site and starts a loopback-only preview server with clean URL routing. After editing source files, stop the server and run the command again; there is no file watcher. The build and preview commands do not require installed packages.

```powershell
npm run build
npm run preview
```

The generated `dist` directory is the complete deployable website. Do not edit it directly.

## Edit business information and content

| File | Purpose |
| --- | --- |
| `site.config.mjs` | Shared business name, email, displayed phone, `tel:` number, address, and legal effective date |
| `src/pages.mjs` | All six page bodies, services, and the complete privacy and terms language |
| `src/shared.mjs` | HTML metadata, shared navigation, footer, logo, and layout helpers |
| `public/assets/styles.css` | Colors, typography, responsive layouts, focus styles, and reduced-motion support |
| `public/assets/site.js` | Accessible, progressively enhanced mobile navigation |
| `public/assets/freight.svg` | Original generic freight illustration; not a representation of company-owned equipment |
| `public/favicon.svg` | Site icon |
| `scripts/build.mjs` | Generates HTML, `robots.txt`, and `sitemap.xml` |

The supplied email and telephone number are configured centrally. Update both `phone` and `phoneHref` if the number changes. The phone URI uses international format, without punctuation.

The business address is listed as Cary, NC; no street address is supplied.

**Before launch:** replace `[DATE]` in `site.config.mjs` with the chosen policy effective date. Review all business descriptions and legal policies against actual operations. The copyright year is generated at build time.

## Publishing the repository

The authoring prompt is archived outside the repository. `.gitignore` also excludes `prompt.md` if it is copied back, along with local environment files, installed dependencies, generated output, and browser-test artifacts.

Publish the source files, public assets, `package-lock.json`, tests, and project configuration to GitHub. Do not commit `dist`; Vercel generates it during deployment. Store production environment variables in Vercel project settings, not in committed files.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Select **Other** as the framework if prompted. `vercel.json` sets `npm run build` and the output directory `dist`.
3. Set the production environment variable `SITE_URL` to the actual HTTPS origin, without a path, query, or fragment. For example, use `https://` followed by your verified domain. Do not use a made-up domain.
4. Deploy, then check the live routes below and their navigation links. No functions or additional infrastructure are required.

Vercel serves the site over HTTPS. With `cleanUrls: true` and `trailingSlash: false`, the generated HTML files are available directly at:

```text
/
/about
/services
/contact
/privacy-policy
/terms-and-conditions
```

The project also supplies a custom `404.html`. Missing routes are not rewritten to the homepage.

`SITE_URL` controls canonical links, Open Graph URLs, organization metadata, and the sitemap. When unset on Vercel, the build uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`. Set `SITE_URL` explicitly after attaching a custom domain and redeploy. A local build without a domain uses `http://localhost:3000` and prints a warning; do not upload that local output as a production build. Production builds without an origin or with a non-HTTPS origin fail explicitly.

The sitemap contains all six public pages. `robots.txt` permits crawling and points to that sitemap. Neither file makes private deployment URLs public: disable deployment-level authentication for the final public production website if it has been enabled.

## Contact and SMS consent

The Contact page uses working telephone and email links, not a pretend submission form. There is no server-side form endpoint and no collection of website SMS opt-ins or phone numbers.

Consent for this campaign is obtained through direct business telephone conversations. The Contact page states this explicitly. Privacy and terms are public and linked from every footer, including the homepage. Their SMS sections retain the supplied non-selling and non-sharing protections, verbal-consent language, STOP and HELP instructions, variable frequency, possible message/data rates, and the statement that consent is not a condition of purchase.

Do not add automatic SMS enrollment, replace these protections with conflicting marketing language, or imply that publishing this website grants messaging-program approval. Registration decisions remain with the provider and carriers.

## Browser checks

Development dependencies are used only for browser tests, not the deployed site.

```powershell
npm ci
npx playwright install chromium
npm test
```

If Chrome or Edge is already installed, you can skip the Chromium download and select the installed browser instead:

```powershell
$env:PLAYWRIGHT_CHANNEL = "chrome"
npm test
```

Use `"msedge"` for Edge. Remove the environment variable to return to Playwright's bundled Chromium.

The suite starts its own local server on port 3000. Stop any preview server on that port first. To run only one device profile:

```powershell
npm test -- --project=mobile
```

Tests cover all six direct URLs, every internal navigation and policy link, contact destinations, the required SMS language, SEO assets, 404s, clean URL redirects, image loading, keyboard navigation, JavaScript-disabled operation, reduced motion, horizontal reflow, enlarged text, and automated axe accessibility checks on desktop, tablet, and mobile Chromium profiles. Automated checks supplement, rather than replace, final review in actual devices and a review of the published policies.
