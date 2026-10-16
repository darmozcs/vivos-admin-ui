import { useBalanceQuery } from "@/DAL";
import { formatDateTime } from "@/libs";
import type { Tag } from "@/models";
import { useTagOptions } from "@/modules/common/hooks";
import type { BalanceEntryType } from "@/types";
import { useMemo } from "react";
import { balanceSign, hasBalanceQuantity } from "../../utils/balance.utils";
import { useBalanceQueryParams } from "../BalanceFilters/useBalanceQueryParams";

export interface BalanceRow {
  /** Unique row key: "<type>-<id>". */
  id: string;
  type: BalanceEntryType;
  /** Positive for purchases (garments in), negative for sales and lives; null for payments. */
  quantity: number | null;
  /** Positive for sales and lives, negative for purchases and payments. */
  amount: number;
  createdAt: string;
  tags: Tag[];
}

export interface BalanceTableTotals {
  /** Garments bought minus garments sold. */
  netQuantity: number;
  balance: number;
}

export const useBalanceTable = () => {
  const { params, hasActiveFilters } = useBalanceQueryParams();
  const { data, isLoading, isPlaceholderData } = useBalanceQuery(params);
  const { tagsOf } = useTagOptions();

  const records = useMemo<BalanceRow[]>(
    () =>
      (data?.entries ?? []).map((entry) => ({
        // Row key: lives and movements live in different tables, so the id alone may repeat.
        id: `${entry.type}-${entry.id}`,
        type: entry.type,
        quantity: hasBalanceQuantity(entry.type) ? -balanceSign(entry.type) * entry.quantity : null,
        amount: balanceSign(entry.type) * entry.amount,
        createdAt: formatDateTime(entry.createdAt),
        tags: tagsOf(entry.tagIds),
      })),
    [data, tagsOf],
  );

  const totals: BalanceTableTotals = {
    netQuantity: data?.summary.netQuantity ?? 0,
    balance: data?.summary.balance ?? 0,
  };

  return {
    records,
    totals,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
  };
};
