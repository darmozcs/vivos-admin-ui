import { LIVE_SUMMARY_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { LivesSummary } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getLivesSummaryService, type GetLivesParams } from "../services/live.service";

export const useLivesSummaryQuery = (params: GetLivesParams = {}) => {
  return useApiQuery<LivesSummary>({
    queryKey: [LIVE_SUMMARY_DETAIL, params],
    queryFn: async () => (await getLivesSummaryService(params)).data,
    placeholderData: keepPreviousData,
  });
};
