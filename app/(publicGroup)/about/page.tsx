import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Building2, CreditCard, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "../_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Rentora",
  description:
    "Rentora is a rental marketplace connecting tenants and landlords across Bangladesh, with secure online payments and verified listings.",
  alternates: { canonical: "/about" },
};

const steps = [
  {
    icon: KeyRound,
    title: "Browse & search",
    description:
      "Search flats, houses, studios and hostels by city, price and category, with real listings from landlords.",
  },
  {
    icon: Building2,
    title: "Request to rent",
    description:
      "Submit a rental request with your move-in dates directly to the landlord.",
  },
  {
    icon: ShieldCheck,
    title: "Get approved",
    description: "The landlord reviews and approves or rejects your request.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description:
      "Once approved, pay online through Stripe Checkout to activate your rental.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="space-y-3">
        <Badge variant="outline">About Rentora</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A rental marketplace built for Bangladesh
        </h1>
        <p className="text-lg text-muted-foreground">
          Rentora connects tenants looking for বাসা ভাড়া with landlords listing
          flats, houses, studios and hostels across Bangladesh. No brokers, no
          guesswork — just verified listings and a secure way to pay.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step.title} className="space-y-2 rounded-xl border p-4">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </span>
            <h2 className="font-semibold">{step.title}</h2>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold">Three roles, one platform</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Tenants</strong> browse
            listings, submit rental requests, pay securely and leave reviews
            after their stay.
          </li>
          <li>
            <strong className="text-foreground">Landlords</strong> list
            properties, manage availability and approve or reject rental
            requests.
          </li>
          <li>
            <strong className="text-foreground">Admins</strong> moderate
            listings, manage users and oversee the platform.
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/properties">Browse properties</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/register?role=landlord">List your property</Link>
        </Button>
      </div>
    </div>
  );
}
