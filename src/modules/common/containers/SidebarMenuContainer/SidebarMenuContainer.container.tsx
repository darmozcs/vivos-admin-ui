import { SidebarMenu, type SidebarMenuItem } from "@/modules/common/components";
import { useSidebarMenu } from "@/modules/common/hooks";

interface SidebarMenuContainerProps {
  items: SidebarMenuItem[];
  onNavigate?: () => void;
}

export const SidebarMenuContainer = ({
  items,
  onNavigate,
}: SidebarMenuContainerProps) => {
  const { menuItems } = useSidebarMenu({ items });

  return <SidebarMenu items={menuItems} onNavigate={onNavigate} />;
};
