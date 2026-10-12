import {
  LIVE_CURRENT_DETAIL,
  LIVE_DETAIL,
  LIVE_LIST,
  LIVE_SUMMARY_DETAIL,
} from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLiveService } from "../services/live.service";

export const useCreateLiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Parameters<typeof createLiveService>[0]) =>
      (await createLiveService(payload)).data,
    onSuccess: async (live) => {
      queryClient.setQueryData([LIVE_CURRENT_DETAIL], live);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [LIVE_LIST] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_SUMMARY_DETAIL] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_DETAIL] }),
      ]);
    },
  });
};
