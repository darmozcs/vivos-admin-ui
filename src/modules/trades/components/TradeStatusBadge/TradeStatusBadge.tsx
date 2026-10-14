import type { TradeStatus } from "@/types";
import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TRADE_STATUS_CHIP_COLORS, TRADE_STATUS_LABEL_KEYS } from "../../const/trade.const";

interface TradeStatusBadgeProps {
  status: TradeStatus;
}

export const TradeStatusBadge = ({ status }: TradeStatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge size="md" color={TRADE_STATUS_CHIP_COLORS[status]} autoContrast tt="none">
      {t(TRADE_STATUS_LABEL_KEYS[status])}
    </Badge>
  );
};
