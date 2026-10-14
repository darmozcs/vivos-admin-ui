import { useTradesQuery, useTradesSummaryQuery } from "@/DAL";
import { formatDateTime } from "@/libs";
import type { TradeStatus, TradeType } from "@/types";
import { useMemo, useState } from "react";
import { signedTradeAmount } from "../../utils/trade.utils";
import { useTradesQueryParams } from "../TradesFilters/useTradesQueryParams";
import { useTradeDelete } from "./useTradeDelete";

export interface TradeRow {
  id: string;
  type: TradeType;
  status: TradeStatus;
  /** Seller of a sale or client of a purchase. */
  counterpartName: string;
  quantity: number;
  /** Positive for sales, negative for purchases. */
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TradesTableTotals {
  soldQuantity: number;
  boughtQuantity: number;
  balance: number;
}

export const useTradesTable = () => {
  const { params, hasActiveFilters } = useTradesQueryParams();
  const { data: trades = [], isLoading, isPlaceholderData } = useTradesQuery(params);
  const { data: summary } = useTradesSummaryQuery(params);
  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);
  const { requestDelete } = useTradeDelete();

  const records = useMemo<TradeRow[]>(
    () =>
      trades.map((trade) => ({
        id: trade.id,
        type: trade.type,
        status: trade.status,
        counterpartName: trade.sellerName ?? trade.clientName ?? "",
        quantity: trade.quantity,
        amount: signedTradeAmount(trade.type, trade.price),
        createdAt: formatDateTime(trade.createdAt),
        updatedAt: formatDateTime(trade.updatedAt),
      })),
    [trades],
  );

  const totals: TradesTableTotals = {
    soldQuantity: summary?.salesQuantity ?? 0,
    boughtQuantity: summary?.purchasesQuantity ?? 0,
    balance: summary?.balance ?? 0,
  };

  return {
    records,
    totals,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    editingTrade: trades.find((trade) => trade.id === editingTradeId) ?? null,
    openEdit: setEditingTradeId,
    closeEdit: () => setEditingTradeId(null),
    requestDelete,
  };
};
