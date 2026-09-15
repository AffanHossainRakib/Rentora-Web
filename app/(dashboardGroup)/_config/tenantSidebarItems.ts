import { ISidebarItem } from "@/lib/types";
import { ClipboardList, LayoutDashboard, Wallet } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/tenant-dashboard", icon: LayoutDashboard },
  {
    label: "My Requests",
    href: "/tenant-dashboard/requests",
    icon: ClipboardList,
  },
  { label: "Payments", href: "/tenant-dashboard/payments", icon: Wallet },
];
