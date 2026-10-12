import { useMutation } from "@tanstack/react-query";
import { loginService, type LoginPayload } from "../services/auth.service";

/** Returns the darmoz-auth session; the caller decides whether to apply it. */
export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => (await loginService(payload)).data,
  });
