import { useLivesFiltersStore, type LivesDateRange } from "@/store";
import { useShallow } from "zustand/react/shallow";

/** State of the lives filter bar. */
export const useLivesFilters = () => {
  const { filters, setFilter, resetFilters } = useLivesFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const canClear = useLivesFiltersStore(
    (state) => Object.keys(state.getQueryParams()).length > 0,
  );

  return {
    filters,
    canClear,
    onDateRangeChange: (value: LivesDateRange) => setFilter("dateRange", value),
    onTitleChange: (value: string) => setFilter("title", value),
    onClear: resetFilters,
  };
};
