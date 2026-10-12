import { useClientsQuery, useLiveOrdersQuery } from "@/DAL";
import { formatMoney, getInitials } from "@/libs";
import type { Client } from "@/models";
import { getOrderTotal, isBillableOrder } from "@/modules/common/utils";
import { useLiveWorkspaceStore } from "@/store";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { CLIENT_SEARCH_DEBOUNCE_MS } from "../../const/lives.const";
import { useNewClientForm } from "../NewClientForm/useNewClientForm";
import { useWorkspaceLive } from "../WorkspaceLive/useWorkspaceLive";

export interface ClientListItemView {
  id: string;
  fullName: string;
  account: string;
  initials: string;
  total: string;
  selected: boolean;
}

export const useClientsPanel = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search.trim(), CLIENT_SEARCH_DEBOUNCE_MS);
  const [newOpened, { open, close }] = useDisclosure();
  const selectedClientId = useLiveWorkspaceStore((state) => state.selectedClientId);
  const selectClient = useLiveWorkspaceStore((state) => state.selectClient);

  const { data: live } = useWorkspaceLive();
  const { data: orders = [] } = useLiveOrdersQuery(live?.id);
  const { data: clients = [], isFetching } = useClientsQuery({
    search: debouncedSearch || undefined,
  });

  const handleCreated = (client: Client) => {
    selectClient(client.id);
    setSearch("");
    close();
  };
  const newClientForm = useNewClientForm({ onCreated: handleCreated });

  const items = useMemo<ClientListItemView[]>(() => {
    const totalsByClient = new Map(
      orders
        .filter(isBillableOrder)
        .map((order) => [order.clientId, getOrderTotal(order.items)]),
    );
    return clients.map((client) => {
      const total = totalsByClient.get(client.id);
      return {
        id: client.id,
        fullName: client.fullName,
        account: client.account,
        initials: getInitials(client.fullName),
        total: total ? formatMoney(total) : "",
        selected: client.id === selectedClientId,
      };
    });
  }, [clients, orders, selectedClientId]);

  const openNew = (fullName = "") => {
    newClientForm.prefill(fullName);
    open();
  };

  const closeNew = () => {
    newClientForm.prefill("");
    close();
  };

  return {
    search,
    setSearch,
    items,
    showNoResults:
      !isFetching &&
      items.length === 0 &&
      debouncedSearch.length > 0 &&
      debouncedSearch === search.trim(),
    onSelect: selectClient,
    newOpened,
    openNew: () => openNew(),
    openNewFromSearch: () => openNew(search.trim()),
    closeNew,
    newClientForm,
  };
};
