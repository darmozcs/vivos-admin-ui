import { STORE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendStoreAdminVerificationService } from "../services/store.service";

export const useResendStoreAdminVerificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resendStoreAdminVerificationService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST] });
    },
  });
};
