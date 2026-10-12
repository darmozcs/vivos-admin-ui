import { ActionIcon, Group, NumberInput, Paper, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ORDER_ITEM_FIELD } from "../../const/lives.const";
import type { OrderItemLineProps } from "./OrderItemRow";
import { QuantityStepper } from "./QuantityStepper";

/** Mobile version of an order line: same fields as the table row, stacked. */
export const OrderItemCard = ({
  item,
  onFieldChange,
  onIncrement,
  onDecrement,
  onRemove,
}: OrderItemLineProps) => {
  const { t } = useTranslation("lives");

  return (
    <Paper withBorder p="sm" radius="md">
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
        <TextInput size="sm" label={t("table.code")} value={item.code} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.CODE, e.currentTarget.value)} />
        <TextInput size="sm" label={t("table.name")} value={item.name} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.NAME, e.currentTarget.value)} />
        <TextInput size="sm" label={t("table.color")} value={item.color} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.COLOR, e.currentTarget.value)} />
        <NumberInput size="sm" label={t("table.price")} min={0} allowNegative={false} value={item.price} onChange={(value) => onFieldChange(ORDER_ITEM_FIELD.PRICE, value)} />
      </SimpleGrid>
      <Group justify="space-between" mt="sm" wrap="nowrap">
        <QuantityStepper quantity={item.quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        <Group gap="xs" wrap="nowrap">
          <Text fw={700} size="sm">
            {item.subtotal}
          </Text>
          <ActionIcon onClick={onRemove} aria-label={t("table.remove", { name: item.name })}>
            <IconTrash size={18} stroke={1.8} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
