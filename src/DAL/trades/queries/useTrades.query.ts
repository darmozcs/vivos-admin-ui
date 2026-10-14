import { TRADE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Trade } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getTradesService, type GetTradesParams } from "../services/trade.service";

export const useTradesQuery = (params: GetTradesParams = {}) => {
  return useApiQuery<Trade[]>({
    queryKey: [TRADE_LIST, params],
    queryFn: async () => (await getTradesService(params)).data,
    placeholderData: keepPreviousData,
  });
};
