import { useClientsQuery, useLivesQuery, useOrdersQuery } from "@/DAL";
import { formatDateTime, formatMoney, formatSaleNumber } from "@/libs";
import { getOrderTotal, getOrderUnits } from "@/modules/common/utils";
import type { OrderStatus, PackageStatus } from "@/types";
import { useMemo } from "react";
import { useOrderStatusUpdate } from "../OrderStatusUpdate/useOrderStatusUpdate";
import { useSalesQueryParams } from "../SalesFilters/useSalesQueryParams";

export interface SaleRow {
  id: string;
  saleNumber: string;
  createdAt: string;
  updatedAt: string;
  liveTitle: string;
  units: number;
  total: string;
  clientName: string;
  status: OrderStatus;
  packageStatus: PackageStatus;
}

export const useSalesTable = () => {
  const { params, hasActiveFilters } = useSalesQueryParams();
  const { data: orders = [], isLoading, isPlaceholderData } = useOrdersQuery(params);
  const { data: clients = [] } = useClientsQuery();
  const { data: lives = [] } = useLivesQuery();
  const { update, updatingId } = useOrderStatusUpdate();

  const records = useMemo<SaleRow[]>(() => {
    const clientNames = new Map(clients.map((c) => [c.id, c.fullName]));
    const liveTitles = new Map(lives.map((l) => [l.id, l.title]));
    return orders.map((order) => ({
      id: order.id,
      saleNumber: formatSaleNumber(order.liveNumber, order.number),
      createdAt: formatDateTime(order.createdAt),
      updatedAt: formatDateTime(order.updatedAt),
      liveTitle: liveTitles.get(order.liveId) ?? "",
      units: getOrderUnits(order.items),
      total: formatMoney(getOrderTotal(order.items)),
      clientName: clientNames.get(order.clientId) ?? "",
      status: order.status,
      packageStatus: order.packageStatus,
    }));
  }, [orders, clients, lives]);

  return {
    records,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    updatingId,
    onStatusChange: (id: string, status: OrderStatus) => update(id, { status }),
    onPackageStatusChange: (id: string, packageStatus: PackageStatus) =>
      update(id, { packageStatus }),
  };
};
