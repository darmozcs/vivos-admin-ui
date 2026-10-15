import type { BalanceEntryType } from "@/types";
import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  BALANCE_ENTRY_TYPE_CHIP_COLORS,
  BALANCE_ENTRY_TYPE_LABEL_KEYS,
} from "../../const/balance.const";

interface BalanceTypeBadgeProps {
  type: BalanceEntryType;
}

export const BalanceTypeBadge = ({ type }: BalanceTypeBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge size="md" color={BALANCE_ENTRY_TYPE_CHIP_COLORS[type]} autoContrast tt="none">
      {t(BALANCE_ENTRY_TYPE_LABEL_KEYS[type])}
    </Badge>
  );
};
