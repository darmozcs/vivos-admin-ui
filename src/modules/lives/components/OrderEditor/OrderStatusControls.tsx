import {
  ORDER_STATUS_LABEL_KEYS,
  ORDER_STATUS_OPTIONS,
  PACKAGE_STATUS_LABEL_KEYS,
  PACKAGE_STATUS_OPTIONS,
} from "@/modules/common/const";
import type { OrderStatus, PackageStatus } from "@/types";
import { Group, SegmentedControl, Select, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface OrderStatusControlsProps {
  status: OrderStatus;
  packageStatus: PackageStatus;
  disabled: boolean;
  onStatusChange: (status: OrderStatus) => void;
  onPackageStatusChange: (status: PackageStatus) => void;
}

const PACKAGE_SELECT_WIDTH = 170;

/** Sale and package status of the order being edited. */
export const OrderStatusControls = ({
  status,
  packageStatus,
  disabled,
  onStatusChange,
  onPackageStatusChange,
}: OrderStatusControlsProps) => {
  const { t } = useTranslation("lives");

  return (
    <Group gap="lg" align="flex-end" wrap="wrap">
      <Stack gap={4}>
        <Text size="xs" fw={700} c="dimmed" tt="uppercase">
          {t("editor.statusLabel")}
        </Text>
        <SegmentedControl
          aria-label={t("editor.statusLabel")}
          value={status}
          disabled={disabled}
          onChange={(value) => onStatusChange(value as OrderStatus)}
          data={ORDER_STATUS_OPTIONS.map((option) => ({
            value: option,
            label: t(ORDER_STATUS_LABEL_KEYS[option]),
          }))}
        />
      </Stack>
      <Stack gap={4}>
        <Text size="xs" fw={700} c="dimmed" tt="uppercase">
          {t("editor.packageStatusLabel")}
        </Text>
        <Select
          size="sm"
          w={PACKAGE_SELECT_WIDTH}
          aria-label={t("editor.packageStatusLabel")}
          value={packageStatus}
          disabled={disabled}
          allowDeselect={false}
          onChange={(value) => value && onPackageStatusChange(value as PackageStatus)}
          data={PACKAGE_STATUS_OPTIONS.map((option) => ({
            value: option,
            label: t(PACKAGE_STATUS_LABEL_KEYS[option]),
          }))}
        />
      </Stack>
    </Group>
  );
};
