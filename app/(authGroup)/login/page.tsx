import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to Rentora to manage your rental requests, listings and payments.",
  robots: { index: false, follow: true },
};

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  const { redirectTo } = await searchParams;

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Log in to continue finding or managing your basha vara.
        </p>
      </div>

      <LoginForm
        redirectTo={typeof redirectTo === "string" ? redirectTo : ""}
      />

      <p className="text-center text-sm text-muted-foreground">
        New to Rentora?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
