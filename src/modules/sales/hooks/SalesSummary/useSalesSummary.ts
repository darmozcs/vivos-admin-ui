import { useOrdersSummaryQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import { useSalesQueryParams } from "../SalesFilters/useSalesQueryParams";

/** Totals of every sale matching the current filters. */
export const useSalesSummary = () => {
  const { params } = useSalesQueryParams();
  const { data, isLoading, isPlaceholderData } = useOrdersSummaryQuery(params);

  return {
    isLoading: isLoading || isPlaceholderData,
    orders: data?.orders ?? 0,
    units: data?.units ?? 0,
    total: formatMoney(data?.totalAmount ?? 0),
  };
};
