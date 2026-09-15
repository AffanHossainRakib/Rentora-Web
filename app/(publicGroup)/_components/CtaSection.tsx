import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="border-t bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to find your next home?
        </h2>
        <p className="mt-2 text-primary-foreground/80">
          Join tenants and landlords across Bangladesh already using Rentora.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/register?role=landlord">List Your Property</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
