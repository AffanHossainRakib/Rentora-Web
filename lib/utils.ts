export { cn } from "cn";

// Public site origin: used for metadataBase, sitemap, robots and JSON-LD
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const DASHBOARD_ROUTES = {
  TENANT: "/tenant-dashboard",
  LANDLORD: "/landlord-dashboard",
  ADMIN: "/admin-dashboard",
} as const;

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const isValidImageUrl = (url?: string | null): url is string => {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "res.cloudinary.com" &&
      (!CLOUDINARY_CLOUD_NAME ||
        parsed.pathname.startsWith(`/${CLOUDINARY_CLOUD_NAME}/`))
    );
  } catch {
    return false;
  }
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const propertyHref = (property: {
  id: string;
  title: string;
  location: string;
}) =>
  `/properties/${slugify(`${property.title} ${property.location}`)}-${property.id}`;

const UUID_AT_END =
  /-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

export const extractIdFromSlug = (slug: string) =>
  slug.match(UUID_AT_END)?.[1] ?? null;

export const formatCurrency = (amount: number, currency: string = "BDT") =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", { dateStyle: "medium" }).format(
    new Date(date),
  );
