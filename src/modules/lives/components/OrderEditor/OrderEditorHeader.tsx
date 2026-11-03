import { Avatar, Group, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface OrderEditorHeaderProps {
  fullName: string;
  account: string;
  phone: string;
  initials: string;
  /** Garments and total of the order, between the client and the package label. */
  summary: ReactNode;
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
  summary,
  packageBadge,
  statusControls,
}: OrderEditorHeaderProps) => {
  const { t } = useTranslation("lives");

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center" gap="md">
        <Group gap="sm" wrap="nowrap" flex={1} miw={0}>
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
        <Group gap="md" wrap="nowrap">
          {summary}
          {packageBadge}
        </Group>
      </Group>
      {statusControls}
    </Stack>
  );
};
