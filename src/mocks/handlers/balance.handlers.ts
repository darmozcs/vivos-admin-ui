import { config } from "@/config";
import { BALANCE_PATH } from "@/DAL/const";
import type { Balance, BalanceEntry } from "@/models";
import { BALANCE_ENTRY_TYPE, LIVE_STATUS, TRADE_STATUS, TRADE_TYPE } from "@/types";
import { delay, http, HttpResponse } from "msw";
import { MOCK_LIVES } from "../data/lives";
import { MOCK_TRADES } from "../data/trades";
import { INVALID_DATE_RANGE, toLocalDay } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";
import { toSummary } from "./lives.handlers";

const API_URL = config.VITE_API_BASE_URL || "";

/** Like vivos-be: ended lives (total collected), sold sales and purchased purchases. */
const storeEntries = (storeId: string): BalanceEntry[] => [
  ...MOCK_TRADES.filter(
    (trade) =>
      trade.storeId === storeId &&
      ((trade.type === TRADE_TYPE.SALE && trade.status === TRADE_STATUS.SOLD) ||
        (trade.type === TRADE_TYPE.PURCHASE && trade.status === TRADE_STATUS.PURCHASED)),
  ).map((trade) => ({
    id: trade.id,
    type: trade.type === TRADE_TYPE.SALE ? BALANCE_ENTRY_TYPE.SALE : BALANCE_ENTRY_TYPE.PURCHASE,
    quantity: trade.quantity,
    amount: trade.price,
    createdAt: trade.createdAt,
  })),
  ...MOCK_LIVES.filter((live) => live.storeId === storeId && live.status === LIVE_STATUS.ENDED)
    .map(toSummary)
    .map((live) => ({
      id: live.id,
      type: BALANCE_ENTRY_TYPE.LIVE,
      quantity: live.units,
      amount: live.totalAmount,
      createdAt: live.createdAt,
    })),
];

const summarize = (entries: BalanceEntry[]): Balance["summary"] => {
  const purchases = entries.filter((entry) => entry.type === BALANCE_ENTRY_TYPE.PURCHASE);
  const sales = entries.filter((entry) => entry.type !== BALANCE_ENTRY_TYPE.PURCHASE);
  const sum = (items: BalanceEntry[], pick: (entry: BalanceEntry) => number) =>
    items.reduce((total, entry) => total + pick(entry), 0);
  const salesTotal = sum(sales, (entry) => entry.amount);
  const purchasesTotal = sum(purchases, (entry) => entry.amount);
  const soldQuantity = sum(sales, (entry) => entry.quantity);
  const boughtQuantity = sum(purchases, (entry) => entry.quantity);
  return {
    salesTotal,
    purchasesTotal,
    balance: salesTotal - purchasesTotal,
    soldQuantity,
    boughtQuantity,
    netQuantity: boughtQuantity - soldQuantity,
  };
};

export const balanceHandlers = [
  http.get(`${API_URL}${BALANCE_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const params = new URL(request.url).searchParams;
    const from = params.get("from") || undefined;
    const to = params.get("to") || undefined;
    const type = params.get("type") || undefined;
    if (from && to && from > to) return errorResponse(400, INVALID_DATE_RANGE);
    const entries = storeEntries(guard.store.id)
      .filter((entry) => {
        const day = toLocalDay(entry.createdAt);
        return (!from || day >= from) && (!to || day <= to) && (!type || entry.type === type);
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const balance: Balance = { entries, summary: summarize(entries) };
    return HttpResponse.json(balance);
  }),
];
