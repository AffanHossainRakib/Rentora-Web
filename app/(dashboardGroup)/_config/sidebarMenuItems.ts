import { IRole, ISidebarItem } from "@/lib/types";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebarItems";
import { TENANT_SIDEBAR_ITEMS } from "./tenantSidebarItems";

export const sidebarMenuItems: Record<IRole, ISidebarItem[]> = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
