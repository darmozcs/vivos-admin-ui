import { config } from "@/config";
import { SETTINGS_PATH } from "@/DAL/const";
import type { StoreSettings } from "@/models";
import { delay, http, HttpResponse } from "msw";
import { updateMockAccounts } from "../data/accounts";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";

const API_URL = config.VITE_API_BASE_URL || "";
const STORE_NAME_MAX = 60;

export const settingsHandlers = [
  // Authenticated and store-scoped: the name is the one of the admin's store.
  http.get(`${API_URL}${SETTINGS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    return HttpResponse.json<StoreSettings>({ storeName: guard.store.name });
  }),

  http.put(`${API_URL}${SETTINGS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const storeName = ((await request.json()) as StoreSettings).storeName?.trim();
    if (!storeName || storeName.length > STORE_NAME_MAX) {
      return errorResponse(400, "El nombre de la tienda es obligatorio");
    }
    updateMockAccounts((accounts) => {
      const store = accounts.stores.find((s) => s.id === guard.store.id);
      if (store) store.name = storeName;
    });
    return HttpResponse.json<StoreSettings>({ storeName });
  }),
];
