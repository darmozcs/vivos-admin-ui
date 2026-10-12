import { NavLink, Stack } from "@mantine/core";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import classes from "./SidebarMenu.module.css";

export interface SidebarMenuItem {
  label: string;
  icon: ComponentType<{ size?: string | number; stroke?: number }>;
  to: LinkProps["to"];
  active?: boolean;
}

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  onNavigate?: () => void;
}

export const SidebarMenu = ({ items, onNavigate }: SidebarMenuProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack component="nav" gap={4} aria-label={t("menu.ariaLabel")}>
      {items.map((item) => (
        <NavLink
          key={item.label}
          component={Link}
          to={item.to}
          label={t(item.label)}
          leftSection={<item.icon size={20} stroke={1.8} />}
          active={item.active}
          aria-current={item.active ? "page" : undefined}
          onClick={onNavigate}
          className={classes.link}
        />
      ))}
    </Stack>
  );
};
