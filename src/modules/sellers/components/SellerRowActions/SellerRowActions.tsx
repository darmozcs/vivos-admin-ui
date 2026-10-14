import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface SellerRowActionsProps {
  fullName: string;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

// Row clicks open the edit modal, so action clicks must not bubble to the row.
const stop = (action: () => void) => (event: MouseEvent) => {
  event.stopPropagation();
  action();
};

export const SellerRowActions = ({
  fullName,
  canDelete,
  onEdit,
  onDelete,
}: SellerRowActionsProps) => {
  const { t } = useTranslation("sellers");

  return (
    <Group gap={4} wrap="nowrap" justify="center">
      <ActionIcon
        color="plum.9"
        aria-label={t("actions.edit", { name: fullName })}
        onClick={stop(onEdit)}
      >
        <IconPencil size={18} />
      </ActionIcon>
      <Tooltip label={t("delete.blocked")} disabled={canDelete} withArrow>
        {/* data-disabled (not disabled) keeps the tooltip working on hover. */}
        <ActionIcon
          color="red"
          aria-label={t("actions.delete", { name: fullName })}
          data-disabled={!canDelete || undefined}
          aria-disabled={!canDelete}
          onClick={stop(() => canDelete && onDelete())}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
