import { BALANCE_DETAIL, LIVE_CURRENT_DETAIL, LIVE_DETAIL, LIVE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLiveTagsService } from "../services/live.service";

/** Replaces the tags of a live; the history and the balance show them. */
export const useUpdateLiveTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateLiveTagsService>[0]) =>
      (await updateLiveTagsService(variables)).data,
    onSuccess: async () => {
      await Promise.all(
        [LIVE_LIST, LIVE_DETAIL, LIVE_CURRENT_DETAIL, BALANCE_DETAIL].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
    },
  });
};
