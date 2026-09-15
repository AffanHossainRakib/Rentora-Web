import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { DASHBOARD_ROUTES } from "@/lib/utils";
import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";

const AuthGroupLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  if (user) {
    redirect(DASHBOARD_ROUTES[user.role]);
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-muted/30 px-4 py-12">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthGroupLayout;
