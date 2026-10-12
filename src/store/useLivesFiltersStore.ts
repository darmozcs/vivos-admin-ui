import type { GetLivesParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { NumberRange } from "@/types";
import { create } from "zustand";

/** Inclusive range of local days as YYYY-MM-DD strings. */
export type LivesDateRange = [string | null, string | null];

export interface LivesFilters {
  dateRange: LivesDateRange;
  title: string;
  /** Effective duration in whole minutes. */
  duration: NumberRange;
  buyers: NumberRange;
  units: NumberRange;
  total: NumberRange;
}

/** Filters of the lives page that hold a min/max pair. */
export type LivesRangeFilter = "duration" | "buyers" | "units" | "total";

interface LivesFiltersState {
  filters: LivesFilters;
  setFilter: <TKey extends keyof LivesFilters>(key: TKey, value: LivesFilters[TKey]) => void;
  resetFilters: () => void;
  /**
   * Filters as GET /lives (and /lives/summary) params, without the empty ones
   * nor the ranges whose min is greater than their max.
   */
  getQueryParams: () => GetLivesParams;
}

const FILTERS_INITIAL: LivesFilters = {
  dateRange: [null, null],
  title: "",
  duration: [null, null],
  buyers: [null, null],
  units: [null, null],
  total: [null, null],
};

/** A range is invalid only when both sides are set and min > max. */
export const isInvalidRange = ([min, max]: NumberRange) =>
  min !== null && max !== null && min > max;

/** Range as [min, max] params; an invalid range is not sent at all. */
const rangeParams = (range: NumberRange) =>
  isInvalidRange(range) ? [null, null] : range;

/** Server-side filters of the lives history page. */
export const useLivesFiltersStore = create<LivesFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => {
    const { dateRange, title, duration, buyers, units, total } = get().filters;
    const [minDurationMinutes, maxDurationMinutes] = rangeParams(duration);
    const [minBuyers, maxBuyers] = rangeParams(buyers);
    const [minUnits, maxUnits] = rangeParams(units);
    const [minTotal, maxTotal] = rangeParams(total);
    return compactParams({
      from: dateRange[0],
      to: dateRange[1],
      title,
      minDurationMinutes,
      maxDurationMinutes,
      minBuyers,
      maxBuyers,
      minUnits,
      maxUnits,
      minTotal,
      maxTotal,
    });
  },
}));
