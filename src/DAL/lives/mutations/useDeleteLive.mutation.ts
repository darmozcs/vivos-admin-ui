import {
  BALANCE_DETAIL,
  LIVE_CURRENT_DETAIL,
  LIVE_DETAIL,
  LIVE_LIST,
  LIVE_SUMMARY_DETAIL,
} from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLiveService } from "../services/live.service";

export const useDeleteLiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLiveService,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [LIVE_LIST] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_SUMMARY_DETAIL] }),
        queryClient.invalidateQueries({ queryKey: [BALANCE_DETAIL] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_CURRENT_DETAIL] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_DETAIL] }),
      ]);
    },
  });
};
