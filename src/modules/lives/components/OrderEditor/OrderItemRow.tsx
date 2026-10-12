import type { OrderItem } from "@/models";
import { ActionIcon, NumberInput, Table, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ORDER_ITEM_FIELD, type OrderItemField } from "../../const/lives.const";
import { QuantityStepper } from "./QuantityStepper";

export interface OrderItemLineProps {
  item: OrderItem & { subtotal: string };
  onFieldChange: (field: OrderItemField, value: string | number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const OrderItemRow = ({
  item,
  onFieldChange,
  onIncrement,
  onDecrement,
  onRemove,
}: OrderItemLineProps) => {
  const { t } = useTranslation("lives");

  return (
    <Table.Tr>
      <Table.Td>
        <TextInput size="sm" aria-label={t("table.code")} value={item.code} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.CODE, e.currentTarget.value)} />
      </Table.Td>
      <Table.Td>
        <TextInput size="sm" aria-label={t("table.name")} value={item.name} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.NAME, e.currentTarget.value)} />
      </Table.Td>
      <Table.Td>
        <TextInput size="sm" aria-label={t("table.color")} value={item.color} onChange={(e) => onFieldChange(ORDER_ITEM_FIELD.COLOR, e.currentTarget.value)} />
      </Table.Td>
      <Table.Td>
        <NumberInput size="sm" min={0} allowNegative={false} aria-label={t("table.price")} value={item.price} onChange={(value) => onFieldChange(ORDER_ITEM_FIELD.PRICE, value)} />
      </Table.Td>
      <Table.Td>
        <QuantityStepper quantity={item.quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
      </Table.Td>
      <Table.Td ta="right">
        <Text fw={700} size="sm">
          {item.subtotal}
        </Text>
      </Table.Td>
      <Table.Td ta="right">
        <ActionIcon size="md" onClick={onRemove} aria-label={t("table.remove", { name: item.name })}>
          <IconTrash size={18} stroke={1.8} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};
