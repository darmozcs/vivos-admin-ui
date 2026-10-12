import { LIVE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { LiveSummary } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getLivesService, type GetLivesParams } from "../services/live.service";

/** Lives of the store; without params it returns every live (unfiltered). */
export const useLivesQuery = (params: GetLivesParams = {}) => {
  return useApiQuery<LiveSummary[]>({
    queryKey: [LIVE_LIST, params],
    queryFn: async () => (await getLivesService(params)).data,
    placeholderData: keepPreviousData,
  });
};
