import { ISidebarItem } from "@/lib/types";
import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  Tag,
  Users,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin-dashboard/users", icon: Users },
  { label: "Properties", href: "/admin-dashboard/properties", icon: Building2 },
  { label: "Rentals", href: "/admin-dashboard/rentals", icon: ClipboardList },
  { label: "Categories", href: "/admin-dashboard/categories", icon: Tag },
];
