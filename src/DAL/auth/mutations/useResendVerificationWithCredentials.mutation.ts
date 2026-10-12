import { useMutation } from "@tanstack/react-query";
import { resendVerificationWithCredentialsService } from "../services/auth.service";

export const useResendVerificationWithCredentialsMutation = () =>
  useMutation({
    mutationFn: resendVerificationWithCredentialsService,
  });
