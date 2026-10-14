import type { GetClientsParams } from "@/DAL";
import { compactParams } from "@/libs/query";
import type { DeliveryType, Department } from "@/types";
import { create } from "zustand";

export interface ClientsFilters {
  /** Searches name, account, phone and email at once. */
  search: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
}

interface ClientsFiltersState {
  filters: ClientsFilters;
  setFilter: <TKey extends keyof ClientsFilters>(key: TKey, value: ClientsFilters[TKey]) => void;
  resetFilters: () => void;
  /** Filters as GET /clients params, without the empty ones. */
  getQueryParams: () => GetClientsParams;
}

const FILTERS_INITIAL: ClientsFilters = {
  search: "",
  department: null,
  deliveryType: null,
};

/** Server-side filters of the clients page. */
export const useClientsFiltersStore = create<ClientsFiltersState>((set, get) => ({
  filters: FILTERS_INITIAL,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: FILTERS_INITIAL }),
  getQueryParams: () => compactParams({ ...get().filters }),
}));
