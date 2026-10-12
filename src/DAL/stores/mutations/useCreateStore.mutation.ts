import { STORE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStoreService, type CreateStorePayload } from "../services/store.service";

export const useCreateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateStorePayload) =>
      (await createStoreService(payload)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST] });
    },
  });
};
