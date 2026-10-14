import type { GetSellersParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { DeliveryType, Department } from "@/types";
import { create } from "zustand";

export interface SellersFilters {
  /** Searches name, account, phone and email at once. */
  search: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
}

interface SellersFiltersState {
  filters: SellersFilters;
  setFilter: <TKey extends keyof SellersFilters>(key: TKey, value: SellersFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /sellers params, without the empty ones. */
  getQueryParams: () => GetSellersParams;
}

const FILTERS_INITIAL: SellersFilters = {
  search: "",
  department: null,
  deliveryType: null,
};

/** Server-side filters of the sellers page. */
export const useSellersFiltersStore = create<SellersFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => compactParams({ ...get().filters }),
}));
