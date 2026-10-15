import { TRADE_TYPE, type TradeType } from "@/types";

/** Amount with its effect on the balance: sales positive, purchases negative. */
export const signedTradeAmount = (type: TradeType, price: number) =>
  type === TRADE_TYPE.SALE ? price : -price;

/** Garments the business keeps: bought minus sold. */
export const netTradeQuantity = (purchasesQuantity: number, salesQuantity: number) =>
  purchasesQuantity - salesQuantity;
