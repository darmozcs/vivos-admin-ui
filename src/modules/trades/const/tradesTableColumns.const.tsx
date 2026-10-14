import type { DataTableColumn } from "@/libs/ui/table";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { TradeRowActions, TradeStatusBadge, TradeTypeBadge, SignedAmount } from "../components";
import type { TradeRow, TradesTableTotals } from "../hooks";
import { TRADE_AMOUNT_SIGNS } from "./trade.const";

interface TradesTableActions {
  onEdit: (tradeId: string) => void;
  onDelete: (tradeId: string) => void;
}

/** Columns of the trades table; the footer row shows quantities and balance of the filtered trades. */
export const getTradesTableColumns = (
  t: TFunction,
  totals: TradesTableTotals,
  actions: TradesTableActions,
): DataTableColumn<TradeRow>[] => [
  {
    accessor: "type",
    title: t("columns.type"),
    width: 110,
    render: (trade) => <TradeTypeBadge type={trade.type} />,
    footer: <Text fw={700}>{t("columns.totals")}</Text>,
  },
  { accessor: "counterpartName", title: t("columns.counterpart"), width: 200 },
  {
    accessor: "quantity",
    title: t("columns.quantity"),
    width: 130,
    textAlign: "right",
    footer: (
      <Text size="sm" fw={700} ta="right">
        {`${TRADE_AMOUNT_SIGNS.POSITIVE}${totals.soldQuantity} / ${TRADE_AMOUNT_SIGNS.NEGATIVE}${totals.boughtQuantity}`}
      </Text>
    ),
  },
  {
    accessor: "amount",
    title: t("columns.total"),
    width: 150,
    textAlign: "right",
    render: (trade) => <SignedAmount amount={trade.amount} ta="right" />,
    footer: <SignedAmount amount={totals.balance} ta="right" fw={700} />,
  },
  {
    accessor: "status",
    title: t("columns.status"),
    width: 130,
    render: (trade) => <TradeStatusBadge status={trade.status} />,
  },
  { accessor: "createdAt", title: t("columns.createdAt"), width: 150 },
  { accessor: "updatedAt", title: t("columns.updatedAt"), width: 150 },
  {
    accessor: "actions",
    title: "",
    width: 96,
    textAlign: "center",
    render: (trade) => (
      <TradeRowActions onEdit={() => actions.onEdit(trade.id)} onDelete={() => actions.onDelete(trade.id)} />
    ),
  },
];
