import type { GetTradesParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { TradeStatus, TradeType } from "@/types";
import { create } from "zustand";

/** Inclusive [from, to] days as YYYY-MM-DD; either side may be open. */
export type TradesDateRange = [string | null, string | null];

export interface TradesFilters {
  dateRange: TradesDateRange;
  search: string;
  type: TradeType | null;
  status: TradeStatus | null;
}

interface TradesFiltersState {
  filters: TradesFilters;
  setFilter: <TKey extends keyof TradesFilters>(key: TKey, value: TradesFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /trades params, without the empty ones. */
  getQueryParams: () => GetTradesParams;
}

const FILTERS_INITIAL: TradesFilters = {
  dateRange: [null, null],
  search: "",
  type: null,
  status: null,
};

/** Server-side filters of the trades page (also applied to the totals). */
export const useTradesFiltersStore = create<TradesFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => {
    const { dateRange, ...rest } = get().filters;
    return compactParams({ from: dateRange[0], to: dateRange[1], ...rest });
  },
}));
