import type { LivesRangeFilter } from "@/store";

/** Min/max filters of the lives page, in display order. */
export const LIVES_RANGE_FILTERS: {
  key: LivesRangeFilter;
  labelKey: string;
  allowDecimal: boolean;
}[] = [
  { key: "duration", labelKey: "filters.duration", allowDecimal: false },
  { key: "buyers", labelKey: "filters.buyers", allowDecimal: false },
  { key: "units", labelKey: "filters.units", allowDecimal: false },
  { key: "total", labelKey: "filters.total", allowDecimal: true },
];
