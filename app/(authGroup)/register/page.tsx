import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Join Rentora as a tenant to find বাসা ভাড়া, or as a landlord to list your property in Bangladesh.",
  robots: { index: false, follow: true },
};

const RegisterPage = async ({ searchParams }: PageProps<"/register">) => {
  const { role } = await searchParams;

  return (
    <div className="w-full max-w-lg space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Find your next home or list your property in minutes.
        </p>
      </div>

      <RegisterForm defaultRole={role === "landlord" ? "LANDLORD" : "TENANT"} />

      <p className="text-center text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <Link
          href="/terms-and-conditions"
          className="text-primary hover:underline"
        >
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
