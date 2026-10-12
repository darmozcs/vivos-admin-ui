import { Avatar, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface ClientListItemProps {
  fullName: string;
  account: string;
  initials: string;
  total: string;
  selected: boolean;
  onSelect: () => void;
}

export const ClientListItem = ({
  fullName,
  account,
  initials,
  total,
  selected,
  onSelect,
}: ClientListItemProps) => {
  const { t } = useTranslation("lives");

  return (
    <UnstyledButton
      onClick={onSelect}
      aria-pressed={selected}
      mih={52}
      px="sm"
      py={6}
      bdrs="md"
      bg={selected ? "blossom.0" : undefined}
      bd={selected ? "2px solid primary.6" : "2px solid transparent"}
    >
      <Group gap="sm" wrap="nowrap">
        <Avatar radius="xl" size={36}>
          {initials}
        </Avatar>
        <Stack gap={0} flex={1} miw={0}>
          <Text size="sm" fw={600} truncate>
            {fullName}
          </Text>
          <Text size="xs" c="dimmed" truncate>
            {account || t("editor.noAccount")}
          </Text>
        </Stack>
        {total && (
          <Text size="sm" fw={700} c="primary.8">
            {total}
          </Text>
        )}
      </Group>
    </UnstyledButton>
  );
};
