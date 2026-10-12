import { STORE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetStoreAdminPasswordService } from "../services/store.service";

export const useResetStoreAdminPasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetStoreAdminPasswordService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST] });
    },
  });
};
