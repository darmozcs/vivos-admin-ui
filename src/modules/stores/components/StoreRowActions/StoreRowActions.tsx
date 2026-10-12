import { ActionIcon, Group, Tooltip } from "@mantine/core";
import {
  IconKey,
  IconMailForward,
  IconPencil,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface StoreRowActionsProps {
  name: string;
  active: boolean;
  /** Resending the verification code only makes sense while it is pending. */
  canResendVerification: boolean;
  isResending: boolean;
  onEdit: () => void;
  onToggleActive: () => void;
  onResetPassword: () => void;
  onResendVerification: () => void;
}

export const StoreRowActions = ({
  name,
  active,
  canResendVerification,
  isResending,
  onEdit,
  onToggleActive,
  onResetPassword,
  onResendVerification,
}: StoreRowActionsProps) => {
  const { t } = useTranslation("stores");
  const toggleLabel = t(active ? "actions.deactivate" : "actions.activate", { name });
  const actions = [
    { key: "edit", label: t("actions.edit", { name }), icon: IconPencil, onClick: onEdit },
    {
      key: "toggle",
      label: toggleLabel,
      icon: active ? IconPlayerPause : IconPlayerPlay,
      onClick: onToggleActive,
    },
    {
      key: "password",
      label: t("actions.resetPassword", { name }),
      icon: IconKey,
      onClick: onResetPassword,
    },
  ];

  return (
    <Group gap={4} wrap="nowrap" justify="center">
      {actions.map(({ key, label, icon: Icon, onClick }) => (
        <Tooltip key={key} label={label} withArrow>
          <ActionIcon color="plum.9" aria-label={label} onClick={onClick}>
            <Icon size={18} />
          </ActionIcon>
        </Tooltip>
      ))}
      {canResendVerification && (
        <Tooltip label={t("actions.resendVerification", { name })} withArrow>
          <ActionIcon
            color="plum.9"
            aria-label={t("actions.resendVerification", { name })}
            loading={isResending}
            onClick={onResendVerification}
          >
            <IconMailForward size={18} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};
