import type { SaveTradePayload } from "@/DAL";
import { TRADE_TYPE } from "@/types";
import type { TradeFormData } from "../schemas/tradeForm.schema";

/** Trades are sold to a client (clientId) and bought from a seller (sellerId). */
export const toTradePayload = ({ counterpartId, ...data }: TradeFormData): SaveTradePayload => {
  const isSale = data.type === TRADE_TYPE.SALE;
  return {
    ...data,
    clientId: isSale ? counterpartId : null,
    sellerId: isSale ? null : counterpartId,
  };
};
