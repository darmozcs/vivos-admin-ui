import { config } from "@/config";
import { LIVES_PATH, ORDERS_PATH, ORDERS_SUMMARY_PATH } from "@/DAL/const";
import type { SaveLiveOrderPayload, UpdateOrderStatusPayload } from "@/DAL/orders";
import { LIVE_STATUS, PACKAGE_STATUS } from "@/types";
import { delay, http, HttpResponse } from "msw";
import { MOCK_CLIENTS } from "../data/clients";
import { MOCK_LIVES } from "../data/lives";
import { MOCK_ORDERS, type MockOrder } from "../data/orders";
import { containsText, INVALID_DATE_RANGE, textParam, toLocalDay } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";
import { findLive } from "./lives.handlers";

const API_URL = config.VITE_API_BASE_URL || "";

type SaveOrderBody = Pick<SaveLiveOrderPayload, "status" | "packageStatus" | "items">;

const storeOrders = (storeId: string) =>
  MOCK_ORDERS.filter((order) => order.storeId === storeId);

/** Sale numbers are correlative per store. */
const nextOrderNumber = (storeId: string) =>
  storeOrders(storeId).reduce((max, order) => Math.max(max, order.number), 0) + 1;

/**
 * Orders with items matching the GET /orders filters (AND), like vivos-be.
 * Dates are inclusive local days compared against createdAt.
 */
const filterOrders = (storeId: string, params: URLSearchParams) => {
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  if (from && to && from > to) return { error: errorResponse(400, INVALID_DATE_RANGE) };
  const liveTitle = textParam(params, "liveTitle");
  const clientId = params.get("clientId") || undefined;
  const status = params.get("status") || undefined;
  const packageStatus = params.get("packageStatus") || undefined;
  const liveTitles = new Map(
    MOCK_LIVES.filter((live) => live.storeId === storeId).map((live) => [live.id, live.title]),
  );
  const orders = storeOrders(storeId).filter((order) => {
    const day = toLocalDay(order.createdAt);
    return (
      order.items.length > 0 &&
      (!from || day >= from) &&
      (!to || day <= to) &&
      (!liveTitle || containsText(liveTitles.get(order.liveId), liveTitle)) &&
      (!clientId || order.clientId === clientId) &&
      (!status || order.status === status) &&
      (!packageStatus || order.packageStatus === packageStatus)
    );
  });
  return { orders };
};

export const orderHandlers = [
  http.get(`${API_URL}${ORDERS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const result = filterOrders(guard.store.id, new URL(request.url).searchParams);
    if ("error" in result) return result.error;
    return HttpResponse.json(result.orders.sort((a, b) => b.number - a.number));
  }),

  http.get(`${API_URL}${ORDERS_SUMMARY_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const result = filterOrders(guard.store.id, new URL(request.url).searchParams);
    if ("error" in result) return result.error;
    // Totals cover every matching order (cancelled ones included), like vivos-be.
    const items = result.orders.flatMap((order) => order.items);
    return HttpResponse.json({
      orders: result.orders.length,
      units: items.reduce((units, item) => units + item.quantity, 0),
      totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
    });
  }),

  http.get(`${API_URL}${LIVES_PATH}/:liveId/orders`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    // Unknown lives and lives of other stores answer 404, like vivos-be.
    if (!findLive(guard.store.id, String(params.liveId))) {
      return errorResponse(404, "Vivo no encontrado");
    }
    return HttpResponse.json(
      storeOrders(guard.store.id).filter((order) => order.liveId === params.liveId),
    );
  }),

  http.put(
    `${API_URL}${LIVES_PATH}/:liveId/orders/:clientId`,
    async ({ params, request }) => {
      await delay(MOCK_DELAY_MS);
      const guard = requireStore(request);
      if ("error" in guard) return guard.error;
      const storeId = guard.store.id;
      const liveId = String(params.liveId);
      const clientId = String(params.clientId);
      const live = findLive(storeId, liveId);
      if (!live) return errorResponse(404, "Vivo no encontrado");
      if (!MOCK_CLIENTS.some((c) => c.id === clientId && c.storeId === storeId)) {
        return errorResponse(404, "Clienta no encontrada");
      }
      if (live.status === LIVE_STATUS.NOT_STARTED) {
        return errorResponse(409, "El vivo todavía no comenzó");
      }

      const body = (await request.json()) as SaveOrderBody;
      const invalidItem = body.items?.some(
        (item) => item.price == null || item.price < 0 || (item.quantity != null && item.quantity < 1),
      );
      if (invalidItem) return errorResponse(400, "Las prendas necesitan un precio válido");
      const existing = storeOrders(storeId).find(
        (order) => order.liveId === liveId && order.clientId === clientId,
      );
      const now = new Date().toISOString();
      const saved: MockOrder = {
        id: existing?.id ?? crypto.randomUUID(),
        storeId,
        number: existing?.number ?? nextOrderNumber(storeId),
        liveId,
        clientId,
        status: body.status,
        packageStatus:
          body.packageStatus ?? existing?.packageStatus ?? PACKAGE_STATUS.PENDING,
        items: body.items,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };
      if (existing) Object.assign(existing, saved);
      else MOCK_ORDERS.push(saved);
      return HttpResponse.json(saved);
    },
  ),

  http.patch(`${API_URL}${ORDERS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const order = storeOrders(guard.store.id).find((o) => o.id === params.id);
    if (!order) return errorResponse(404, "Venta no encontrada");
    const body = (await request.json()) as UpdateOrderStatusPayload;
    if (body.status) order.status = body.status;
    if (body.packageStatus) order.packageStatus = body.packageStatus;
    order.updatedAt = new Date().toISOString();
    return HttpResponse.json(order);
  }),
];
