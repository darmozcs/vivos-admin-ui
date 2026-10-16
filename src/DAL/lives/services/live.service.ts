import {
  LIVE_ACTION_PATH,
  LIVE_CURRENT_PATH,
  LIVE_DETAIL_PATH,
  LIVE_TAGS_PATH,
  LIVES_PATH,
  LIVES_SUMMARY_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Live, LivesSummary, LiveSummary } from "@/models";
import type { LiveAction } from "@/types";
import type { AxiosResponse } from "axios";

export interface CreateLivePayload {
  /** Optional: when empty, the live is named after its start date and time. */
  title?: string;
  tagIds?: string[];
}

/**
 * Filters of GET /lives and /lives/summary, combined with AND. Ranges are
 * inclusive. Empty values must not be sent.
 */
export interface GetLivesParams {
  /** Inclusive local day of createdAt, YYYY-MM-DD. */
  from?: string;
  /** Inclusive local day of createdAt, YYYY-MM-DD. */
  to?: string;
  title?: string;
  /** Effective duration in whole minutes. */
  minDurationMinutes?: number;
  maxDurationMinutes?: number;
  minBuyers?: number;
  maxBuyers?: number;
  minUnits?: number;
  maxUnits?: number;
  minTotal?: number;
  maxTotal?: number;
}

export const getLivesService = async (
  params: GetLivesParams = {},
): Promise<AxiosResponse<LiveSummary[]>> =>
  await httpClient.get<LiveSummary[]>(LIVES_PATH, { params });

export const getLivesSummaryService = async (
  params: GetLivesParams = {},
): Promise<AxiosResponse<LivesSummary>> =>
  await httpClient.get<LivesSummary>(LIVES_SUMMARY_PATH, { params });

export const getLiveService = async (
  id: string,
): Promise<AxiosResponse<LiveSummary>> =>
  await httpClient.get<LiveSummary>(LIVE_DETAIL_PATH({ id }));

export const getCurrentLiveService = async (): Promise<AxiosResponse<Live>> =>
  await httpClient.get<Live>(LIVE_CURRENT_PATH);

export const createLiveService = async (
  payload: CreateLivePayload,
): Promise<AxiosResponse<Live>> =>
  await httpClient.post<Live>(LIVES_PATH, payload);

export const liveActionService = async ({
  id,
  action,
}: {
  id: string;
  action: LiveAction;
}): Promise<AxiosResponse<Live>> =>
  await httpClient.post<Live>(LIVE_ACTION_PATH({ id, action }));

export const deleteLiveService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(LIVE_DETAIL_PATH({ id }));

/** Replaces the tags of the live. */
export const updateLiveTagsService = async ({
  id,
  tagIds,
}: {
  id: string;
  tagIds: string[];
}): Promise<AxiosResponse<LiveSummary>> =>
  await httpClient.put<LiveSummary>(LIVE_TAGS_PATH({ id }), { tagIds });
