import { Avatar, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { OrderStatus, PackageStatus } from "@/types";
import { OrderStatusControls } from "./OrderStatusControls";

interface OrderEditorHeaderProps {
  fullName: string;
  account: string;
  phone: string;
  initials: string;
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
  status,
  packageStatus,
  statusDisabled,
  onStatusChange,
  onPackageStatusChange,
}: OrderEditorHeaderProps) => {
  const { t } = useTranslation("lives");

  return (
    <Stack gap="sm">
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
