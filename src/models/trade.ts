import type { TradeStatus, TradeType } from "@/types";

/** A sale has a seller and a purchase has a client; the other side is null. */
export interface Trade {
  id: string;
  type: TradeType;
  status: TradeStatus;
  /** Garments of the sale or purchase; null for payments. */
  quantity: number | null;
  price: number;
  note: string;
  sellerId: string | null;
  sellerName: string | null;
  clientId: string | null;
  clientName: string | null;
  createdAt: string;
  updatedAt: string;
  /** Ids of the store tags of the movement. */
  tagIds: string[];
}

/** Totals of GET /trades/summary: balance = sales - purchases, quantities are units. */
export interface TradeSummary {
  salesTotal: number;
  purchasesTotal: number;
  balance: number;
  salesCount: number;
  purchasesCount: number;
  salesQuantity: number;
  purchasesQuantity: number;
}
