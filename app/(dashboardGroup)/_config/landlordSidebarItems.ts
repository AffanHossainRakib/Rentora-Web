import { ISidebarItem } from "@/lib/types";
import { Building2, ClipboardList, LayoutDashboard } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
  {
    label: "Properties",
    href: "/landlord-dashboard/properties",
    icon: Building2,
  },
  {
    label: "Requests",
    href: "/landlord-dashboard/requests",
    icon: ClipboardList,
  },
];
