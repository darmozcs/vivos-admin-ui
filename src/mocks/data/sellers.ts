import type { Seller } from "@/models";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

/** Mock rows carry the store they belong to; handlers filter by it. */
export type MockSeller = Seller & { storeId: string };

const CREATED_AT = "2026-09-05T12:00:00Z";

export const MOCK_SELLERS: MockSeller[] = [
  { id: "v1", storeId: STORE_1, fullName: "Ropa Usada Uy", account: "@ropausada.uy", phone: "099 555 101", email: "ventas@ropausada.uy", department: "MONTEVIDEO", deliveryType: "CADETERIA", createdAt: CREATED_AT, address: "Av. Rivera 2450, Montevideo" },
  { id: "v2", storeId: STORE_1, fullName: "Feria Tristán Narvaja", account: "", phone: "098 222 404", email: "", department: "MONTEVIDEO", deliveryType: null, createdAt: CREATED_AT, address: "" },
  { id: "v3", storeId: STORE_2, fullName: "Outlet Salto", account: "@outletsalto", phone: "097 333 909", email: "", department: "SALTO", deliveryType: "AGENCIA", createdAt: CREATED_AT, address: "" },
];
