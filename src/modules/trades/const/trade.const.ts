import { TRADE_STATUS, TRADE_TYPE, type TradeStatus, type TradeType } from "@/types";

export const TRADE_TYPE_OPTIONS: TradeType[] = [TRADE_TYPE.SALE, TRADE_TYPE.PURCHASE];

/** Each trade type has its own statuses; the first one is the default for new trades. */
export const TRADE_STATUSES_BY_TYPE: Record<TradeType, TradeStatus[]> = {
  SALE: [TRADE_STATUS.PUBLISHED, TRADE_STATUS.SOLD],
  PURCHASE: [TRADE_STATUS.PENDING, TRADE_STATUS.PURCHASED],
};

export const TRADE_TYPE_LABEL_KEYS: Record<TradeType, string> = {
  SALE: "trades:type.sale",
  PURCHASE: "trades:type.purchase",
};

export const TRADE_STATUS_LABEL_KEYS: Record<TradeStatus, string> = {
  PUBLISHED: "trades:status.published",
  SOLD: "trades:status.sold",
  PENDING: "trades:status.pending",
  PURCHASED: "trades:status.purchased",
};

export const TRADE_TYPE_CHIP_COLORS: Record<TradeType, string> = {
  SALE: "#D3F9D8",
  PURCHASE: "#FFE3E3",
};

export const TRADE_STATUS_CHIP_COLORS: Record<TradeStatus, string> = {
  PUBLISHED: "#DCEBFF",
  SOLD: "#D3F9D8",
  PENDING: "#FFE6CC",
  PURCHASED: "#E8E1FF",
};

/** Limits enforced by vivos-be (also used to interpolate messages). */
export const TRADE_FIELD_LIMITS = {
  noteMax: 500,
  quantityMin: 1,
  priceMin: 0,
} as const;
