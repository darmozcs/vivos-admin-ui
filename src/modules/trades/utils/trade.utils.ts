import { formatMoney } from "@/libs";
import { TRADE_TYPE, type TradeType } from "@/types";
import { TRADE_AMOUNT_COLORS, TRADE_AMOUNT_SIGNS } from "../const/trade.const";

/** Amount with its effect on the balance: sales positive, purchases negative. */
export const signedTradeAmount = (type: TradeType, price: number) =>
  type === TRADE_TYPE.SALE ? price : -price;

/** "+ $ 1.000" / "− $ 1.000" / "$ 0" with the color of its sign. */
export const formatSignedMoney = (amount: number) => {
  if (amount === 0) return { text: formatMoney(0), color: TRADE_AMOUNT_COLORS.NEUTRAL };
  const positive = amount > 0;
  return {
    text: `${positive ? TRADE_AMOUNT_SIGNS.POSITIVE : TRADE_AMOUNT_SIGNS.NEGATIVE} ${formatMoney(Math.abs(amount))}`,
    color: positive ? TRADE_AMOUNT_COLORS.POSITIVE : TRADE_AMOUNT_COLORS.NEGATIVE,
  };
};
