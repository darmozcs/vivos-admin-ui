import { CLIENT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientService } from "../services/client.service";

export const useCreateClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: Parameters<typeof createClientService>[0],
    ) => (await createClientService(payload)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CLIENT_LIST] });
    },
  });
};
