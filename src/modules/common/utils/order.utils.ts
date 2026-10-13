import type { Order, OrderItem } from "@/models";
import { ORDER_STATUS } from "@/types";

const QUANTITY_PREFIX = "×";
const SUMMARY_SEPARATOR = " · ";

export const isOrderCancelled = (order: Pick<Order, "status">) =>
  order.status === ORDER_STATUS.CANCELLED;

/** Orders that count towards totals: with items and not cancelled. */
export const isBillableOrder = (order: Order) =>
  order.items.length > 0 && !isOrderCancelled(order);

export const getOrderTotal = (items: OrderItem[]) =>
  items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

export const getOrderUnits = (items: OrderItem[]) =>
  items.reduce((units, item) => units + item.quantity, 0);

/** Short description of the items: "101 Verde ×2 · 205 Negro". Without a code, the name is used. */
export const summarizeOrderItems = (items: OrderItem[]) =>
  items
    .map((item) =>
      [
        item.code || item.name,
        item.color,
        item.quantity > 1 ? `${QUANTITY_PREFIX}${item.quantity}` : "",
      ]
        .filter(Boolean)
        .join(" "),
    )
    .join(SUMMARY_SEPARATOR);
