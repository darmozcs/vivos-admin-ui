import { TRADE_DETAIL_PATH, TRADES_PATH, TRADES_SUMMARY_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Trade, TradeSummary } from "@/models";
import type { TradeStatus, TradeType } from "@/types";
import type { AxiosResponse } from "axios";

/** Filters of GET /trades and GET /trades/summary, combined with AND. Empty values must not be sent. */
export interface GetTradesParams {
  /** Inclusive local day of createdAt, YYYY-MM-DD. */
  from?: string;
  /** Inclusive local day of createdAt, YYYY-MM-DD. */
  to?: string;
  /** The note contains this text. */
  search?: string;
  type?: TradeType;
  status?: TradeStatus;
  sellerId?: string;
  clientId?: string;
  /** Comma separated tag ids: the movement has any of them. */
  tagIds?: string;
}

/** A sale needs clientId and a purchase needs sellerId. PATCH replaces every field but the type. */
export interface SaveTradePayload {
  type: TradeType;
  status: TradeStatus;
  /** Required for sales and purchases; null for payments. */
  quantity: number | null;
  price: number;
  note: string;
  sellerId: string | null;
  clientId: string | null;
  tagIds: string[];
}

export const getTradesService = async (
  params: GetTradesParams = {},
): Promise<AxiosResponse<Trade[]>> => await httpClient.get<Trade[]>(TRADES_PATH, { params });

export const getTradesSummaryService = async (
  params: GetTradesParams = {},
): Promise<AxiosResponse<TradeSummary>> =>
  await httpClient.get<TradeSummary>(TRADES_SUMMARY_PATH, { params });

export const createTradeService = async (
  payload: SaveTradePayload,
): Promise<AxiosResponse<Trade>> => await httpClient.post<Trade>(TRADES_PATH, payload);

export const updateTradeService = async ({
  id,
  payload,
}: {
  id: string;
  payload: SaveTradePayload;
}): Promise<AxiosResponse<Trade>> => await httpClient.patch<Trade>(TRADE_DETAIL_PATH({ id }), payload);

export const deleteTradeService = async (id: string): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(TRADE_DETAIL_PATH({ id }));
