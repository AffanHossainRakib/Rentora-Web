import { Separator } from "@/components/ui/separator";
import { IUser } from "@/lib/types";
import { DASHBOARD_ROUTES } from "@/lib/utils";
import Link from "next/link";
import { Logo } from "./logo";

const guestAccountLinks = [
  { label: "Login", href: "/login" },
  { label: "Create an account", href: "/register" },
  { label: "List your property", href: "/register?role=landlord" },
];

const exploreLinks = [
  { label: "Browse properties", href: "/properties" },
  { label: "About Rentora", href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function Footer({ user }: { user?: IUser | null }) {
  // Logged-in users get their dashboard instead of login/register links
  const accountLinks = user
    ? [{ label: "My dashboard", href: DASHBOARD_ROUTES[user.role] }]
    : guestAccountLinks;

  const groups = [
    { title: "Explore", links: exploreLinks },
    { title: "Account", links: accountLinks },
    { title: "Legal", links: legalLinks },
  ];

  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-3 sm:col-span-3 lg:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Rentora helps you find basha vara across Bangladesh — flats, houses,
            studios and hostels listed directly by landlords.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator />
      <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} Rentora. All rights reserved.
      </p>
    </footer>
  );
}
