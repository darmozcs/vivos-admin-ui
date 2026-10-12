import { CLIENT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClientService } from "../services/client.service";

export const useDeleteClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClientService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CLIENT_LIST] });
    },
  });
};
