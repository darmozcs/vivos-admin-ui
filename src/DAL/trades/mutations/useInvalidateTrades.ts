import { TRADE_LIST, TRADE_SUMMARY_DETAIL } from "@/DAL/const";
import { useQueryClient } from "@tanstack/react-query";

/** Any trade change affects both the list and the totals. */
export const useInvalidateTrades = () => {
  const queryClient = useQueryClient();

  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [TRADE_LIST] }),
      queryClient.invalidateQueries({ queryKey: [TRADE_SUMMARY_DETAIL] }),
    ]);
  };
};
