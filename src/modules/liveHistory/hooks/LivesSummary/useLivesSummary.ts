import { useLivesSummaryQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import { useLivesQueryParams } from "../LivesFilters/useLivesQueryParams";

/** Totals of every live matching the current filters. */
export const useLivesSummary = () => {
  const { params } = useLivesQueryParams();
  const { data, isLoading, isPlaceholderData } = useLivesSummaryQuery(params);

  return {
    isLoading: isLoading || isPlaceholderData,
    lives: data?.lives ?? 0,
    buyers: data?.buyers ?? 0,
    units: data?.units ?? 0,
    total: formatMoney(data?.totalAmount ?? 0),
  };
};
