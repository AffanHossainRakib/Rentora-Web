import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Rentora collects, uses and protects the personal data of tenants and landlords in Bangladesh.",
  alternates: { canonical: "/privacy-policy" },
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last updated: September 14, 2026</p>
      <p>
        Rentora (&quot;we&quot;, &quot;us&quot;) runs an online marketplace
        where tenants find rental properties in Bangladesh and landlords list
        them. This policy explains what personal data we collect, why we collect
        it and the choices you have.
      </p>

      <h2>1. Data we collect</h2>
      <h3>Data you give us</h3>
      <ul>
        <li>
          <strong>Account details:</strong> name, email address, password and
          whether you join as a tenant or a landlord. Passwords are stored only
          as a one-way hash.
        </li>
        <li>
          <strong>Profile details (optional):</strong> a short bio and a profile
          picture link.
        </li>
        <li>
          <strong>Listings:</strong> property title, description, location,
          price, category, amenities, availability and image links that
          landlords publish.
        </li>
        <li>
          <strong>Rental requests:</strong> the property you request and your
          start and end dates.
        </li>
        <li>
          <strong>Reviews:</strong> the rating and text you write after a
          completed rental.
        </li>
      </ul>
      <h3>Data created when you pay</h3>
      <ul>
        <li>
          Payment amount, currency, status, date and the Stripe reference for
          the transaction.
        </li>
        <li>
          Card details are entered on Stripe&apos;s secure checkout page and are{" "}
          <strong>never sent to or stored by Rentora</strong>.
        </li>
      </ul>
      <h3>Data collected automatically</h3>
      <ul>
        <li>
          Sign-in cookies that keep you logged in (see our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>).
        </li>
        <li>
          Standard server logs kept by our hosting providers, such as IP
          address, browser type and request time, used for security and
          troubleshooting.
        </li>
      </ul>

      <h2>2. How we use your data</h2>
      <ul>
        <li>To create and secure your account and keep you signed in.</li>
        <li>
          To show listings, process rental requests and let landlords approve or
          reject them.
        </li>
        <li>To take payments for approved rentals and keep payment records.</li>
        <li>To publish reviews that help other tenants decide.</li>
        <li>
          To keep the platform safe: preventing fraud, enforcing our{" "}
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and
          suspending abusive accounts.
        </li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>

      <h2>3. Who can see your data</h2>
      <ul>
        <li>
          <strong>Other users:</strong> listings are public. When you send a
          rental request, the landlord of that property can see the request.
          Published reviews are public.
        </li>
        <li>
          <strong>Rentora administrators:</strong> can view accounts, listings
          and rentals to moderate the platform.
        </li>
        <li>
          <strong>Service providers:</strong> Stripe (payments) and our cloud
          hosting and database providers, who process data only to run Rentora.
        </li>
        <li>
          <strong>Authorities:</strong> when the law requires it or to protect
          the rights and safety of our users.
        </li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>4. How long we keep it</h2>
      <p>
        We keep account data while your account is active. Payment records may
        be kept longer where accounting or legal rules require it. When data is
        no longer needed we delete or anonymise it.
      </p>

      <h2>5. Security</h2>
      <p>
        We use HTTPS, hashed passwords and HttpOnly sign-in cookies that page
        scripts cannot read. No system is perfectly secure, so please use a
        strong, unique password.
      </p>

      <h2>6. Your choices and rights</h2>
      <ul>
        <li>Update your profile details from your account.</li>
        <li>
          Ask us for a copy of your data, to correct it or to delete your
          account.
        </li>
        <li>
          Block cookies in your browser (you will not be able to sign in).
        </li>
      </ul>

      <h2>7. Children</h2>
      <p>
        Rentora is not intended for anyone under 18, and we do not knowingly
        collect their data.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy. We will change the &quot;Last updated&quot;
        date above and, for significant changes, let signed-in users know.
      </p>
    </>
  );
};

export default PrivacyPolicyPage;
