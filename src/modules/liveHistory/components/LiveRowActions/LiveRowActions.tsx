import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface LiveRowActionsProps {
  title: string;
  canDelete: boolean;
  onDelete: () => void;
}

// Row clicks open the live, so action clicks must not bubble to the row.
const stop = (action: () => void) => (event: MouseEvent) => {
  event.stopPropagation();
  action();
};

export const LiveRowActions = ({ title, canDelete, onDelete }: LiveRowActionsProps) => {
  const { t } = useTranslation("liveHistory");

  return (
    <Group gap={4} wrap="nowrap" justify="center">
      <Tooltip label={t("delete.blocked")} disabled={canDelete} withArrow>
        {/* data-disabled (not disabled) keeps the tooltip working on hover. */}
        <ActionIcon
          color="red"
          aria-label={t("actions.delete", { name: title })}
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
