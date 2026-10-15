import type { GetBalanceParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { BalanceEntryType } from "@/types";
import { create } from "zustand";

/** Inclusive [from, to] days as YYYY-MM-DD; either side may be open. */
export type BalanceDateRange = [string | null, string | null];

export interface BalanceFilters {
  dateRange: BalanceDateRange;
  type: BalanceEntryType | null;
}

interface BalanceFiltersState {
  filters: BalanceFilters;
  setFilter: <TKey extends keyof BalanceFilters>(key: TKey, value: BalanceFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /balance params, without the empty ones. */
  getQueryParams: () => GetBalanceParams;
}

const FILTERS_INITIAL: BalanceFilters = {
  dateRange: [null, null],
  type: null,
};

/** Server-side filters of the balance page (also applied to the totals). */
export const useBalanceFiltersStore = create<BalanceFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => {
    const { dateRange, type } = get().filters;
    return compactParams({ from: dateRange[0], to: dateRange[1], type });
  },
}));
