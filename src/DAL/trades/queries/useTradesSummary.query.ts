import { TRADE_SUMMARY_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { TradeSummary } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getTradesSummaryService, type GetTradesParams } from "../services/trade.service";

export const useTradesSummaryQuery = (params: GetTradesParams = {}) => {
  return useApiQuery<TradeSummary>({
    queryKey: [TRADE_SUMMARY_DETAIL, params],
    queryFn: async () => (await getTradesSummaryService(params)).data,
    placeholderData: keepPreviousData,
  });
};
