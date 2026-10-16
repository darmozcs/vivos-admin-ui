import { config } from "@/config";
import { BALANCE_PATH } from "@/DAL/const";
import type { Balance, BalanceEntry } from "@/models";
import { BALANCE_ENTRY_TYPE, LIVE_STATUS, ORDER_STATUS, TRADE_STATUS, TRADE_TYPE } from "@/types";
import { delay, http, HttpResponse } from "msw";
import { MOCK_LIVES } from "../data/lives";
import { MOCK_ORDERS } from "../data/orders";
import { MOCK_TRADES } from "../data/trades";
import { INVALID_DATE_RANGE, toLocalDay } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";

const API_URL = config.VITE_API_BASE_URL || "";

/** Status that makes a trade count in the balance, per type (like vivos-be). */
const COUNTED_STATUS = {
  [TRADE_TYPE.SALE]: TRADE_STATUS.SOLD,
  [TRADE_TYPE.PURCHASE]: TRADE_STATUS.PURCHASED,
  [TRADE_TYPE.PAYMENT]: TRADE_STATUS.PAID,
} as const;

/**
 * Like vivos-be: ended lives (total collected: paid sales only), sold sales, purchased
 * purchases and paid payments (with no garments).
 */
const storeEntries = (storeId: string): BalanceEntry[] => [
  ...MOCK_TRADES.filter(
    (trade) => trade.storeId === storeId && trade.status === COUNTED_STATUS[trade.type],
  ).map((trade) => ({
    id: trade.id,
    type: trade.type,
    quantity: trade.quantity ?? 0,
    amount: trade.price,
    createdAt: trade.createdAt,
    tagIds: trade.tagIds,
  })),
  ...MOCK_LIVES.filter((live) => live.storeId === storeId && live.status === LIVE_STATUS.ENDED).map(
    (live) => {
      // Total collected: only the paid sales of the live (money and garments).
      const items = MOCK_ORDERS.filter(
        (order) => order.liveId === live.id && order.status === ORDER_STATUS.PAID,
      ).flatMap((order) => order.items);
      return {
        id: live.id,
        type: BALANCE_ENTRY_TYPE.LIVE,
        quantity: items.reduce((units, item) => units + item.quantity, 0),
        amount: items.reduce((total, item) => total + item.price * item.quantity, 0),
        createdAt: live.createdAt,
        tagIds: live.tagIds,
      };
    },
  ),
];

const summarize = (entries: BalanceEntry[]): Balance["summary"] => {
  const subtracts = (entry: BalanceEntry) =>
    entry.type === BALANCE_ENTRY_TYPE.PURCHASE || entry.type === BALANCE_ENTRY_TYPE.PAYMENT;
  const purchases = entries.filter(subtracts);
  const sales = entries.filter((entry) => !subtracts(entry));
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
    const tagIds = params.get("tagIds")?.split(",").filter(Boolean) ?? [];
    if (from && to && from > to) return errorResponse(400, INVALID_DATE_RANGE);
    const entries = storeEntries(guard.store.id)
      .filter((entry) => {
        const day = toLocalDay(entry.createdAt);
        const tagged = tagIds.length === 0 || entry.tagIds.some((id) => tagIds.includes(id));
        return (!from || day >= from) && (!to || day <= to) && (!type || entry.type === type) && tagged;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const balance: Balance = { entries, summary: summarize(entries) };
    return HttpResponse.json(balance);
  }),
];
