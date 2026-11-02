import { Avatar, Group, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface OrderEditorHeaderProps {
  fullName: string;
  account: string;
  phone: string;
  initials: string;
  /** Package label of the sale; absent until the client buys something. */
  packageBadge?: ReactNode;
  /** Sale and package status controls; absent on "Comenzar vivo". */
  statusControls?: ReactNode;
}

export const OrderEditorHeader = ({
  fullName,
  account,
  phone,
  initials,
  packageBadge,
  statusControls,
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
        {packageBadge}
      </Group>
      {statusControls}
    </Stack>
  );
};
