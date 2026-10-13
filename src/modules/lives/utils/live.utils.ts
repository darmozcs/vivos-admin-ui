import type { Live, Order, OrderItem } from "@/models";
import { LIVE_STATUS } from "@/types";
import { INITIAL_ITEM_QUANTITY, LIVE_ACTIVE_STATUSES } from "../const/lives.const";

export const isLiveStarted = (live?: Live) =>
  !!live && live.status !== LIVE_STATUS.NOT_STARTED;

export const isLiveEnded = (live?: Live) => live?.status === LIVE_STATUS.ENDED;

export const isLiveActive = (live?: Live) =>
  !!live && LIVE_ACTIVE_STATUSES.includes(live.status);

export const isLiveRunning = (live?: Live) => live?.status === LIVE_STATUS.RUNNING;


const normalizeCode = (code: string) => code.trim().toLowerCase();

/** Name is compared too: without a code, it is what tells two garments apart. */
const isSameItem = (a: OrderItem, b: OrderItem) =>
  normalizeCode(a.code) === normalizeCode(b.code) &&
  normalizeCode(a.name) === normalizeCode(b.name) &&
  a.color === b.color &&
  a.price === b.price;

/** Adds an item; if the same garment is already in the order, adds one unit. */
export const addItemToOrder = (items: OrderItem[], newItem: OrderItem) => {
  const existing = items.find((item) => isSameItem(item, newItem));
  if (!existing) {
    return [...items, { ...newItem, quantity: INITIAL_ITEM_QUANTITY }];
  }
  return items.map((item) =>
    item === existing ? { ...item, quantity: item.quantity + 1 } : item,
  );
};

/** Garments already loaded during the live, indexed by normalized code. */
export const getKnownItems = (orders: Order[]) => {
  const known = new Map<string, OrderItem>();
  for (const order of orders) {
    for (const item of order.items) {
      if (item.code) known.set(normalizeCode(item.code), item);
    }
  }
  return known;
};

export const findKnownItem = (known: Map<string, OrderItem>, code: string) =>
  known.get(normalizeCode(code));

export const getOrdersWithItems = (orders: Order[]) =>
  orders.filter((order) => order.items.length > 0);
