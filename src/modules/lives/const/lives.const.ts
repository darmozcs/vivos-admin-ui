import { LIVE_STATUS, type LiveStatus } from "@/types";

export const CLOCK_TICK_MS = 1000;
export const SAVED_JUST_NOW_SECONDS = 5;
export const SECONDS_PER_MINUTE = 60;
export const MS_PER_SECOND = 1000;
export const CLIENT_SEARCH_DEBOUNCE_MS = 250;
export const NO_CLIENT_SELECTED_KEY = "NO_CLIENT_SELECTED";
export const INITIAL_ITEM_QUANTITY = 1;

export const LIVE_ACTIVE_STATUSES: LiveStatus[] = [
  LIVE_STATUS.RUNNING,
  LIVE_STATUS.PAUSED,
];

export const ORDER_ITEM_FIELD = {
  CODE: "code",
  NAME: "name",
  COLOR: "color",
  PRICE: "price",
} as const;

export type OrderItemField = (typeof ORDER_ITEM_FIELD)[keyof typeof ORDER_ITEM_FIELD];
