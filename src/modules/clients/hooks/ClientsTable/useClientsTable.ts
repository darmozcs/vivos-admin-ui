import { useClientsQuery, useOrdersQuery } from "@/DAL";
import type { DeliveryType, Department } from "@/types";
import { useMemo, useState } from "react";
import { useClientsQueryParams } from "../ClientsFilters/useClientsQueryParams";
import { useClientDelete } from "./useClientDelete";

export interface ClientRow {
  id: string;
  fullName: string;
  account: string;
  phone: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
  /** Clients with purchases are kept to preserve the sales history. */
  canDelete: boolean;
}

export const useClientsTable = () => {
  const { params, hasActiveFilters } = useClientsQueryParams();
  const { data: clients = [], isLoading, isPlaceholderData } = useClientsQuery(params);
  // The delete guard always counts every sale of the store, never filtered ones.
  const { data: orders = [] } = useOrdersQuery();
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const { requestDelete } = useClientDelete();

  const records = useMemo<ClientRow[]>(() => {
    // Any sale, even cancelled, is history that blocks deleting the client.
    const clientsWithHistory = new Set(orders.map((order) => order.clientId));
    return clients.map((client) => ({
      id: client.id,
      fullName: client.fullName,
      account: client.account,
      phone: client.phone,
      address: client.address,
      department: client.department,
      deliveryType: client.deliveryType,
      canDelete: !clientsWithHistory.has(client.id),
    }));
  }, [clients, orders]);

  return {
    records,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    editingClient: clients.find((client) => client.id === editingClientId) ?? null,
    openEdit: setEditingClientId,
    closeEdit: () => setEditingClientId(null),
    requestDelete,
  };
};
