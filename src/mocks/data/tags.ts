import type { Tag } from "@/models";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

/** Mock rows carry the store they belong to; handlers filter by it. */
export type MockTag = Tag & { storeId: string };

export const MOCK_TAGS: MockTag[] = [
  { id: "t1", storeId: STORE_1, name: "Invierno 2026", color: "#1C7ED6" },
  { id: "t2", storeId: STORE_1, name: "Feria", color: "#F76707" },
  { id: "t3", storeId: STORE_1, name: "Liquidación", color: "#E03131" },
  { id: "t4", storeId: STORE_2, name: "Verano", color: "#F59F00" },
];
