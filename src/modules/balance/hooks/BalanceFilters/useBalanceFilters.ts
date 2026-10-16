import { useTagOptions } from "@/modules/common/hooks";
import { useBalanceFiltersStore, type BalanceDateRange } from "@/store";
import type { BalanceEntryType } from "@/types";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { getBalanceEntryTypeOptions } from "../../utils/balance.utils";

/** State and options of the balance filter bar. */
export const useBalanceFilters = () => {
  const { t } = useTranslation("balance");
  const { filters, setFilter, resetFilters } = useBalanceFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const { options: tagOptions } = useTagOptions();
  const canClear = useBalanceFiltersStore((state) => Object.keys(state.getQueryParams()).length > 0);

  return {
    filters,
    canClear,
    typeOptions: getBalanceEntryTypeOptions(t),
    onDateRangeChange: (value: BalanceDateRange) => setFilter("dateRange", value),
    onTypeChange: (value: string | null) => setFilter("type", value as BalanceEntryType | null),
    tagOptions,
    onTagsChange: (tagIds: string[]) => setFilter("tagIds", tagIds),
    onClear: resetFilters,
  };
};
