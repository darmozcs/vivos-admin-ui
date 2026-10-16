import { useTradesQuery, useTradesSummaryQuery } from "@/DAL";
import { formatDateTime } from "@/libs";
import type { Tag } from "@/models";
import { useTagOptions } from "@/modules/common/hooks";
import type { TradeStatus, TradeType } from "@/types";
import { useMemo, useState } from "react";
import { netTradeQuantity, signedTradeAmount } from "../../utils/trade.utils";
import { useTradesQueryParams } from "../TradesFilters/useTradesQueryParams";
import { useTradeDelete } from "./useTradeDelete";

export interface TradeRow {
  id: string;
  type: TradeType;
  status: TradeStatus;
  /** Client of a sale or seller of a purchase or payment. */
  counterpartName: string;
  /** Garments; null for payments. */
  quantity: number | null;
  /** Positive for sales, negative for purchases and payments. */
  amount: number;
  createdAt: string;
  tags: Tag[];
  updatedAt: string;
}

export interface TradesTableTotals {
  /** Garments bought minus garments sold. */
  netQuantity: number;
  balance: number;
}

export const useTradesTable = () => {
  const { params, hasActiveFilters } = useTradesQueryParams();
  const { data: trades = [], isLoading, isPlaceholderData } = useTradesQuery(params);
  const { data: summary } = useTradesSummaryQuery(params);
  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);
  const { requestDelete } = useTradeDelete();
  const { tagsOf } = useTagOptions();

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
        tags: tagsOf(trade.tagIds),
      })),
    [trades, tagsOf],
  );

  const totals: TradesTableTotals = {
    netQuantity: netTradeQuantity(summary?.purchasesQuantity ?? 0, summary?.salesQuantity ?? 0),
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
