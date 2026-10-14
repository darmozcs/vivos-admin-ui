import { SELLER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSellerService } from "../services/seller.service";

export const useDeleteSellerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSellerService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SELLER_LIST] });
    },
  });
};
