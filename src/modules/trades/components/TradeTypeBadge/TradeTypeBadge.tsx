import type { TradeType } from "@/types";
import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TRADE_TYPE_CHIP_COLORS, TRADE_TYPE_LABEL_KEYS } from "../../const/trade.const";

interface TradeTypeBadgeProps {
  type: TradeType;
}

export const TradeTypeBadge = ({ type }: TradeTypeBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge size="md" color={TRADE_TYPE_CHIP_COLORS[type]} autoContrast tt="none">
      {t(TRADE_TYPE_LABEL_KEYS[type])}
    </Badge>
  );
};
