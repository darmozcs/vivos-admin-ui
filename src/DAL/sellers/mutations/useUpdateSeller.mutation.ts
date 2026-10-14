import { TRADE_LIST, SELLER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSellerService } from "../services/seller.service";

export const useUpdateSellerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateSellerService>[0]) =>
      (await updateSellerService(variables)).data,
    onSuccess: async () => {
      // Trades show the counterpart name, so they must be refreshed too.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [SELLER_LIST] }),
        queryClient.invalidateQueries({ queryKey: [TRADE_LIST] }),
      ]);
    },
  });
};
