export { cn } from "cn";

// Public site origin: used for metadataBase, sitemap, robots and JSON-LD
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
