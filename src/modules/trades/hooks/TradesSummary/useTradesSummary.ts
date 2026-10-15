import { useTradesSummaryQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import { formatSignedMoney, formatSignedQuantity } from "@/modules/common/utils";
import { netTradeQuantity } from "../../utils/trade.utils";
import { useTradesQueryParams } from "../TradesFilters/useTradesQueryParams";

/** Totals of every trade matching the current filters: sales add and purchases subtract. */
export const useTradesSummary = () => {
  const { params } = useTradesQueryParams();
  const { data, isLoading, isPlaceholderData } = useTradesSummaryQuery(params);

  return {
    isLoading: isLoading || isPlaceholderData,
    salesTotal: formatMoney(data?.salesTotal ?? 0),
    purchasesTotal: formatMoney(data?.purchasesTotal ?? 0),
    balance: formatSignedMoney(data?.balance ?? 0).text,
    // Garments the business keeps: bought minus sold.
    quantity: formatSignedQuantity(
      netTradeQuantity(data?.purchasesQuantity ?? 0, data?.salesQuantity ?? 0),
    ),
  };
};
