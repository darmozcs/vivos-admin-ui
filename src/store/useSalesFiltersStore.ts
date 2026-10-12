import type { GetOrdersParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { OrderStatus, PackageStatus } from "@/types";
import { create } from "zustand";

/** Inclusive range of local days as YYYY-MM-DD strings. */
export type SalesDateRange = [string | null, string | null];

export interface SalesFilters {
  dateRange: SalesDateRange;
  liveTitle: string;
  clientId: string | null;
  status: OrderStatus | null;
  packageStatus: PackageStatus | null;
}

interface SalesFiltersState {
  filters: SalesFilters;
  setFilter: <TKey extends keyof SalesFilters>(key: TKey, value: SalesFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /orders (and /orders/summary) params, without the empty ones. */
  getQueryParams: () => GetOrdersParams;
}

const FILTERS_INITIAL: SalesFilters = {
  dateRange: [null, null],
  liveTitle: "",
  clientId: null,
  status: null,
  packageStatus: null,
};

/** Server-side filters of the sales page. */
export const useSalesFiltersStore = create<SalesFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => {
    const { dateRange, ...rest } = get().filters;
    return compactParams({ from: dateRange[0], to: dateRange[1], ...rest });
  },
}));
