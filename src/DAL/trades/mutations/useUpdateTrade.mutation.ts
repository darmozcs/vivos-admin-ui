import { useMutation } from "@tanstack/react-query";
import { updateTradeService } from "../services/trade.service";
import { useInvalidateTrades } from "./useInvalidateTrades";

export const useUpdateTradeMutation = () => {
  const invalidateTrades = useInvalidateTrades();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateTradeService>[0]) =>
      (await updateTradeService(variables)).data,
    onSuccess: invalidateTrades,
  });
};
