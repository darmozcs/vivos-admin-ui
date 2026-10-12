import { LIVE_CURRENT_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Live } from "@/models";
import { getCurrentLiveService } from "../services/live.service";

interface UseCurrentLiveQueryOptions {
  enabled?: boolean;
}

export const useCurrentLiveQuery = ({ enabled = true }: UseCurrentLiveQueryOptions = {}) => {
  return useApiQuery<Live>({
    queryKey: [LIVE_CURRENT_DETAIL],
    queryFn: async () => (await getCurrentLiveService()).data,
    enabled,
  });
};
