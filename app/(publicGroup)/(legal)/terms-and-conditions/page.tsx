import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The rules for using Rentora to list, request and pay for rental properties in Bangladesh.",
  alternates: { canonical: "/terms-and-conditions" },
};

const TermsAndConditionsPage = () => {
  return (
    <>
      <h1>Terms &amp; Conditions</h1>
      <p>Last updated: September 14, 2026</p>
      <p>
        These terms govern your use of Rentora. By creating an account or using
        the site you agree to them. If you do not agree, please do not use
        Rentora.
      </p>

      <h2>1. What Rentora is</h2>
      <p>
        Rentora is an online platform that connects tenants with landlords. We
        are not a real estate broker and we are not a party to the rental
        arrangement between a tenant and a landlord. Landlords are responsible
        for their listings and their properties.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>
          You must be at least 18 years old and give accurate information.
        </li>
        <li>You choose a tenant or landlord account when you register.</li>
        <li>
          You are responsible for keeping your password safe and for everything
          done through your account.
        </li>
      </ul>

      <h2>3. Landlords</h2>
      <ul>
        <li>You must own the property or have the right to rent it out.</li>
        <li>
          Listings must be accurate: price, location, category, amenities,
          availability and photos.
        </li>
        <li>Only upload images you have the right to use.</li>
        <li>
          Respond to rental requests honestly and keep availability up to date.
        </li>
      </ul>

      <h2>4. Tenants and rental requests</h2>
      <ul>
        <li>
          A rental request is an expression of interest, not a binding
          agreement.
        </li>
        <li>The landlord decides whether to approve or reject a request.</li>
        <li>
          After approval, the tenant can pay through Rentora&apos;s checkout. A
          rental becomes active once the payment is confirmed.
        </li>
        <li>
          Any separate lease or tenancy agreement, deposits and house rules are
          between the tenant and the landlord.
        </li>
      </ul>

      <h2>5. Payments</h2>
      <p>
        Payments are processed by Stripe. The amount is shown before you confirm
        checkout. By paying you also agree to Stripe&apos;s terms. Refunds are
        handled under our <Link href="/refund-policy">Refund Policy</Link>.
      </p>

      <h2>6. Reviews</h2>
      <p>
        Tenants can review a property after a completed rental, once per rental.
        Reviews must be honest and based on your own experience. We may remove
        reviews that are abusive, false, off-topic or that share someone&apos;s
        private information.
      </p>

      <h2>7. Prohibited conduct</h2>
      <ul>
        <li>
          Fake, misleading or duplicate listings, or listings for property you
          cannot rent.
        </li>
        <li>
          Fraud, scams, or asking users to pay outside the platform to avoid our
          checkout.
        </li>
        <li>Harassment, discrimination, or hateful content.</li>
        <li>
          Accessing other accounts, scraping the site, or disrupting its
          operation.
        </li>
      </ul>

      <h2>8. Moderation and suspension</h2>
      <p>
        Rentora administrators may remove content and suspend or ban accounts
        that break these terms or put other users at risk.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        The Rentora name, logo and site design belong to Rentora. You keep
        ownership of content you post, and you give us permission to display it
        on Rentora to operate the service.
      </p>

      <h2>10. Disclaimers and liability</h2>
      <p>
        Listings are provided by landlords, and we do not guarantee their
        accuracy, the condition of any property or the conduct of any user.
        Rentora is provided &quot;as is&quot;. To the extent permitted by law,
        Rentora is not liable for indirect or consequential losses arising from
        your use of the platform or from any rental arrangement.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of Bangladesh, and disputes are
        subject to the courts of Dhaka.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these terms. Continuing to use Rentora after an update
        means you accept the new terms.
      </p>
    </>
  );
};

export default TermsAndConditionsPage;
