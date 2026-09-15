"use client";

import { Logo } from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IUser } from "@/lib/types";
import { logout } from "@/service/logout";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

const DASHBOARD_ROOTS = new Set([
  "/tenant-dashboard",
  "/landlord-dashboard",
  "/admin-dashboard",
]);

const isItemActive = (pathname: string, href: string) =>
  DASHBOARD_ROOTS.has(href)
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

export function DashboardSidebar({ user }: { user: IUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = sidebarMenuItems[user.role];

  const handleLogout = async () => {
    await logout();
    toast.success("You've been logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-3">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isItemActive(pathname, item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
