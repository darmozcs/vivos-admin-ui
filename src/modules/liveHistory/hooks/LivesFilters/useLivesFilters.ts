import {
  isInvalidRange,
  useLivesFiltersStore,
  type LivesDateRange,
  type LivesFilters,
  type LivesRangeFilter,
} from "@/store";
import type { NumberRange } from "@/types";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { LIVES_RANGE_FILTERS } from "../../const/livesFilters.const";

export type LivesRangeErrors = Partial<Record<LivesRangeFilter, string>>;

const getRangeErrors = (filters: LivesFilters, message: string): LivesRangeErrors =>
  Object.fromEntries(
    LIVES_RANGE_FILTERS.filter(({ key }) => isInvalidRange(filters[key])).map(({ key }) => [
      key,
      message,
    ]),
  );

/** State of the lives filter bar; invalid ranges show an error and are not sent. */
export const useLivesFilters = () => {
  const { t } = useTranslation("liveHistory");
  const { filters, setFilter, resetFilters } = useLivesFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const rangeErrors = getRangeErrors(filters, t("filters.rangeError"));
  const hasParams = useLivesFiltersStore(
    (state) => Object.keys(state.getQueryParams()).length > 0,
  );

  return {
    filters,
    rangeErrors,
    // An invalid range is not sent but it still is something to clear.
    canClear: hasParams || Object.keys(rangeErrors).length > 0,
    onDateRangeChange: (value: LivesDateRange) => setFilter("dateRange", value),
    onTitleChange: (value: string) => setFilter("title", value),
    onRangeChange: (key: LivesRangeFilter, value: NumberRange) => setFilter(key, value),
    onClear: resetFilters,
  };
};
