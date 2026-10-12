import {
  LIVE_CLIENT_ORDER_PATH,
  LIVE_ORDERS_PATH,
  ORDER_DETAIL_PATH,
  ORDERS_PATH,
  ORDERS_SUMMARY_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Order, OrderItem, OrdersSummary } from "@/models";
import type { OrderStatus, PackageStatus } from "@/types";
import type { AxiosResponse } from "axios";

export interface SaveLiveOrderPayload {
  liveId: string;
  clientId: string;
  status: OrderStatus;
  packageStatus: PackageStatus;
  items: OrderItem[];
}

/** Filters of GET /orders and /orders/summary, combined with AND. Empty values must not be sent. */
export interface GetOrdersParams {
  /** Inclusive local day, YYYY-MM-DD. */
  from?: string;
  /** Inclusive local day, YYYY-MM-DD. */
  to?: string;
  liveTitle?: string;
  clientId?: string;
  status?: OrderStatus;
  packageStatus?: PackageStatus;
}

export const getOrdersService = async (
  params: GetOrdersParams = {},
): Promise<AxiosResponse<Order[]>> =>
  await httpClient.get<Order[]>(ORDERS_PATH, { params });

export const getOrdersSummaryService = async (
  params: GetOrdersParams = {},
): Promise<AxiosResponse<OrdersSummary>> =>
  await httpClient.get<OrdersSummary>(ORDERS_SUMMARY_PATH, { params });

export const getLiveOrdersService = async (
  liveId: string,
): Promise<AxiosResponse<Order[]>> =>
  await httpClient.get<Order[]>(LIVE_ORDERS_PATH({ liveId }));

export const saveLiveOrderService = async ({
  liveId,
  clientId,
  ...payload
}: SaveLiveOrderPayload): Promise<AxiosResponse<Order>> =>
  await httpClient.put<Order>(
    LIVE_CLIENT_ORDER_PATH({ liveId, clientId }),
    payload,
  );

export interface UpdateOrderStatusPayload {
  status?: OrderStatus;
  packageStatus?: PackageStatus;
}

export const updateOrderStatusService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateOrderStatusPayload;
}): Promise<AxiosResponse<Order>> =>
  await httpClient.patch<Order>(ORDER_DETAIL_PATH({ id }), payload);
