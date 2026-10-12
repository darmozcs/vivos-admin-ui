import { LogoutButtonContainer } from "@/modules/auth/containers";
import type { SidebarMenuItem } from "@/modules/common/components";
import {
  LanguageMenuContainer,
  SidebarMenuContainer,
} from "@/modules/common/containers";
import { AppShell, Box, Burger, Group, Stack } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HEADER_HEIGHT, NAVBAR_WIDTH } from "../../const/menu.const";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarToggle } from "./SidebarToggle";
import { SidebarUserCard } from "./SidebarUserCard";

interface AdminLayoutProps {
  menuItems: SidebarMenuItem[];
  navbarOpened: boolean;
  desktopNavbarVisible: boolean;
  onToggleDesktopNavbar: () => void;
  onToggleNavbar: () => void;
  onCloseNavbar: () => void;
  storeName: string;
  userName: string;
  userRole: string;
}

export const AdminLayout = ({
  menuItems,
  navbarOpened,
  desktopNavbarVisible,
  onToggleDesktopNavbar,
  onToggleNavbar,
  onCloseNavbar,
  storeName,
  userName,
  userRole,
}: AdminLayoutProps) => {
  const { t } = useTranslation("common");

  return (
    <AppShell
      layout="alt"
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened, desktop: !desktopNavbarVisible },
      }}
      padding={0}
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md" justify="space-between">
          <Burger
            opened={navbarOpened}
            onClick={onToggleNavbar}
            hiddenFrom="sm"
            size="sm"
            aria-label={t("menu.toggle")}
          />
          <SidebarToggle
            visible={desktopNavbarVisible}
            onToggle={onToggleDesktopNavbar}
          />
          <Box flex={1} />
          <LanguageMenuContainer />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} bg="blossom.5" px="md" py="xl">
        <Stack h="100%" gap="xl">
          <Group justify="space-between" wrap="nowrap">
            <SidebarBrand storeName={storeName} />
            <Burger
              opened={navbarOpened}
              onClick={onToggleNavbar}
              hiddenFrom="sm"
              size="sm"
              aria-label={t("menu.toggle")}
            />
          </Group>
          <SidebarMenuContainer items={menuItems} onNavigate={onCloseNavbar} />
          <Box flex={1} />
          <Stack gap={4}>
            <SidebarUserCard name={userName} role={userRole} />
            <LogoutButtonContainer />
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box px={{ base: "md", md: "xl" }} pb="xl" pt="xs">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
