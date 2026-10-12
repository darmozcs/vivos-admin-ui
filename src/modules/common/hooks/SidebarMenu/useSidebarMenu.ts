import type { SidebarMenuItem } from "@/modules/common/components";
import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";

interface UseSidebarMenuProps {
  items: SidebarMenuItem[];
}

const normalizePath = (path: string) => path.replace(/\/+$/, "");

// An item stays active on its nested routes (e.g. "/lives" on "/lives/123").
const isActivePath = (pathname: string, to: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(to);
  return current === target || current.startsWith(`${target}/`);
};

export const useSidebarMenu = ({ items }: UseSidebarMenuProps) => {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const menuItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        active: isActivePath(pathname, String(item.to)),
      })),
    [items, pathname],
  );

  return { menuItems };
};
