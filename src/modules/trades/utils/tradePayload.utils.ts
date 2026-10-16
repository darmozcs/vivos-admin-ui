import type { SaveTradePayload } from "@/DAL";
import { TRADE_TYPE } from "@/types";
import { TRADE_TYPES_WITH_QUANTITY } from "../const/trade.const";
import type { TradeFormData } from "../schemas/tradeForm.schema";

/**
 * Sales go to a client (clientId); purchases and payments to a seller (sellerId).
 * Payments carry no garment quantity.
 */
export const toTradePayload = ({ counterpartId, quantity, ...data }: TradeFormData): SaveTradePayload => {
  const isSale = data.type === TRADE_TYPE.SALE;
  return {
    ...data,
    quantity: TRADE_TYPES_WITH_QUANTITY.includes(data.type) ? (quantity ?? null) : null,
    clientId: isSale ? counterpartId : null,
    sellerId: isSale ? null : counterpartId,
  };
};
