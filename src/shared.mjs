import { business } from "../site.config.mjs";

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

export function icon(name, className = "") {
  return `<svg class="icon ${className}" width="24" height="24" aria-hidden="true" focusable="false"><use href="/assets/icons.svg#${name}"></use></svg>`;
}

export function brand() {
  return `<a class="brand" href="/" aria-label="${escapeHtml(business.name)} home">
    <svg class="brand-mark" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" focusable="false">
      <rect width="44" height="44" rx="11" fill="currentColor"/>
      <path d="M11 32 20 11h5l9 21h-7l-5-13-5 13Z" fill="#fff"/>
      <path d="M21 25h3v3h-3zm0 5h3v3h-3z" fill="#e9a15f"/>
    </svg>
    <span class="brand-type"><strong>${escapeHtml(business.name)}</strong><span>TRANSPORTATION &amp; LOGISTICS</span></span>
  </a>`;
}

export const navigation = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

export function contactLinks() {
  return `<a href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)}</a>
    <a href="tel:${escapeHtml(business.phoneHref)}">${escapeHtml(business.phone)}</a>`;
}

export function button(label, href, secondary = false) {
  return `<a class="button${secondary ? " button-secondary" : ""}" href="${href}">${label}${icon("arrow")}</a>`;
}

export function pageIntro(eyebrow, title, description) {
  return `<section class="page-intro"><div class="container">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="page-lead">${description}</p>
  </div></section>`;
}

export function callToAction() {
  return `<section class="cta-section"><div class="container cta-panel">
    <div><p class="eyebrow">LET'S TALK LOGISTICS</p><h2>Tell us what needs<br>to move.</h2>
    <p>Start a conversation about your shipment, timing, and transportation requirements.</p></div>
    ${button("Get in touch", "/contact")}
  </div></section>`;
}

export function renderDocument(page, siteUrl) {
  const canonical = `${siteUrl}${page.path}`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: siteUrl,
    email: business.email,
    telephone: business.phoneHref,
  }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#17332f">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  ${page.noindex ? '<meta name="robots" content="noindex">' : ""}
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(business.name)}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/site.js" defer></script>
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      ${brand()}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" hidden>
        <span class="menu-label">Open menu</span>${icon("menu", "menu-open-icon")}${icon("close", "menu-close-icon")}
      </button>
      <nav id="site-navigation" class="site-navigation" aria-label="Main navigation">
        ${navigation.map(({ path, label }) => `<a href="${path}"${page.path === path ? ' aria-current="page"' : ""}>${label}</a>`).join("\n        ")}
        <a class="nav-contact" href="mailto:${escapeHtml(business.email)}">Let's talk ${icon("arrow")}</a>
      </nav>
    </div>
  </header>
  <main id="main-content" tabindex="-1">${page.content}</main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">${brand()}<p>Dependable communication.<br>Thoughtful coordination.<br>Transportation for business.</p></div>
        <nav aria-label="Footer navigation"><h2>Explore</h2>${navigation.map(({ path, label }) => `<a href="${path}">${label}</a>`).join("")}</nav>
        <div class="footer-contact"><h2>Get in touch</h2>${contactLinks()}<a class="footer-contact-link" href="/contact">Contact details ${icon("arrow")}</a></div>
      </div>
      <div class="footer-bottom">
        <p>Copyright &copy; ${new Date().getFullYear()} ${escapeHtml(business.name)}. All rights reserved.</p>
        <nav aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms &amp; Conditions</a></nav>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}
