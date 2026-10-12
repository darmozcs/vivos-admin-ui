import { useClientsQuery } from "@/DAL";
import { getOrderStatusOptions, getPackageStatusOptions } from "@/modules/common/utils";
import { useSalesFiltersStore, type SalesDateRange } from "@/store";
import type { OrderStatus, PackageStatus } from "@/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

/** State and options of the sales filter bar. */
export const useSalesFilters = () => {
  const { t } = useTranslation("sales");
  const { filters, setFilter, resetFilters } = useSalesFiltersStore(
    useShallow(({ filters, setFilter, resetFilters }) => ({ filters, setFilter, resetFilters })),
  );
  const canClear = useSalesFiltersStore(
    (state) => Object.keys(state.getQueryParams()).length > 0,
  );
  // Every client of the store, not the ones filtered in the clients page.
  const { data: clients = [] } = useClientsQuery();
  const clientOptions = useMemo(
    () => clients.map((client) => ({ value: client.id, label: client.fullName })),
    [clients],
  );

  return {
    filters,
    canClear,
    clientOptions,
    statusOptions: getOrderStatusOptions(t),
    packageStatusOptions: getPackageStatusOptions(t),
    onDateRangeChange: (value: SalesDateRange) => setFilter("dateRange", value),
    onLiveTitleChange: (value: string) => setFilter("liveTitle", value),
    onClientChange: (value: string | null) => setFilter("clientId", value),
    onStatusChange: (value: string | null) => setFilter("status", value as OrderStatus | null),
    onPackageStatusChange: (value: string | null) =>
      setFilter("packageStatus", value as PackageStatus | null),
    onClear: resetFilters,
  };
};
