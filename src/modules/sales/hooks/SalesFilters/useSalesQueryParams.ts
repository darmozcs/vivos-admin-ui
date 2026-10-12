import { FILTER_DEBOUNCE_MS } from "@/modules/common/const";
import { useSalesFiltersStore } from "@/store";
import { useDebouncedValue } from "@mantine/hooks";
import { useShallow } from "zustand/react/shallow";

/**
 * GET /orders params from the filters store, debounced so typing doesn't spam
 * the API. The table and the summary share it, so both always match.
 */
export const useSalesQueryParams = () => {
  const params = useSalesFiltersStore(useShallow((state) => state.getQueryParams()));
  const [debouncedParams] = useDebouncedValue(params, FILTER_DEBOUNCE_MS);

  return {
    params: debouncedParams,
    hasActiveFilters: Object.keys(debouncedParams).length > 0,
  };
};
