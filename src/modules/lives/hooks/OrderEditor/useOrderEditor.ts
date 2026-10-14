import {
  useClientsQuery,
  useLiveActionMutation,
  useLiveOrdersQuery,
  useSaveLiveOrderMutation,
} from "@/DAL";
import { extractErrorMessage, formatMoney, formatSaleNumber, getInitials } from "@/libs";
import type { OrderItem } from "@/models";
import {
  DEFAULT_ORDER_STATUS,
  DEFAULT_PACKAGE_STATUS,
} from "@/modules/common/const";
import { getOrderTotal, getOrderUnits } from "@/modules/common/utils";
import { useLiveWorkspaceStore } from "@/store";
import { LIVE_ACTION, type OrderStatus, type PackageStatus } from "@/types";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddItemForm } from "../AddItemForm/useAddItemForm";
import { useOrderItemActions } from "./useOrderItemActions";
import {
  getKnownItems,
  isLiveEnded,
  isLiveStarted,
} from "../../utils/live.utils";
import { useWorkspaceLive } from "../WorkspaceLive/useWorkspaceLive";

export interface OrderDraft {
  status: OrderStatus;
  packageStatus: PackageStatus;
  items: OrderItem[];
}

export const useOrderEditor = () => {
  const { t } = useTranslation("lives");
  const selectedClientId = useLiveWorkspaceStore((s) => s.selectedClientId);
  const markSaved = useLiveWorkspaceStore((s) => s.markSaved);
  const { data: live } = useWorkspaceLive();
  const { data: orders = [] } = useLiveOrdersQuery(live?.id);
  const { data: clients = [] } = useClientsQuery();
  const saveOrder = useSaveLiveOrderMutation();
  const liveAction = useLiveActionMutation();
  // Local copy of the order being edited, so inputs stay responsive while saving.
  const [draft, setDraft] = useState<OrderDraft | null>(null);

  const client = clients.find((c) => c.id === selectedClientId);
  const serverOrder = orders.find((o) => o.clientId === selectedClientId);
  const current: OrderDraft = draft ?? {
    status: serverOrder?.status ?? DEFAULT_ORDER_STATUS,
    packageStatus: serverOrder?.packageStatus ?? DEFAULT_PACKAGE_STATUS,
    items: serverOrder?.items ?? [],
  };
  const knownItems = useMemo(() => getKnownItems(orders), [orders]);

  const commit = (next: OrderDraft) => {
    if (!live || !selectedClientId) return;
    setDraft(next);
    saveOrder.mutate(
      { liveId: live.id, clientId: selectedClientId, ...next },
      {
        onSuccess: markSaved,
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("errors.saveOrder")),
          }),
      },
    );
  };

  const actions = useOrderItemActions({ current, commit });
  const addItemForm = useAddItemForm({ knownItems, onAdd: actions.addItem });

  return {
    client: client && {
      fullName: client.fullName,
      account: client.account || t("editor.noAccount"),
      phone: client.phone || t("editor.noPhone"),
      initials: getInitials(client.fullName),
    },
    // A new order has no number until the server assigns it (placeholder 0).
    saleNumber:
      serverOrder && serverOrder.number > 0
        ? formatSaleNumber(serverOrder.liveNumber, serverOrder.number)
        : null,
    started: isLiveStarted(live),
    ended: isLiveEnded(live),
    onStartLive: () =>
      live && liveAction.mutate({ id: live.id, action: LIVE_ACTION.START }),
    status: current.status,
    packageStatus: current.packageStatus,
    lines: current.items.map((item) => ({
      ...item,
      subtotal: formatMoney(item.price * item.quantity),
    })),
    units: getOrderUnits(current.items),
    total: formatMoney(getOrderTotal(current.items)),
    addItemForm,
    ...actions,
  };
};
