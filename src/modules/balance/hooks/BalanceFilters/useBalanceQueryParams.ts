import { FILTER_DEBOUNCE_MS } from "@/modules/common/const";
import { useBalanceFiltersStore } from "@/store";
import { useDebouncedValue } from "@mantine/hooks";
import { useShallow } from "zustand/react/shallow";

/** GET /balance params from the filters store, debounced like the other pages. */
export const useBalanceQueryParams = () => {
  const params = useBalanceFiltersStore(useShallow((state) => state.getQueryParams()));
  const [debouncedParams] = useDebouncedValue(params, FILTER_DEBOUNCE_MS);

  return {
    params: debouncedParams,
    hasActiveFilters: Object.keys(debouncedParams).length > 0,
  };
};
