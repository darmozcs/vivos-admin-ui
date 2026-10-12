import {
  LIVE_DETAIL,
  LIVE_LIST,
  LIVE_SUMMARY_DETAIL,
  LIVE_ORDER_LIST,
  ORDER_LIST,
  ORDER_SUMMARY_DETAIL,
} from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatusService } from "../services/order.service";

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateOrderStatusService>[0]) =>
      (await updateOrderStatusService(variables)).data,
    onSuccess: async () => {
      await Promise.all(
        // The live totals change when a sale is cancelled or reactivated.
        [
          ORDER_LIST,
          ORDER_SUMMARY_DETAIL,
          LIVE_ORDER_LIST,
          LIVE_DETAIL,
          LIVE_LIST,
          LIVE_SUMMARY_DETAIL,
        ].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
    },
  });
};
