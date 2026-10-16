import { useTagOptions } from "@/modules/common/hooks";
import { useTradesFiltersStore, type TradesDateRange } from "@/store";
import type { TradeStatus, TradeType } from "@/types";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { TRADE_STATUSES_BY_TYPE } from "../../const/trade.const";
import { getTradeStatusOptions, getTradeTypeOptions } from "../../utils/tradeOptions.utils";

/** State and options of the trades filter bar. */
export const useTradesFilters = () => {
  const { t } = useTranslation("trades");
  const { filters, setFilter, resetFilters } = useTradesFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const { options: tagOptions } = useTagOptions();
  const canClear = useTradesFiltersStore((state) => Object.keys(state.getQueryParams()).length > 0);

  const onTypeChange = (value: string | null) => {
    const type = value as TradeType | null;
    setFilter("type", type);
    // A status of the other type would never match.
    if (type && filters.status && !TRADE_STATUSES_BY_TYPE[type].includes(filters.status)) {
      setFilter("status", null);
    }
  };

  return {
    filters,
    canClear,
    typeOptions: getTradeTypeOptions(t),
    statusOptions: getTradeStatusOptions(t, filters.type),
    onDateRangeChange: (value: TradesDateRange) => setFilter("dateRange", value),
    onSearchChange: (value: string) => setFilter("search", value),
    onTypeChange,
    onStatusChange: (value: string | null) => setFilter("status", value as TradeStatus | null),
    tagOptions,
    onTagsChange: (tagIds: string[]) => setFilter("tagIds", tagIds),
    onClear: resetFilters,
  };
};
