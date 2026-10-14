import type { Order } from "@/models";
import { ORDER_STATUS, PACKAGE_STATUS } from "@/types";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

export type MockOrder = Order & { storeId: string };

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "o0a",
    storeId: STORE_1,
    liveNumber: 1,
    number: 1,
    liveId: "l0",
    clientId: "c1",
    status: ORDER_STATUS.PAID,
    packageStatus: PACKAGE_STATUS.DELIVERED,
    items: [
      { code: "045", name: "Short de jean", color: "Celeste", price: 1290, quantity: 1 },
      { code: "052", name: "Musculosa rib", color: "Blanco", price: 690, quantity: 2 },
    ],
    createdAt: "2026-08-30T21:35:00Z",
    updatedAt: "2026-09-02T15:10:00Z",
  },
  {
    id: "o0b",
    storeId: STORE_1,
    liveNumber: 1,
    number: 2,
    liveId: "l0",
    clientId: "c3",
    status: ORDER_STATUS.PAID,
    packageStatus: PACKAGE_STATUS.SHIPPED,
    items: [
      { code: "052", name: "Musculosa rib", color: "Negro", price: 690, quantity: 1 },
    ],
    createdAt: "2026-08-30T21:52:00Z",
    updatedAt: "2026-09-01T11:30:00Z",
  },
  {
    id: "o0c",
    storeId: STORE_1,
    liveNumber: 1,
    number: 3,
    liveId: "l0",
    clientId: "c5",
    status: ORDER_STATUS.PAID,
    packageStatus: PACKAGE_STATUS.PREPARED,
    items: [
      { code: "061", name: "Vestido solero", color: "Floreado", price: 1890, quantity: 1 },
      { code: "045", name: "Short de jean", color: "Celeste", price: 1290, quantity: 1 },
    ],
    createdAt: "2026-08-30T22:04:00Z",
    updatedAt: "2026-08-31T18:00:00Z",
  },
  {
    id: "o1",
    storeId: STORE_1,
    liveNumber: 2,
    number: 1,
    liveId: "l1",
    clientId: "c2",
    status: ORDER_STATUS.PAID,
    packageStatus: PACKAGE_STATUS.SHIPPED,
    items: [
      { code: "201", name: "Saco de paño", color: "Camel", price: 3490, quantity: 1 },
      { code: "305", name: "Bufanda tejida", color: "Crudo", price: 890, quantity: 2 },
    ],
    createdAt: "2026-09-20T21:12:00Z",
    updatedAt: "2026-09-22T10:45:00Z",
  },
  {
    id: "o2",
    storeId: STORE_1,
    liveNumber: 2,
    number: 2,
    liveId: "l1",
    clientId: "c4",
    status: ORDER_STATUS.PENDING,
    packageStatus: PACKAGE_STATUS.PENDING,
    items: [
      { code: "118", name: "Sweater oversize", color: "Gris", price: 1990, quantity: 1 },
    ],
    createdAt: "2026-09-20T21:40:00Z",
    updatedAt: "2026-09-20T21:45:00Z",
  },
  {
    id: "o3",
    storeId: STORE_2,
    liveNumber: 1,
    number: 1,
    liveId: "l3",
    clientId: "c8",
    status: ORDER_STATUS.PAID,
    packageStatus: PACKAGE_STATUS.PREPARED,
    items: [
      { code: "A10", name: "Campera de jean", color: "Azul", price: 2890, quantity: 1 },
    ],
    createdAt: "2026-09-25T21:10:00Z",
    updatedAt: "2026-09-26T10:00:00Z",
  },
];
