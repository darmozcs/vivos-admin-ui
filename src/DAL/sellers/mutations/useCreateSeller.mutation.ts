import { SELLER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSellerService } from "../services/seller.service";

export const useCreateSellerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: Parameters<typeof createSellerService>[0],
    ) => (await createSellerService(payload)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SELLER_LIST] });
    },
  });
};
