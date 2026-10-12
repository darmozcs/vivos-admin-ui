import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../services/auth.service";

/** Revokes the refresh token; the caller always drops the local session. */
export const useLogoutMutation = () =>
  useMutation({
    mutationFn: logoutService,
  });
