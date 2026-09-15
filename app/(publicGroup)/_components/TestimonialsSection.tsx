import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Tenant, Dhaka",
    quote:
      "I found a studio near my office in two days. The whole request and payment process was smooth and I never had to deal with a broker.",
  },
  {
    name: "Karim Rahman",
    role: "Landlord, Dhaka",
    quote:
      "Listing my property took minutes and I could manage requests from my dashboard. Payments land through Stripe, no chasing tenants for cash.",
  },
  {
    name: "Rafiq Islam",
    role: "Tenant, Chittagong",
    quote:
      "Clear pricing, real photos, and I could see who I was renting from before requesting. Exactly what বাসা ভাড়া hunting needed.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            What People Are Saying
          </h2>
          <p className="mt-2 text-muted-foreground">
            Early feedback from tenants and landlords using Rentora.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="space-y-3 rounded-xl border p-5"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
