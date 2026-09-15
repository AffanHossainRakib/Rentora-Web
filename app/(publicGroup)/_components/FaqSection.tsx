import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I find a place to rent on Rentora?",
    answer:
      "Browse listings on the Properties page, filter by city, price, category and amenities, then send a rental request directly to the landlord with your move-in dates.",
  },
  {
    question: "How do I list my property as a landlord?",
    answer:
      "Create a landlord account, then add your property from your dashboard with photos, price, location and amenities. It's live immediately for tenants to find.",
  },
  {
    question: "Is payment on Rentora secure?",
    answer:
      "Yes. Payments are handled by Stripe Checkout. Rentora never sees or stores your card details.",
  },
  {
    question: "What happens after I submit a rental request?",
    answer:
      'The landlord reviews your request and approves or rejects it. Once approved, you\'ll see a "Pay Now" button on your dashboard to complete payment and activate the rental.',
  },
  {
    question: "Can I leave a review?",
    answer:
      "Yes, once your rental is marked completed you can leave a rating and review from your tenant dashboard.",
  },
  {
    question: "Does Rentora charge tenants or landlords a fee?",
    answer:
      "No broker fees. You pay the listed rent directly through Stripe when your request is approved.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
