import { useBalanceQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import { formatSignedMoney, formatSignedQuantity } from "@/modules/common/utils";
import { useBalanceQueryParams } from "../BalanceFilters/useBalanceQueryParams";

/** Totals of the balance rows: sales (lives included) add and purchases subtract. */
export const useBalanceSummary = () => {
  const { params } = useBalanceQueryParams();
  const { data, isLoading, isPlaceholderData } = useBalanceQuery(params);
  const summary = data?.summary;

  return {
    isLoading: isLoading || isPlaceholderData,
    salesTotal: formatMoney(summary?.salesTotal ?? 0),
    purchasesTotal: formatMoney(summary?.purchasesTotal ?? 0),
    balance: formatSignedMoney(summary?.balance ?? 0).text,
    quantity: formatSignedQuantity(summary?.netQuantity ?? 0),
  };
};
