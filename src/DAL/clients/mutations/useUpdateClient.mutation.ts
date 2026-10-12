import { CLIENT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClientService } from "../services/client.service";

export const useUpdateClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateClientService>[0]) =>
      (await updateClientService(variables)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CLIENT_LIST] });
    },
  });
};
