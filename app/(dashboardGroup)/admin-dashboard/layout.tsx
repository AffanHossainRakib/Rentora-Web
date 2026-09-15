import { DASHBOARD_ROUTES } from "@/lib/utils";
import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  if (!user || user.role !== "ADMIN") {
    redirect(user ? DASHBOARD_ROUTES[user.role] : "/login");
  }

  return children;
};

export default AdminDashboardLayout;
