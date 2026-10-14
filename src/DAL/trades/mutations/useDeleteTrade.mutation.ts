import { useMutation } from "@tanstack/react-query";
import { deleteTradeService } from "../services/trade.service";
import { useInvalidateTrades } from "./useInvalidateTrades";

export const useDeleteTradeMutation = () => {
  const invalidateTrades = useInvalidateTrades();

  return useMutation({
    mutationFn: deleteTradeService,
    onSuccess: invalidateTrades,
  });
};
