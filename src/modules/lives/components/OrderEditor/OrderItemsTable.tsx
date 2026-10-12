import type { OrderItem } from "@/models";
import { Box, Stack, Table, Text, VisuallyHidden } from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { OrderItemField } from "../../const/lives.const";
import { OrderItemCard } from "./OrderItemCard";
import { OrderItemRow } from "./OrderItemRow";
import classes from "./OrderItemsTable.module.css";

interface OrderItemsTableProps {
  lines: (OrderItem & { subtotal: string })[];
  onFieldChange: (index: number, field: OrderItemField, value: string | number) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  onRemove: (index: number) => void;
}

// Fixed columns; name and color share the remaining width (table shown from 640px of panel).
const COLUMN_WIDTHS = { code: 72, price: 92, quantity: 104, subtotal: 88, remove: 40 };

export const OrderItemsTable = ({
  lines,
  onFieldChange,
  onIncrement,
  onDecrement,
  onRemove,
}: OrderItemsTableProps) => {
  const { t } = useTranslation("lives");

  const handlersFor = (index: number) => ({
    onFieldChange: (field: OrderItemField, value: string | number) =>
      onFieldChange(index, field, value),
    onIncrement: () => onIncrement(index),
    onDecrement: () => onDecrement(index),
    onRemove: () => onRemove(index),
  });

  if (lines.length === 0) {
    return (
      <Text size="sm" c="dimmed" ta="center" p="lg">
        {t("table.empty")}
      </Text>
    );
  }

  return (
    <Box className={classes.root}>
      <Stack gap="xs" className={classes.cards}>
        {lines.map((line, index) => (
          <OrderItemCard key={index} item={line} {...handlersFor(index)} />
        ))}
      </Stack>
      <Box className={classes.table}>
        <Table layout="fixed" verticalSpacing="xs" horizontalSpacing={6} fz="sm">
          <Table.Thead c="dimmed">
            <Table.Tr>
              <Table.Th w={COLUMN_WIDTHS.code}>{t("table.code")}</Table.Th>
              <Table.Th>{t("table.name")}</Table.Th>
              <Table.Th>{t("table.color")}</Table.Th>
              <Table.Th w={COLUMN_WIDTHS.price}>{t("table.price")}</Table.Th>
              <Table.Th w={COLUMN_WIDTHS.quantity}>{t("table.quantity")}</Table.Th>
              <Table.Th w={COLUMN_WIDTHS.subtotal} ta="right">{t("table.subtotal")}</Table.Th>
              <Table.Th w={COLUMN_WIDTHS.remove}>
                <VisuallyHidden>{t("table.removeColumn")}</VisuallyHidden>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {lines.map((line, index) => (
              <OrderItemRow key={index} item={line} {...handlersFor(index)} />
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};
