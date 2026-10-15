import { BALANCE_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Balance } from "@/models";
import type { BalanceEntryType } from "@/types";
import type { AxiosResponse } from "axios";

/** Filters of GET /balance, combined with AND. Empty values must not be sent. */
export interface GetBalanceParams {
  /** Inclusive days (YYYY-MM-DD) of createdAt. */
  from?: string;
  to?: string;
  type?: BalanceEntryType;
}

export const getBalanceService = async (
  params: GetBalanceParams = {},
): Promise<AxiosResponse<Balance>> => await httpClient.get<Balance>(BALANCE_PATH, { params });
