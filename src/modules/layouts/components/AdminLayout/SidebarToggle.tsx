import { ActionIcon, Tooltip } from "@mantine/core";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface SidebarToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export const SidebarToggle = ({ visible, onToggle }: SidebarToggleProps) => {
  const { t } = useTranslation("common");
  const label = visible ? t("menu.hide") : t("menu.show");
  const Icon = visible
    ? IconLayoutSidebarLeftCollapse
    : IconLayoutSidebarLeftExpand;

  return (
    <Tooltip label={label} position="right">
      <ActionIcon
        visibleFrom="sm"
        color="plum.9"
        aria-label={label}
        aria-pressed={!visible}
        onClick={onToggle}
      >
        <Icon size={22} stroke={1.8} />
      </ActionIcon>
    </Tooltip>
  );
};
