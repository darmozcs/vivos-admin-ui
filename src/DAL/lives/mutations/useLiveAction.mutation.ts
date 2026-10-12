import {
  LIVE_CURRENT_DETAIL,
  LIVE_DETAIL,
  LIVE_LIST,
  LIVE_SUMMARY_DETAIL,
} from "@/DAL/const";
import type { Live } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { liveActionService } from "../services/live.service";

export const useLiveActionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof liveActionService>[0]) =>
      (await liveActionService(variables)).data,
    onSuccess: async (live) => {
      // The action may target a live opened from the history: only replace the
      // cached current live when it is the same one.
      queryClient.setQueryData<Live>([LIVE_CURRENT_DETAIL], (current) =>
        current?.id === live.id ? live : current,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [LIVE_LIST] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_SUMMARY_DETAIL] }),
        queryClient.invalidateQueries({ queryKey: [LIVE_DETAIL] }),
      ]);
    },
  });
};
