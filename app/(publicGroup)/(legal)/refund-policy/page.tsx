import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "When and how rental payments made on Rentora can be refunded.",
};

const RefundPolicyPage = () => {
  return (
    <>
      <h1>Refund Policy</h1>
      <p>Last updated: September 14, 2026</p>
      <p>
        This policy explains what happens to payments for rentals booked through
        Rentora. It applies together with our{" "}
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>

      <h2>1. Before you pay</h2>
      <ul>
        <li>Sending a rental request is free.</li>
        <li>
          You are only asked to pay after a landlord approves your request.
        </li>
        <li>If you cancel on the checkout page, you are not charged.</li>
      </ul>

      <h2>2. When you are eligible for a full refund</h2>
      <ul>
        <li>You were charged more than once for the same rental.</li>
        <li>The landlord cancels the rental before your start date.</li>
        <li>
          The property is materially different from its listing, and you report
          it before or on your start date.
        </li>
      </ul>

      <h2>3. Other refund requests</h2>
      <p>
        If you change your mind after paying, contact us within 7 days of
        payment and before your rental start date. We review each request with
        the landlord and may offer a full or partial refund. Refunds are
        generally not available once a rental has started.
      </p>

      <h2>4. How refunds are paid</h2>
      <p>
        Approved refunds go back to the original card through Stripe. Stripe
        usually takes 5–10 business days for the money to appear, depending on
        your bank.
      </p>

      <h2>5. How to request a refund</h2>
      <p>
        Email us with your account email, the property name and the date of
        payment. We aim to reply within 3 business days.
      </p>
    </>
  );
};

export default RefundPolicyPage;
