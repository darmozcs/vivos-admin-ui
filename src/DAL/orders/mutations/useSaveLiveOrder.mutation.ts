import {
  BALANCE_DETAIL,
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
  // Server-owned fields keep their value until the response arrives. An order left without
  // items loses its package number right away, like the server does.
  const updated: Order = {
    id: existing?.id ?? `${payload.liveId}-${payload.clientId}`,
    liveNumber: existing?.liveNumber ?? 0,
    number: payload.items.length > 0 ? (existing?.number ?? null) : null,
    createdAt: existing?.createdAt ?? now,
    ...payload,
    updatedAt: now,
  };

  return existing
    ? current.map((order) => (order === existing ? updated : order))
    : [...current, updated];
};

/**
 * Copies the fields only the server knows (id, numbers, creation date) into the cached order,
 * so the package label shows up as soon as the first purchase is saved. Items and statuses are
 * left alone: they may already hold newer local edits.
 */
const applyServerFields = (orders: Order[] | undefined, saved: Order): Order[] | undefined =>
  orders?.map((order) =>
    order.clientId === saved.clientId
      ? {
          ...order,
          id: saved.id,
          liveNumber: saved.liveNumber,
          number: saved.number,
          createdAt: saved.createdAt,
        }
      : order,
  );

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
    onSuccess: async (saved, payload) => {
      queryClient.setQueryData<Order[]>([LIVE_ORDER_LIST, payload.liveId], (orders) =>
        applyServerFields(orders, saved),
      );
      await Promise.all(
        [ORDER_LIST, ORDER_SUMMARY_DETAIL, LIVE_LIST, LIVE_SUMMARY_DETAIL, LIVE_DETAIL, BALANCE_DETAIL].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
    },
  });
};
