import { STORE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreService } from "../services/store.service";

export const useUpdateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateStoreService>[0]) =>
      (await updateStoreService(variables)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST] });
    },
  });
};
