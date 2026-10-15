import { formatMoney } from "@/libs";
import { AMOUNT_SIGNS, SIGNED_AMOUNT_COLORS } from "../const/signedAmount.const";

/** "+ $ 1.000" / "− $ 1.000" / "$ 0" with the color of its sign. */
export const formatSignedMoney = (amount: number) => {
  if (amount === 0) return { text: formatMoney(0), color: SIGNED_AMOUNT_COLORS.NEUTRAL };
  const positive = amount > 0;
  return {
    text: `${positive ? AMOUNT_SIGNS.POSITIVE : AMOUNT_SIGNS.NEGATIVE} ${formatMoney(Math.abs(amount))}`,
    color: positive ? SIGNED_AMOUNT_COLORS.POSITIVE : SIGNED_AMOUNT_COLORS.NEGATIVE,
  };
};

/** "+25" / "−20" / "0". */
export const formatSignedQuantity = (quantity: number) => {
  if (quantity === 0) return "0";
  return `${quantity > 0 ? AMOUNT_SIGNS.POSITIVE : AMOUNT_SIGNS.NEGATIVE}${Math.abs(quantity)}`;
};
