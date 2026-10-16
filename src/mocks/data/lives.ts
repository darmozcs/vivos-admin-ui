import type { Live } from "@/models";
import { LIVE_STATUS } from "@/types";
import { MOCK_STORE_IDS } from "./accounts";

const { STORE_1, STORE_2 } = MOCK_STORE_IDS;

export type MockLive = Live & { storeId: string };

const ONE_HOUR_TEN_MS = 70 * 60 * 1000;

export const MOCK_PLATFORM = "Instagram Live";

/** The last live of each store is its current one. */
export const MOCK_LIVES: MockLive[] = [
  {
    id: "l0",
    number: 1,
    storeId: STORE_1,
    title: "Liquidación de verano",
    platform: MOCK_PLATFORM,
    status: LIVE_STATUS.ENDED,
    startedAt: "2026-08-30T21:30:00Z",
    endedAt: "2026-08-30T22:25:00Z",
    accumulatedMs: 55 * 60 * 1000,
    runningSince: null,
    createdAt: "2026-08-30T20:00:00Z",
    tagIds: ["t1"],
  },
  {
    id: "l1",
    number: 2,
    storeId: STORE_1,
    title: "Drop de invierno",
    platform: MOCK_PLATFORM,
    status: LIVE_STATUS.ENDED,
    startedAt: "2026-09-20T21:00:00Z",
    endedAt: "2026-09-20T22:10:00Z",
    accumulatedMs: ONE_HOUR_TEN_MS,
    runningSince: null,
    createdAt: "2026-09-20T20:00:00Z",
    tagIds: [],
  },
  {
    id: "l2",
    number: 3,
    storeId: STORE_1,
    title: "Drop de primavera",
    platform: MOCK_PLATFORM,
    status: LIVE_STATUS.NOT_STARTED,
    startedAt: null,
    endedAt: null,
    accumulatedMs: 0,
    runningSince: null,
    createdAt: "2026-10-01T20:00:00Z",
    tagIds: [],
  },
  {
    id: "l3",
    number: 1,
    storeId: STORE_2,
    title: "Primer vivo de Moda Sur",
    platform: MOCK_PLATFORM,
    status: LIVE_STATUS.ENDED,
    startedAt: "2026-09-25T21:00:00Z",
    endedAt: "2026-09-25T21:45:00Z",
    accumulatedMs: 45 * 60 * 1000,
    runningSince: null,
    createdAt: "2026-09-25T20:00:00Z",
    tagIds: [],
  },
];
