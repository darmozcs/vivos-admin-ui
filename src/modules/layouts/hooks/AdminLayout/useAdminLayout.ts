import { useStoreSettingsQuery } from "@/DAL";
import { resolveSessionRole } from "@/libs/http";
import { useUserStore } from "@/store";
import { USER_ROLE } from "@/types";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import {
  MENU_ITEMS_BY_ROLE,
  ROLE_LABEL_KEYS,
  SIDEBAR_VISIBLE_STORAGE_KEY,
} from "../../const/menu.const";

const EMAIL_DOMAIN_SEPARATOR = "@";

/** Shows only the part of the email before the "@" (e.g. "ana" for "ana@tienda.com"). */
const toDisplayName = (email: string | null) => email?.split(EMAIL_DOMAIN_SEPARATOR)[0] ?? "";

export const useAdminLayout = () => {
  const { t } = useTranslation("common");
  const [navbarOpened, { toggle, close }] = useDisclosure();
  // Desktop sidebar visibility is remembered between visits.
  const [desktopNavbarVisible, setDesktopNavbarVisible] = useLocalStorage({
    key: SIDEBAR_VISIBLE_STORAGE_KEY,
    defaultValue: true,
  });
  const email = useUserStore((state) => state.email);
  const roles = useUserStore((state) => state.roles);
  const role = resolveSessionRole(roles);
  const isStoreAdmin = role === USER_ROLE.ADMIN;
  // Only a store admin has a store; the super admin sees the app brand.
  const { data: settings } = useStoreSettingsQuery({ enabled: isStoreAdmin });

  return {
    menuItems: role ? MENU_ITEMS_BY_ROLE[role] : [],
    navbarOpened,
    desktopNavbarVisible,
    toggleDesktopNavbar: () => setDesktopNavbarVisible((visible) => !visible),
    toggleNavbar: toggle,
    closeNavbar: close,
    storeName: isStoreAdmin ? (settings?.storeName ?? "") : t("brand.name"),
    userName: toDisplayName(email),
    userRole: role ? ROLE_LABEL_KEYS[role] : "",
  };
};
