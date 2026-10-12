import { getDeliveryTypeOptions, getDepartmentOptions } from "@/modules/common/utils";
import { useClientsFiltersStore } from "@/store";
import type { DeliveryType, Department } from "@/types";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

/** State and options of the clients filter bar. */
export const useClientsFilters = () => {
  const { t } = useTranslation("clients");
  const { filters, setFilter, resetFilters } = useClientsFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const canClear = useClientsFiltersStore(
    (state) => Object.keys(state.getQueryParams()).length > 0,
  );

  return {
    filters,
    canClear,
    departmentOptions: getDepartmentOptions(t),
    deliveryTypeOptions: getDeliveryTypeOptions(t),
    onFullNameChange: (value: string) => setFilter("fullName", value),
    onAccountChange: (value: string) => setFilter("account", value),
    onPhoneChange: (value: string) => setFilter("phone", value),
    onDepartmentChange: (value: string | null) =>
      setFilter("department", value as Department | null),
    onDeliveryTypeChange: (value: string | null) =>
      setFilter("deliveryType", value as DeliveryType | null),
    onClear: resetFilters,
  };
};
