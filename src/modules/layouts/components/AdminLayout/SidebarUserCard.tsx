import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SidebarUserCardProps {
  name: string;
  role: string;
}

const CARD_BACKGROUND = "rgba(255, 255, 255, 0.45)";

export const SidebarUserCard = ({ name, role }: SidebarUserCardProps) => {
  const { t } = useTranslation("common");

  return (
    <Paper p="sm" radius="lg" bg={CARD_BACKGROUND}>
      <Group gap="sm" wrap="nowrap">
        <Avatar radius="xl" color="plum.9" name={name} aria-hidden />
        <Stack gap={0}>
          <Text fw={700} size="sm" c="plum.9">
            {name}
          </Text>
          <Text size="xs" c="plum.9">
            {t(role)}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};
