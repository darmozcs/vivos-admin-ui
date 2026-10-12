import { OrderStatusBadge, PackageStatusBadge } from "@/modules/common/components";
import type { OrderStatus, PackageStatus } from "@/types";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

const CANCELLED_OPACITY = 0.6;

interface LiveOrderCardProps {
  clientName: string;
  total: string;
  summary: string;
  status: OrderStatus;
  packageStatus: PackageStatus;
  /** Cancelled sales are shown faded and do not count towards totals. */
  cancelled: boolean;
  selected: boolean;
  onEdit: () => void;
}

export const LiveOrderCard = ({
  clientName,
  total,
  summary,
  status,
  packageStatus,
  cancelled,
  selected,
  onEdit,
}: LiveOrderCardProps) => {
  const { t } = useTranslation("lives");

  return (
    <Paper
      withBorder
      p="sm"
      radius="md"
      bg={selected ? "blossom.0" : undefined}
      bd={selected ? "1px solid primary.6" : undefined}
      opacity={cancelled ? CANCELLED_OPACITY : undefined}
    >
      <Stack gap="xs">
        <Group justify="space-between" gap="xs" wrap="nowrap">
          <Text size="sm" fw={700} truncate>
            {clientName}
          </Text>
          <Text size="sm" fw={700} td={cancelled ? "line-through" : undefined}>
            {total}
          </Text>
        </Group>
        <Text size="sm" c="dimmed">
          {summary}
        </Text>
        <Group justify="space-between" gap="xs">
          <Group gap={4}>
            <OrderStatusBadge status={status} />
            <PackageStatusBadge status={packageStatus} />
          </Group>
          <Button
            variant="default"
            size="compact-md"
            aria-label={t("orders.editAria", { name: clientName })}
            onClick={onEdit}
          >
            {t("orders.edit")}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
