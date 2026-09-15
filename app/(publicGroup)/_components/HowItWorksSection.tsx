import { CreditCard, KeyRound, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description:
      "Find flats, houses, studios and hostels by city, price and category.",
  },
  {
    icon: KeyRound,
    title: "Request to Rent",
    description:
      "Send your move-in dates directly to the landlord, no broker needed.",
  },
  {
    icon: ShieldCheck,
    title: "Get Approved",
    description: "The landlord reviews your request and responds.",
  },
  {
    icon: CreditCard,
    title: "Pay & Move In",
    description: "Pay securely online through Stripe once you're approved.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t bg-muted/30 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            How Rentora Works
          </h2>
          <p className="mt-2 text-muted-foreground">
            From search to move-in, in four simple steps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="space-y-2 rounded-xl border bg-background p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <p className="text-xs font-semibold text-primary">
                Step {index + 1}
              </p>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
