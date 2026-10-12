import type { SidebarMenuItem } from "@/modules/common/components";
import { USER_ROLE, type UserRole } from "@/types";
import {
  IconBroadcast,
  IconBuildingStore,
  IconPlayerPlay,
  IconSettings,
  IconShoppingBag,
  IconUsers,
} from "@tabler/icons-react";

export const MENU_ITEMS_BY_ROLE: Record<UserRole, SidebarMenuItem[]> = {
  [USER_ROLE.SUPER_ADMIN]: [{ label: "menu.stores", to: "/stores", icon: IconBuildingStore }],
  [USER_ROLE.ADMIN]: [
    { label: "menu.clients", to: "/clients", icon: IconUsers },
    { label: "menu.sales", to: "/sales", icon: IconShoppingBag },
    { label: "menu.lives", to: "/lives", icon: IconBroadcast },
    { label: "menu.startLive", to: "/live", icon: IconPlayerPlay },
    { label: "menu.settings", to: "/settings", icon: IconSettings },
  ],
};

/** Translation key (common namespace) of each role, shown on the user card. */
export const ROLE_LABEL_KEYS: Record<UserRole, string> = {
  [USER_ROLE.SUPER_ADMIN]: "roles.superAdmin",
  [USER_ROLE.ADMIN]: "roles.admin",
};

export const NAVBAR_WIDTH = 260;
export const HEADER_HEIGHT = 56;
export const SIDEBAR_VISIBLE_STORAGE_KEY = "tienda-admin:sidebar-visible";
