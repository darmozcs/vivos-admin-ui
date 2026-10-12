import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SidebarBrandProps {
  storeName: string;
}

export const SidebarBrand = ({ storeName }: SidebarBrandProps) => {
  const { t } = useTranslation("common");

  return (
    <Group gap="sm" px="xs" wrap="nowrap" miw={0}>
      <Avatar radius="md" size={40} color="plum.9" name={storeName} />
      <Stack gap={0} miw={0}>
        <Text ff="heading" fw={700} size="lg" c="plum.9" truncate>
          {storeName}
        </Text>
        <Text size="sm" c="plum.9">
          {t("brand.subtitle")}
        </Text>
      </Stack>
    </Group>
  );
};
