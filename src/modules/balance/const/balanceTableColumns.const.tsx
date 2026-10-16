import type { DataTableColumn } from "@/libs/ui/table";
import { SignedAmount, TagBadges } from "@/modules/common/components";
import { formatSignedQuantity } from "@/modules/common/utils";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { BalanceTypeBadge } from "../components";
import type { BalanceRow, BalanceTableTotals } from "../hooks";

/** Read-only columns; the footer row shows net garments (bought - sold) and the balance. */
export const getBalanceTableColumns = (
  t: TFunction,
  totals: BalanceTableTotals,
): DataTableColumn<BalanceRow>[] => [
  {
    accessor: "type",
    title: t("columns.type"),
    width: 120,
    render: (row) => <BalanceTypeBadge type={row.type} />,
    footer: <Text fw={700}>{t("columns.totals")}</Text>,
  },
  {
    accessor: "quantity",
    title: t("columns.quantity"),
    width: 160,
    textAlign: "right",
    render: (row) => (
      <Text size="sm" ta="right" style={{ fontVariantNumeric: "tabular-nums" }}>
        {row.quantity === null ? t("columns.noQuantity") : formatSignedQuantity(row.quantity)}
      </Text>
    ),
    footer: (
      <Text size="sm" fw={700} ta="right">
        {formatSignedQuantity(totals.netQuantity)}
      </Text>
    ),
  },
  {
    accessor: "amount",
    title: t("columns.total"),
    width: 160,
    textAlign: "right",
    render: (row) => <SignedAmount amount={row.amount} ta="right" />,
    footer: <SignedAmount amount={totals.balance} ta="right" fw={700} />,
  },
  {
    accessor: "tags",
    title: t("common:tags.label"),
    width: 220,
    render: (row) => <TagBadges tags={row.tags} />,
  },
  { accessor: "createdAt", title: t("columns.createdAt"), width: 160 },
];
