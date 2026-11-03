import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface OrderSummaryProps {
  units: number;
  total: string;
}

/** Garments and total of the order, shown in the editor header. */
export const OrderSummary = ({ units, total }: OrderSummaryProps) => {
  const { t } = useTranslation("lives");

  return (
    <Group gap="sm" wrap="nowrap">
      <Text size="lg" fw={700}>
        {t("editor.units", { count: units })}
      </Text>
      <Text size="lg" fw={700}>
        {t("editor.total", { total })}
      </Text>
    </Group>
  );
};
