import type { Client } from "@/models";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

/** Mock rows carry the store they belong to; handlers filter by it. */
export type MockClient = Client & { storeId: string };

const CREATED_AT = "2026-09-01T12:00:00Z";

export const MOCK_CLIENTS: MockClient[] = [
  { id: "c1", storeId: STORE_1, fullName: "Lucía Fernández", account: "@luciaf", phone: "099 123 456", email: "lucia.fernandez@gmail.com", department: "MONTEVIDEO", deliveryType: "DOMICILIO", createdAt: CREATED_AT, address: "Av. 18 de Julio 1234, apto 502, Montevideo" },
  { id: "c2", storeId: STORE_1, fullName: "Martina Pereira", account: "@marpereira", phone: "098 554 210", email: "", department: "MONTEVIDEO", deliveryType: "CADETERIA", createdAt: CREATED_AT, address: "Bvar. Artigas 860, Montevideo" },
  { id: "c3", storeId: STORE_1, fullName: "Sofía Rodríguez", account: "@sofi.rod", phone: "091 778 003", email: "sofi.rod@hotmail.com", department: null, deliveryType: null, createdAt: CREATED_AT, address: "" },
  { id: "c4", storeId: STORE_1, fullName: "Valentina Silva", account: "@valesilva", phone: "094 201 887", email: "", department: "MONTEVIDEO", deliveryType: "DOMICILIO", createdAt: CREATED_AT, address: "Rambla Rep. de México 5521, Montevideo" },
  { id: "c5", storeId: STORE_1, fullName: "Camila González", account: "@camigonz", phone: "099 640 119", email: "camigonz@gmail.com", department: "MALDONADO", deliveryType: "AGENCIA", createdAt: CREATED_AT, address: "Calle 20 y 27, Punta del Este" },
  { id: "c6", storeId: STORE_1, fullName: "Agustina López", account: "@agus.lopez", phone: "092 318 765", email: "", department: "CANELONES", deliveryType: "AGENCIA", createdAt: CREATED_AT, address: "" },
  { id: "c7", storeId: STORE_1, fullName: "Florencia Martínez", account: "@flor.mtz", phone: "095 902 341", email: "", department: null, deliveryType: null, createdAt: CREATED_AT, address: "" },
  { id: "c8", storeId: STORE_2, fullName: "Paula Méndez", account: "@pau.mendez", phone: "099 410 220", email: "pau.mendez@gmail.com", department: "MONTEVIDEO", deliveryType: "CADETERIA", createdAt: CREATED_AT, address: "Av. Italia 3020, Montevideo" },
  { id: "c9", storeId: STORE_2, fullName: "Carolina Díaz", account: "@caro.diaz", phone: "098 330 118", email: "", department: "SALTO", deliveryType: "AGENCIA", createdAt: CREATED_AT, address: "" },
];
