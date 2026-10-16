import { config } from "@/config";
import { LIVE_CURRENT_PATH, LIVES_PATH, LIVES_SUMMARY_PATH } from "@/DAL/const";
import type { CreateLivePayload } from "@/DAL/lives";
import type { Live, LiveSummary } from "@/models";
import { LIVE_ACTION, LIVE_STATUS, ORDER_STATUS, type LiveAction } from "@/types";
import { delay, http, HttpResponse } from "msw";
import { MOCK_LIVES, MOCK_PLATFORM, type MockLive } from "../data/lives";
import { MOCK_ORDERS } from "../data/orders";
import {
  containsText,
  inRange,
  INVALID_DATE_RANGE,
  rangeParam,
  textParam,
  toLocalDay,
  type NumberRangeParam,
} from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";
import { unknownTag } from "./tags.handlers";

const API_URL = config.VITE_API_BASE_URL || "";
const LIVE_TITLE_MAX = 120;
const MS_PER_MINUTE = 60_000;
/** Suffixes of the min/max params of GET /lives. */
const RANGE_PARAMS = ["DurationMinutes", "Buyers", "Units", "Total"] as const;
type RangeParamName = (typeof RANGE_PARAMS)[number];

const elapsedSince = (iso: string | null, now: number) =>
  iso ? now - new Date(iso).getTime() : 0;

const pad = (value: number) => String(value).padStart(2, "0");

/** dd/MM/yyyy HH:mm, same format as the backend. */
const formatDefaultTitle = (iso: string) => {
  const date = new Date(iso);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

type Transition =(live: Live, nowIso: string, now: number) => Partial<Live>;

/** Allowed status for each action and the changes it applies. */
const TRANSITIONS: Record<LiveAction, { from: Live["status"][]; apply: Transition }> = {
  [LIVE_ACTION.START]: {
    from: [LIVE_STATUS.NOT_STARTED],
    apply: (live, nowIso) => ({
      // Lives prepared without a name are named after their start date and time.
      title: live.title || formatDefaultTitle(nowIso),
      status: LIVE_STATUS.RUNNING,
      startedAt: nowIso,
      runningSince: nowIso,
      accumulatedMs: 0,
    }),
  },
  [LIVE_ACTION.PAUSE]: {
    from: [LIVE_STATUS.RUNNING],
    apply: (live, _nowIso, now) => ({
      status: LIVE_STATUS.PAUSED,
      accumulatedMs: live.accumulatedMs + elapsedSince(live.runningSince, now),
      runningSince: null,
    }),
  },
  [LIVE_ACTION.RESUME]: {
    from: [LIVE_STATUS.PAUSED],
    apply: (_live, nowIso) => ({ status: LIVE_STATUS.RUNNING, runningSince: nowIso }),
  },
  [LIVE_ACTION.END]: {
    from: [LIVE_STATUS.RUNNING, LIVE_STATUS.PAUSED],
    apply: (live, nowIso, now) => ({
      status: LIVE_STATUS.ENDED,
      accumulatedMs: live.accumulatedMs + elapsedSince(live.runningSince, now),
      runningSince: null,
      endedAt: nowIso,
    }),
  },
};

/** Live of the given store; lives of other stores are never visible. */
export const findLive = (storeId: string, id: string) =>
  MOCK_LIVES.find((live) => live.id === id && live.storeId === storeId);

const storeLives = (storeId: string) => MOCK_LIVES.filter((live) => live.storeId === storeId);

/** Adds the sales totals of the live, as the real backend would compute them. */
const toSummary = (live: Live): LiveSummary => {
  const orders = MOCK_ORDERS.filter(
    (order) =>
      order.liveId === live.id &&
      order.items.length > 0 &&
      order.status !== ORDER_STATUS.CANCELLED,
  );
  const items = orders.flatMap((order) => order.items);
  return {
    ...live,
    buyers: orders.length,
    units: items.reduce((units, item) => units + item.quantity, 0),
    totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
  };
};

/** Effective duration in whole minutes, including the running segment. */
const durationMinutes = (live: Live, now: number) =>
  Math.floor((live.accumulatedMs + Math.max(elapsedSince(live.runningSince, now), 0)) / MS_PER_MINUTE);

/**
 * Lives (newest first) matching the GET /lives filters (AND), like vivos-be.
 * Dates are inclusive local days of createdAt; every range is inclusive.
 */
const filterLives = (storeId: string, params: URLSearchParams) => {
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  if (from && to && from > to) return { error: errorResponse(400, INVALID_DATE_RANGE) };
  const ranges = {} as Record<RangeParamName, NumberRangeParam>;
  for (const name of RANGE_PARAMS) {
    const result = rangeParam(params, name);
    if ("error" in result) return { error: errorResponse(400, result.error) };
    ranges[name] = result.range;
  }
  const title = textParam(params, "title");
  const now = Date.now();
  const lives = storeLives(storeId)
    .reverse()
    .map(toSummary)
    .filter((live) => {
      const day = toLocalDay(live.createdAt);
      return (
        (!from || day >= from) &&
        (!to || day <= to) &&
        containsText(live.title, title) &&
        inRange(durationMinutes(live, now), ranges.DurationMinutes) &&
        inRange(live.buyers, ranges.Buyers) &&
        inRange(live.units, ranges.Units) &&
        inRange(live.totalAmount, ranges.Total)
      );
    });
  return { lives };
};

export const liveHandlers = [
  http.get(`${API_URL}${LIVES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const result = filterLives(guard.store.id, new URL(request.url).searchParams);
    if ("error" in result) return result.error;
    return HttpResponse.json(result.lives);
  }),

  http.get(`${API_URL}${LIVES_SUMMARY_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const result = filterLives(guard.store.id, new URL(request.url).searchParams);
    if ("error" in result) return result.error;
    // buyers is the sum per live (not distinct clients), like vivos-be.
    return HttpResponse.json({
      lives: result.lives.length,
      buyers: result.lives.reduce((buyers, live) => buyers + live.buyers, 0),
      units: result.lives.reduce((units, live) => units + live.units, 0),
      totalAmount: result.lives.reduce((total, live) => total + live.totalAmount, 0),
    });
  }),

  http.get(`${API_URL}${LIVE_CURRENT_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const current = storeLives(guard.store.id).at(-1);
    if (!current) return errorResponse(404, "Todavia no hay vivos");
    return HttpResponse.json(current);
  }),

  // Declared after /current and /summary so those paths are not taken as an id.
  http.get(`${API_URL}${LIVES_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const live = findLive(guard.store.id, String(params.id));
    if (!live) return errorResponse(404, "Vivo no encontrado");
    return HttpResponse.json(toSummary(live));
  }),

  http.put(`${API_URL}${LIVES_PATH}/:id/tags`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const live = findLive(guard.store.id, String(params.id));
    if (!live) return errorResponse(404, "Vivo no encontrado");
    const { tagIds } = (await request.json()) as { tagIds?: string[] };
    if (unknownTag(guard.store.id, tagIds)) return errorResponse(400, "Alguna etiqueta no existe");
    live.tagIds = [...new Set(tagIds ?? [])];
    return HttpResponse.json(toSummary(live));
  }),

  http.post(`${API_URL}${LIVES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const body = (await request.json()) as CreateLivePayload;
    const title = body.title?.trim() ?? "";
    if (title.length > LIVE_TITLE_MAX) {
      return errorResponse(400, "El titulo no puede superar 120 caracteres");
    }
    if (unknownTag(guard.store.id, body.tagIds)) return errorResponse(400, "Alguna etiqueta no existe");
    const created: MockLive = {
      id: crypto.randomUUID(),
      // Lives are numbered per store.
      number:
        MOCK_LIVES.filter((live) => live.storeId === guard.store.id)
          .reduce((max, live) => Math.max(max, live.number), 0) + 1,
      storeId: guard.store.id,
      title,
      platform: MOCK_PLATFORM,
      status: LIVE_STATUS.NOT_STARTED,
      startedAt: null,
      endedAt: null,
      accumulatedMs: 0,
      runningSince: null,
      createdAt: new Date().toISOString(),
      tagIds: [...new Set(body.tagIds ?? [])],
    };
    MOCK_LIVES.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.post(`${API_URL}${LIVES_PATH}/:id/:action`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const live = findLive(guard.store.id, String(params.id));
    const transition = TRANSITIONS[params.action as LiveAction];
    if (!live || !transition) return errorResponse(404, "Vivo no encontrado");
    if (!transition.from.includes(live.status)) {
      return errorResponse(409, "La acción no está permitida en este estado");
    }
    const now = Date.now();
    Object.assign(live, transition.apply(live, new Date(now).toISOString(), now));
    return HttpResponse.json(live);
  }),

  http.delete(`${API_URL}${LIVES_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const live = findLive(guard.store.id, String(params.id));
    if (!live) return errorResponse(404, "Vivo no encontrado");
    // Lives with sales are kept so the sales history stays consistent.
    const hasSales = MOCK_ORDERS.some(
      (order) => order.liveId === live.id && order.items.length > 0,
    );
    if (hasSales) {
      return errorResponse(409, "No se puede eliminar un vivo con ventas");
    }
    // Empty orders of the live go with it.
    for (let i = MOCK_ORDERS.length - 1; i >= 0; i--) {
      if (MOCK_ORDERS[i].liveId === live.id) MOCK_ORDERS.splice(i, 1);
    }
    MOCK_LIVES.splice(MOCK_LIVES.indexOf(live), 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
