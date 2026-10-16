import { config } from "@/config";
import { TRADES_PATH, TRADES_SUMMARY_PATH } from "@/DAL/const";
import type { SaveTradePayload } from "@/DAL/trades";
import type { Trade, TradeSummary } from "@/models";
import { TRADE_STATUS, TRADE_TYPE } from "@/types";
import { delay, http, HttpResponse } from "msw";
import { MOCK_CLIENTS } from "../data/clients";
import { MOCK_TRADES, type MockTrade } from "../data/trades";
import { MOCK_SELLERS } from "../data/sellers";
import { containsText, INVALID_DATE_RANGE, textParam, toLocalDay } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";
import { unknownTag } from "./tags.handlers";

const API_URL = config.VITE_API_BASE_URL || "";
const NOTE_MAX = 500;
const STATUSES_BY_TYPE: Record<string, string[]> = {
  [TRADE_TYPE.SALE]: [TRADE_STATUS.PUBLISHED, TRADE_STATUS.SOLD],
  [TRADE_TYPE.PURCHASE]: [TRADE_STATUS.PENDING, TRADE_STATUS.PURCHASED],
  [TRADE_TYPE.PAYMENT]: [TRADE_STATUS.PENDING, TRADE_STATUS.PAID],
};

/** Like vivos-be: the response carries the counterpart names. */
const toTrade = ({ storeId: _storeId, ...trade }: MockTrade): Trade => ({
  ...trade,
  sellerName: MOCK_SELLERS.find((seller) => seller.id === trade.sellerId)?.fullName ?? null,
  clientName: MOCK_CLIENTS.find((client) => client.id === trade.clientId)?.fullName ?? null,
});

/** Like vivos-be: a "from" day after the "to" day is a 400. */
const invalidDateRange = (params: URLSearchParams) => {
  const from = params.get("from");
  const to = params.get("to");
  return Boolean(from && to && from > to);
};

/** Trades of the store matching the query params (AND), newest first. Dates are inclusive local days. */
const filterTrades = (storeId: string, params: URLSearchParams) => {
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  const search = textParam(params, "search");
  const type = params.get("type") || undefined;
  const status = params.get("status") || undefined;
  const sellerId = params.get("sellerId") || undefined;
  const clientId = params.get("clientId") || undefined;
  const tagIds = params.get("tagIds")?.split(",").filter(Boolean) ?? [];
  return MOCK_TRADES.filter(
    (trade) =>
      trade.storeId === storeId &&
      (!from || toLocalDay(trade.createdAt) >= from) &&
      (!to || toLocalDay(trade.createdAt) <= to) &&
      containsText(trade.note, search) &&
      (!type || trade.type === type) &&
      (!status || trade.status === status) &&
      (!sellerId || trade.sellerId === sellerId) &&
      (!clientId || trade.clientId === clientId) &&
      (tagIds.length === 0 || trade.tagIds.some((id) => tagIds.includes(id))),
  ).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

/** Same validations as vivos-be; returns the error detail or the fields to save. */
const validate = (storeId: string, body: SaveTradePayload) => {
  if (!STATUSES_BY_TYPE[body.type]?.includes(body.status)) {
    return { error: "El estado no corresponde al tipo de movimiento" };
  }
  // Payments carry no garments: their quantity is ignored.
  const isPayment = body.type === TRADE_TYPE.PAYMENT;
  if (!isPayment && body.quantity == null) return { error: "La cantidad es obligatoria" };
  if (!isPayment && (!Number.isInteger(body.quantity) || (body.quantity ?? 0) < 1)) {
    return { error: "La cantidad debe ser al menos 1" };
  }
  if (typeof body.price !== "number" || body.price < 0) return { error: "El precio no puede ser negativo" };
  if ((body.note?.trim().length ?? 0) > NOTE_MAX) return { error: "La nota no puede superar 500 caracteres" };
  const isSale = body.type === TRADE_TYPE.SALE;
  // Like vivos-be: sales go to a client; purchases and payments to a seller.
  const exists = isSale
    ? MOCK_CLIENTS.some((client) => client.id === body.clientId && client.storeId === storeId)
    : MOCK_SELLERS.some((seller) => seller.id === body.sellerId && seller.storeId === storeId);
  if (!exists) return { error: isSale ? "Clienta no encontrada" : "Vendedor no encontrado" };
  if (unknownTag(storeId, body.tagIds)) return { error: "Alguna etiqueta no existe" };
  return {
    fields: {
      status: body.status,
      quantity: isPayment ? null : body.quantity,
      price: body.price,
      note: body.note?.trim() ?? "",
      clientId: isSale ? body.clientId : null,
      sellerId: isSale ? null : body.sellerId,
      tagIds: [...new Set(body.tagIds ?? [])],
    },
  };
};

const findTrade = (storeId: string, id: unknown) =>
  MOCK_TRADES.find((trade) => trade.id === id && trade.storeId === storeId);

export const tradeHandlers = [
  http.get(`${API_URL}${TRADES_SUMMARY_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const params = new URL(request.url).searchParams;
    if (invalidDateRange(params)) return errorResponse(400, INVALID_DATE_RANGE);
    const trades = filterTrades(guard.store.id, params);
    const sales = trades.filter((trade) => trade.type === TRADE_TYPE.SALE);
    // Like vivos-be: payments are added to purchases.
    const purchases = trades.filter((trade) => trade.type !== TRADE_TYPE.SALE);
    const sum = (items: MockTrade[], pick: (trade: MockTrade) => number) =>
      items.reduce((total, trade) => total + pick(trade), 0);
    const summary: TradeSummary = {
      salesTotal: sum(sales, (trade) => trade.price),
      purchasesTotal: sum(purchases, (trade) => trade.price),
      balance: sum(sales, (trade) => trade.price) - sum(purchases, (trade) => trade.price),
      salesCount: sales.length,
      purchasesCount: purchases.length,
      salesQuantity: sum(sales, (trade) => trade.quantity ?? 0),
      purchasesQuantity: sum(purchases, (trade) => trade.quantity ?? 0),
    };
    return HttpResponse.json(summary);
  }),

  http.get(`${API_URL}${TRADES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const params = new URL(request.url).searchParams;
    if (invalidDateRange(params)) return errorResponse(400, INVALID_DATE_RANGE);
    return HttpResponse.json(filterTrades(guard.store.id, params).map(toTrade));
  }),

  http.post(`${API_URL}${TRADES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const body = (await request.json()) as SaveTradePayload;
    const result = validate(guard.store.id, body);
    if ("error" in result) return errorResponse(400, result.error as string);
    const now = new Date().toISOString();
    const created: MockTrade = {
      id: crypto.randomUUID(),
      storeId: guard.store.id,
      type: body.type,
      ...result.fields,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_TRADES.push(created);
    return HttpResponse.json(toTrade(created), { status: 201 });
  }),

  http.patch(`${API_URL}${TRADES_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const trade = findTrade(guard.store.id, params.id);
    if (!trade) return errorResponse(404, "Movimiento no encontrado");
    const body = (await request.json()) as SaveTradePayload;
    if (body.type !== trade.type) return errorResponse(400, "No se puede cambiar el tipo de un movimiento");
    const result = validate(guard.store.id, body);
    if ("error" in result) return errorResponse(400, result.error as string);
    Object.assign(trade, result.fields, { updatedAt: new Date().toISOString() });
    return HttpResponse.json(toTrade(trade));
  }),

  http.delete(`${API_URL}${TRADES_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const trade = findTrade(guard.store.id, params.id);
    if (!trade) return errorResponse(404, "Movimiento no encontrado");
    MOCK_TRADES.splice(MOCK_TRADES.indexOf(trade), 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
