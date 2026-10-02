export const business = {
  name: "ALEM TEFF LLC",
  email: "yalem68@yahoo.com",
  phone: "(919) 230-8713",
  phoneHref: "+19192308713",
  address: "Cary, NC",
  effectiveDate: "May 26, 2022",
};

export function getSiteUrl(env = process.env) {
  const configuredUrl = env.SITE_URL
    || (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`)
    || (env.VERCEL_URL && `https://${env.VERCEL_URL}`);

  if (!configuredUrl) {
    if (env.VERCEL || env.NODE_ENV === "production") {
      throw new Error("Set SITE_URL to the public HTTPS origin before building for production.");
    }
    console.warn("SITE_URL is not set. Using http://localhost:3000 for local SEO metadata only.");
    return "http://localhost:3000";
  }

  const url = new URL(configuredUrl);
  if (!["http:", "https:"].includes(url.protocol)
    || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, a path, query, or fragment.");
  }
  if ((env.VERCEL || env.NODE_ENV === "production") && url.protocol !== "https:") {
    throw new Error("Production SITE_URL must use HTTPS.");
  }
  return url.origin;
}
