import { FILTER_DEBOUNCE_MS } from "@/modules/common/const";
import { useSellersFiltersStore } from "@/store";
import { useDebouncedValue } from "@mantine/hooks";
import { useShallow } from "zustand/react/shallow";

/** GET /sellers params from the filters store, debounced so typing doesn't spam the API. */
export const useSellersQueryParams = () => {
  const params = useSellersFiltersStore(useShallow((state) => state.getQueryParams()));
  const [debouncedParams] = useDebouncedValue(params, FILTER_DEBOUNCE_MS);

  return {
    params: debouncedParams,
    hasActiveFilters: Object.keys(debouncedParams).length > 0,
  };
};
