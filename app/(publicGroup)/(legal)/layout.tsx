import Link from "next/link";

const CONTACT_EMAIL = "affanhossainrakib@gmail.com";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight sm:[&_h1]:text-4xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_li]:mt-1.5 [&_p]:mt-3 [&_p]:leading-7 [&_p]:text-muted-foreground [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:p-2 [&_td]:align-top [&_th]:p-2 [&_th]:text-left [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-muted-foreground">
      {children}

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>,{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> and{" "}
        <Link href="/refund-policy">Refund Policy</Link>.
      </p>
    </article>
  );
};

export default LegalLayout;
