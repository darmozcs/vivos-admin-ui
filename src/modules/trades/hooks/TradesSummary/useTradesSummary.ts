import { useTradesSummaryQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import { useTranslation } from "react-i18next";
import { formatSignedMoney } from "../../utils/trade.utils";
import { useTradesQueryParams } from "../TradesFilters/useTradesQueryParams";

/** Totals of every trade matching the current filters: sales add and purchases subtract. */
export const useTradesSummary = () => {
  const { t } = useTranslation("trades");
  const { params } = useTradesQueryParams();
  const { data, isLoading, isPlaceholderData } = useTradesSummaryQuery(params);

  return {
    isLoading: isLoading || isPlaceholderData,
    salesTotal: formatMoney(data?.salesTotal ?? 0),
    purchasesTotal: formatMoney(data?.purchasesTotal ?? 0),
    balance: formatSignedMoney(data?.balance ?? 0).text,
    quantity: t("summary.quantityValue", {
      sold: data?.salesQuantity ?? 0,
      bought: data?.purchasesQuantity ?? 0,
    }),
  };
};
