import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and browser storage Rentora uses and how you can control them.",
};

const storageItems = [
  {
    name: "accessToken",
    type: "Cookie (HttpOnly)",
    purpose: "Proves you are signed in on each request.",
    duration: "1 day",
  },
  {
    name: "refreshToken",
    type: "Cookie (HttpOnly)",
    purpose: "Keeps you signed in by renewing the access token.",
    duration: "7 days",
  },
  {
    name: "theme",
    type: "Local storage",
    purpose: "Remembers your light or dark mode choice.",
    duration: "Until you clear it",
  },
];

const CookiePolicyPage = () => {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p>Last updated: September 14, 2026</p>
      <p>
        Cookies are small files a website stores in your browser. This page
        lists the cookies and similar storage Rentora uses.
      </p>

      <h2>1. What we use</h2>
      <p>
        Rentora only uses storage that is necessary for the site to work. We do
        not use advertising or tracking cookies.
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table>
          <thead className="bg-muted/50">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {storageItems.map((item) => (
              <tr key={item.name}>
                <td className="font-mono">{item.name}</td>
                <td>{item.type}</td>
                <td>{item.purpose}</td>
                <td className="whitespace-nowrap">{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>2. Third-party cookies</h2>
      <p>
        When you pay, you are sent to Stripe&apos;s checkout page. Stripe may
        set its own cookies there for security and fraud prevention, under
        Stripe&apos;s own privacy and cookie policies.
      </p>

      <h2>3. Managing cookies</h2>
      <p>
        You can view, block or delete cookies in your browser settings. If you
        block Rentora&apos;s sign-in cookies you can still browse listings, but
        you will not be able to log in. Signing out removes the sign-in cookies.
      </p>

      <h2>4. Changes</h2>
      <p>
        If we add new cookies, such as for analytics, we will update this page
        first.
      </p>
    </>
  );
};

export default CookiePolicyPage;
