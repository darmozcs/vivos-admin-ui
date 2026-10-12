import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface OrderFooterProps {
  units: number;
  total: string;
}

export const OrderFooter = ({ units, total }: OrderFooterProps) => {
  const { t } = useTranslation("lives");

  return (
    <Group justify="space-between" gap="sm" pt={4}>
      <Text size="sm" c="dimmed">
        {t("editor.footer", { count: units })}
      </Text>
      <Text ff="heading" fz={28} fw={700}>
        {t("editor.total", { total })}
      </Text>
    </Group>
  );
};
