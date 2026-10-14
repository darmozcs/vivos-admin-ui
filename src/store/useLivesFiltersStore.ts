import type { GetLivesParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import { create } from "zustand";

/** Inclusive range of local days as YYYY-MM-DD strings. */
export type LivesDateRange = [string | null, string | null];

export interface LivesFilters {
  dateRange: LivesDateRange;
  title: string;
}

interface LivesFiltersState {
  filters: LivesFilters;
  setFilter: <TKey extends keyof LivesFilters>(key: TKey, value: LivesFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /lives (and /lives/summary) params, without the empty ones. */
  getQueryParams: () => GetLivesParams;
}

const FILTERS_INITIAL: LivesFilters = {
  dateRange: [null, null],
  title: "",
};

/** Server-side filters of the lives history page. */
export const useLivesFiltersStore = create<LivesFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => {
    const { dateRange, title } = get().filters;
    return compactParams({ from: dateRange[0], to: dateRange[1], title });
  },
}));
