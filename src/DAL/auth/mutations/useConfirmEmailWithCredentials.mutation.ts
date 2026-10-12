import { useMutation } from "@tanstack/react-query";
import {
  confirmEmailWithCredentialsService,
  type ConfirmEmailWithCredentialsPayload,
} from "../services/auth.service";

/** Confirms the email code; on success darmoz-auth returns a full session. */
export const useConfirmEmailWithCredentialsMutation = () =>
  useMutation({
    mutationFn: async (payload: ConfirmEmailWithCredentialsPayload) =>
      (await confirmEmailWithCredentialsService(payload)).data,
  });
