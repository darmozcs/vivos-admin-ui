import { useBalanceQuery } from "@/DAL";
import { formatDateTime } from "@/libs";
import type { BalanceEntryType } from "@/types";
import { useMemo } from "react";
import { balanceSign } from "../../utils/balance.utils";
import { useBalanceQueryParams } from "../BalanceFilters/useBalanceQueryParams";

export interface BalanceRow {
  id: string;
  type: BalanceEntryType;
  /** Positive for purchases (garments in), negative for sales and lives. */
  quantity: number;
  /** Positive for sales and lives, negative for purchases. */
  amount: number;
  createdAt: string;
}

export interface BalanceTableTotals {
  /** Garments bought minus garments sold. */
  netQuantity: number;
  balance: number;
}

export const useBalanceTable = () => {
  const { params, hasActiveFilters } = useBalanceQueryParams();
  const { data, isLoading, isPlaceholderData } = useBalanceQuery(params);

  const records = useMemo<BalanceRow[]>(
    () =>
      (data?.entries ?? []).map((entry) => ({
        id: entry.id,
        type: entry.type,
        quantity: -balanceSign(entry.type) * entry.quantity,
        amount: balanceSign(entry.type) * entry.amount,
        createdAt: formatDateTime(entry.createdAt),
      })),
    [data],
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
