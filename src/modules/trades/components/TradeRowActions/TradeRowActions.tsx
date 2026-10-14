import { ActionIcon, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface TradeRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

// Row clicks open the edit modal, so action clicks must not bubble to the row.
const stop = (action: () => void) => (event: MouseEvent) => {
  event.stopPropagation();
  action();
};

export const TradeRowActions = ({ onEdit, onDelete }: TradeRowActionsProps) => {
  const { t } = useTranslation("trades");

  return (
    <Group gap={4} wrap="nowrap" justify="center">
      <ActionIcon color="plum.9" aria-label={t("actions.edit")} onClick={stop(onEdit)}>
        <IconPencil size={18} />
      </ActionIcon>
      <ActionIcon color="red" aria-label={t("actions.delete")} onClick={stop(onDelete)}>
        <IconTrash size={18} />
      </ActionIcon>
    </Group>
  );
};
