import type { Trade } from "@/models";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

/** Mock rows carry the store they belong to; names are resolved by the handlers. */
export type MockTrade = Omit<Trade, "sellerName" | "clientName"> & { storeId: string };

export const MOCK_TRADES: MockTrade[] = [
  { id: "l1", storeId: STORE_1, type: "PURCHASE", status: "PURCHASED", quantity: 80, price: 6000, note: "Remeras y buzos de invierno", sellerId: "v1", clientId: null, createdAt: "2026-09-10T14:00:00Z", updatedAt: "2026-09-12T10:30:00Z" },
  { id: "l2", storeId: STORE_1, type: "SALE", status: "SOLD", quantity: 50, price: 9500, note: "Jeans", sellerId: null, clientId: "c1", createdAt: "2026-09-15T16:20:00Z", updatedAt: "2026-09-18T09:00:00Z" },
  { id: "l3", storeId: STORE_1, type: "SALE", status: "PUBLISHED", quantity: 30, price: 4200, note: "", sellerId: null, clientId: "c4", createdAt: "2026-09-20T11:00:00Z", updatedAt: "2026-09-20T11:00:00Z" },
  { id: "l4", storeId: STORE_1, type: "PURCHASE", status: "PENDING", quantity: 25, price: 2500, note: "Vestidos de verano", sellerId: "v2", clientId: null, createdAt: "2026-09-22T18:45:00Z", updatedAt: "2026-09-22T18:45:00Z" },
  { id: "l5", storeId: STORE_2, type: "SALE", status: "SOLD", quantity: 40, price: 7000, note: "", sellerId: null, clientId: "c8", createdAt: "2026-09-25T13:00:00Z", updatedAt: "2026-09-26T13:00:00Z" },
];
