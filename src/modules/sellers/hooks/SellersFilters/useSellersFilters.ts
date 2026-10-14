import { getDeliveryTypeOptions, getDepartmentOptions } from "@/modules/common/utils";
import { useSellersFiltersStore } from "@/store";
import type { DeliveryType, Department } from "@/types";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

/** State and options of the sellers filter bar. */
export const useSellersFilters = () => {
  const { t } = useTranslation("sellers");
  const { filters, setFilter, resetFilters } = useSellersFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const canClear = useSellersFiltersStore(
    (state) => Object.keys(state.getQueryParams()).length > 0,
  );

  return {
    filters,
    canClear,
    departmentOptions: getDepartmentOptions(t),
    deliveryTypeOptions: getDeliveryTypeOptions(t),
    onSearchChange: (value: string) => setFilter("search", value),
    onDepartmentChange: (value: string | null) =>
      setFilter("department", value as Department | null),
    onDeliveryTypeChange: (value: string | null) =>
      setFilter("deliveryType", value as DeliveryType | null),
    onClear: resetFilters,
  };
};
