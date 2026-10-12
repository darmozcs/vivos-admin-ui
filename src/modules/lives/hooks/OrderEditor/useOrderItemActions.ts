import type { OrderItem } from "@/models";
import type { OrderStatus, PackageStatus } from "@/types";
import { ORDER_ITEM_FIELD, type OrderItemField } from "../../const/lives.const";
import { addItemToOrder } from "../../utils/live.utils";
import type { OrderDraft } from "./useOrderEditor";

interface UseOrderItemActionsProps {
  current: OrderDraft;
  commit: (next: OrderDraft) => void;
}

/** Pure edit operations over the order draft; every change is committed (saved). */
export const useOrderItemActions = ({
  current,
  commit,
}: UseOrderItemActionsProps) => {
  const updateItems = (updater: (items: OrderItem[]) => OrderItem[]) =>
    commit({ ...current, items: updater(current.items) });

  const mapItem = (index: number, change: (item: OrderItem) => OrderItem) =>
    updateItems((items) =>
      items.map((item, i) => (i === index ? change(item) : item)),
    );

  return {
    addItem: (newItem: OrderItem) =>
      updateItems((items) => addItemToOrder(items, newItem)),
    updateItemField: (index: number, field: OrderItemField, value: string | number) =>
      mapItem(index, (item) => ({
        ...item,
        [field]: field === ORDER_ITEM_FIELD.PRICE ? Number(value) || 0 : value,
      })),
    incrementItem: (index: number) =>
      mapItem(index, (item) => ({ ...item, quantity: item.quantity + 1 })),
    decrementItem: (index: number) =>
      current.items[index]?.quantity > 1
        ? mapItem(index, (item) => ({ ...item, quantity: item.quantity - 1 }))
        : updateItems((items) => items.filter((_, i) => i !== index)),
    removeItem: (index: number) =>
      updateItems((items) => items.filter((_, i) => i !== index)),
    setStatus: (status: OrderStatus) => commit({ ...current, status }),
    setPackageStatus: (packageStatus: PackageStatus) =>
      commit({ ...current, packageStatus }),
  };
};
