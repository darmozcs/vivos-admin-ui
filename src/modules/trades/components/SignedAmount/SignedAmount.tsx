import { Text, type TextProps } from "@mantine/core";
import { formatSignedMoney } from "../../utils/trade.utils";

interface SignedAmountProps extends TextProps {
  /** Positive adds to the balance, negative subtracts. */
  amount: number;
}

export const SignedAmount = ({ amount, ...rest }: SignedAmountProps) => {
  const { text, color } = formatSignedMoney(amount);

  return (
    <Text size="sm" fw={600} c={color} style={{ fontVariantNumeric: "tabular-nums" }} {...rest}>
      {text}
    </Text>
  );
};
