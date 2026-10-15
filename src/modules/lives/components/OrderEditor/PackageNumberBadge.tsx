import { Badge, Button, Group, NumberInput, Popover, Stack, UnstyledButton } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

interface PackageNumberBadgeProps {
  /** "liveNumber-number" shown on the label. */
  label: string;
  liveNumber: number;
  opened: boolean;
  value: number | "";
  isSaving: boolean;
  onOpen: () => void;
  onClose: () => void;
  onValueChange: (value: string | number) => void;
  onSave: () => void;
}

const MIN_PACKAGE_NUMBER = 1;
const POPOVER_WIDTH = 220;

/** Package label of the sale; clicking it opens a small form to change the number. */
export const PackageNumberBadge = ({
  label,
  liveNumber,
  opened,
  value,
  isSaving,
  onOpen,
  onClose,
  onValueChange,
  onSave,
}: PackageNumberBadgeProps) => {
  const { t } = useTranslation("lives");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  };

  return (
    <Popover opened={opened} onChange={(next) => !next && onClose()} width={POPOVER_WIDTH} position="bottom-end" withArrow trapFocus>
      <Popover.Target>
        <UnstyledButton onClick={opened ? onClose : onOpen} aria-label={t("editor.packageNumber.edit")} style={{ flexShrink: 0 }}>
          <Badge size="lg" variant="light" color="plum" rightSection={<IconPencil size={14} />}>
            {t("editor.saleNumber", { number: label })}
          </Badge>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={handleSubmit}>
          <Stack gap="xs">
            <NumberInput
              label={t("editor.packageNumber.label")}
              leftSection={`${liveNumber}-`}
              min={MIN_PACKAGE_NUMBER}
              allowDecimal={false}
              allowNegative={false}
              value={value}
              onChange={onValueChange}
              data-autofocus
            />
            <Group justify="flex-end" gap="xs">
              <Button variant="default" size="xs" onClick={onClose}>
                {t("editor.packageNumber.cancel")}
              </Button>
              <Button type="submit" size="xs" loading={isSaving} disabled={value === ""}>
                {t("editor.packageNumber.save")}
              </Button>
            </Group>
          </Stack>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
