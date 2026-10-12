import { LIVE_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { LiveSummary } from "@/models";
import { getLiveService } from "../services/live.service";

export const useLiveQuery = (id: string | undefined) => {
  return useApiQuery<LiveSummary>({
    queryKey: [LIVE_DETAIL, id],
    queryFn: async () => (await getLiveService(id!)).data,
    enabled: !!id,
  });
};
