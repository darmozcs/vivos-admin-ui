import { useClientsQuery, useLiveOrdersQuery } from "@/DAL";
import { formatMoney } from "@/libs";
import {
  getOrderTotal,
  isOrderCancelled,
  summarizeOrderItems,
} from "@/modules/common/utils";
import { useLiveWorkspaceStore } from "@/store";
import type { OrderStatus, PackageStatus } from "@/types";
import { useMemo } from "react";
import { getOrdersWithItems } from "../../utils/live.utils";
import { useWorkspaceLive } from "../WorkspaceLive/useWorkspaceLive";

export interface LiveOrderView {
  clientId: string;
  clientName: string;
  total: string;
  summary: string;
  status: OrderStatus;
  packageStatus: PackageStatus;
  cancelled: boolean;
  selected: boolean;
}

export const useLiveOrders = () => {
  const selectedClientId = useLiveWorkspaceStore((s) => s.selectedClientId);
  const selectClient = useLiveWorkspaceStore((s) => s.selectClient);
  const { data: live } = useWorkspaceLive();
  const { data: orders = [] } = useLiveOrdersQuery(live?.id);
  const { data: clients = [] } = useClientsQuery();

  const liveOrders = useMemo<LiveOrderView[]>(() => {
    const namesById = new Map(clients.map((c) => [c.id, c.fullName]));
    return getOrdersWithItems(orders)
      .toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .map((order) => ({
        clientId: order.clientId,
        clientName: namesById.get(order.clientId) ?? "",
        total: formatMoney(getOrderTotal(order.items)),
        summary: summarizeOrderItems(order.items),
        status: order.status,
        packageStatus: order.packageStatus,
        cancelled: isOrderCancelled(order),
        selected: order.clientId === selectedClientId,
      }));
  }, [orders, clients, selectedClientId]);

  return { liveOrders, onEdit: selectClient };
};
