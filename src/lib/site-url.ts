function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredUrl) return undefined;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" || url.protocol === "http:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export const siteUrl = resolveSiteUrl();

export function absoluteCanonical(pathname: string) {
  return siteUrl ? new URL(pathname, siteUrl) : undefined;
}
