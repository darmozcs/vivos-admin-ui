import type { Tag } from "@/models";
import { TagBadges, TagsMultiSelect } from "@/modules/common/components";
import type { SelectOption } from "@/modules/common/utils";
import { ActionIcon, Button, Group, Popover, Stack } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface LiveTagsCellProps {
  tags: Tag[];
  opened: boolean;
  value: string[];
  options: SelectOption[];
  isSaving: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (tagIds: string[]) => void;
  onSave: () => void;
}

const POPOVER_WIDTH = 280;

// Row clicks open the live, so clicks inside the cell must not bubble to the row.
const stopRowClick = (event: MouseEvent) => event.stopPropagation();

/** Tags of a live in the history, with a popover to change them. */
export const LiveTagsCell = ({
  tags,
  opened,
  value,
  options,
  isSaving,
  onOpen,
  onClose,
  onChange,
  onSave,
}: LiveTagsCellProps) => {
  const { t } = useTranslation("liveHistory");

  return (
    <Group gap={6} wrap="nowrap" onClick={stopRowClick}>
      <TagBadges tags={tags} />
      <Popover opened={opened} onChange={(next) => !next && onClose()} width={POPOVER_WIDTH} withArrow trapFocus>
        <Popover.Target>
          <ActionIcon variant="subtle" color="plum.9" aria-label={t("tags.edit")} onClick={opened ? onClose : onOpen}>
            <IconTag size={16} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack gap="xs">
            <TagsMultiSelect options={options} value={value} onChange={onChange} comboboxProps={{ withinPortal: false }} />
            <Group justify="flex-end" gap="xs">
              <Button variant="default" size="xs" onClick={onClose}>
                {t("tags.cancel")}
              </Button>
              <Button size="xs" loading={isSaving} onClick={onSave}>
                {t("tags.save")}
              </Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};
