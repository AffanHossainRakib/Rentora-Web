import { DASHBOARD_ROUTES } from "@/lib/utils";
import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";

const TenantDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  if (!user || user.role !== "TENANT") {
    redirect(user ? DASHBOARD_ROUTES[user.role] : "/login");
  }

  return children;
};

export default TenantDashboardLayout;
