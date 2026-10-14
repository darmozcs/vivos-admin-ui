import { Avatar, Badge, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { OrderStatus, PackageStatus } from "@/types";
import { OrderStatusControls } from "./OrderStatusControls";

interface OrderEditorHeaderProps {
  fullName: string;
  account: string;
  phone: string;
  initials: string;
  /** "liveNumber-number" of the sale; null until the server creates it. */
  saleNumber: string | null;
  status: OrderStatus;
  packageStatus: PackageStatus;
  statusDisabled: boolean;
  onStatusChange: (status: OrderStatus) => void;
  onPackageStatusChange: (status: PackageStatus) => void;
}

export const OrderEditorHeader = ({
  fullName,
  account,
  phone,
  initials,
  saleNumber,
  status,
  packageStatus,
  statusDisabled,
  onStatusChange,
  onPackageStatusChange,
}: OrderEditorHeaderProps) => {
  const { t } = useTranslation("lives");

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="flex-start" gap="sm" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Avatar radius="xl" size={48} color="blossom.5" ff="heading" fz="lg">
            {initials}
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>{t("editor.title", { name: fullName })}</Title>
            <Text size="sm" c="dimmed">
              {account} · {phone}
            </Text>
          </Stack>
        </Group>
        {saleNumber && (
          <Badge size="lg" variant="light" color="plum" style={{ flexShrink: 0 }}>
            {t("editor.saleNumber", { number: saleNumber })}
          </Badge>
        )}
      </Group>
      <OrderStatusControls
        status={status}
        packageStatus={packageStatus}
        disabled={statusDisabled}
        onStatusChange={onStatusChange}
        onPackageStatusChange={onPackageStatusChange}
      />
    </Stack>
  );
};
