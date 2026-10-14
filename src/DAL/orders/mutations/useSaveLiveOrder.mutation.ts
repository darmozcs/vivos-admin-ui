import {
  LIVE_DETAIL,
  LIVE_LIST,
  LIVE_SUMMARY_DETAIL,
  LIVE_ORDER_LIST,
  ORDER_LIST,
  ORDER_SUMMARY_DETAIL,
} from "@/DAL/const";
import type { Order } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveLiveOrderService,
  type SaveLiveOrderPayload,
} from "../services/order.service";

const upsertOrder = (
  orders: Order[] | undefined,
  payload: SaveLiveOrderPayload,
): Order[] => {
  const current = orders ?? [];
  const existing = current.find((order) => order.clientId === payload.clientId);
  const now = new Date().toISOString();
  // Server-owned fields keep their value; a new order gets placeholders until refetched.
  const updated: Order = {
    id: existing?.id ?? `${payload.liveId}-${payload.clientId}`,
    liveNumber: existing?.liveNumber ?? 0,
    number: existing?.number ?? 0,
    createdAt: existing?.createdAt ?? now,
    ...payload,
    updatedAt: now,
  };

  return existing
    ? current.map((order) => (order === existing ? updated : order))
    : [...current, updated];
};

/**
 * Saves the order of a client inside a live. The live orders cache is updated
 * optimistically so every panel reflects the change while the request runs.
 */
export const useSaveLiveOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveLiveOrderPayload) =>
      (await saveLiveOrderService(payload)).data,
    onMutate: (payload) => {
      const queryKey = [LIVE_ORDER_LIST, payload.liveId];
      const previous = queryClient.getQueryData<Order[]>(queryKey);
      queryClient.setQueryData<Order[]>(queryKey, (orders) =>
        upsertOrder(orders, payload),
      );
      return { previous, queryKey };
    },
    onError: (_error, _payload, context) => {
      if (context) queryClient.setQueryData(context.queryKey, context.previous);
    },
    onSuccess: async () => {
      await Promise.all(
        [ORDER_LIST, ORDER_SUMMARY_DETAIL, LIVE_LIST, LIVE_SUMMARY_DETAIL, LIVE_DETAIL].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
    },
  });
};
