import { useMutation } from "@tanstack/react-query";
import { createTradeService } from "../services/trade.service";
import { useInvalidateTrades } from "./useInvalidateTrades";

export const useCreateTradeMutation = () => {
  const invalidateTrades = useInvalidateTrades();

  return useMutation({
    mutationFn: async (payload: Parameters<typeof createTradeService>[0]) =>
      (await createTradeService(payload)).data,
    onSuccess: invalidateTrades,
  });
};
