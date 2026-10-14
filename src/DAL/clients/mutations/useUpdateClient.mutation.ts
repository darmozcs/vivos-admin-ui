import { CLIENT_LIST, TRADE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClientService } from "../services/client.service";

export const useUpdateClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateClientService>[0]) =>
      (await updateClientService(variables)).data,
    onSuccess: async () => {
      // Trades show the counterpart name, so they must be refreshed too.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [CLIENT_LIST] }),
        queryClient.invalidateQueries({ queryKey: [TRADE_LIST] }),
      ]);
    },
  });
};
