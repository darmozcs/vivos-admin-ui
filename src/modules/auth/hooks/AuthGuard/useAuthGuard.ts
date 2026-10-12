import { useVerifySessionQuery } from "@/DAL";
import {
  clearSession,
  endSession,
  LOGIN_ROUTE,
  notifyNotAuthorized,
  refreshSession,
  resolveSessionRole,
  SESSION_REFRESH,
} from "@/libs/http";
import { useUserStore } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useTokenRefresh } from "../TokenRefresh/useTokenRefresh";

/** Validates the stored session with darmoz-auth before showing the admin. */
export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, refetch } = useVerifySessionQuery();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  // An expired access token is reported as invalid: refresh it once before giving up.
  const refreshTried = useRef(false);
  const role = resolveSessionRole(data?.roles);
  const isValid = !!data?.valid;

  useEffect(() => {
    if (isError) {
      endSession();
      return;
    }
    if (data && !isValid) {
      if (refreshTried.current) {
        endSession();
        return;
      }
      refreshTried.current = true;
      void refreshSession().then((result) => {
        if (result === SESSION_REFRESH.REFRESHED) void refetch();
        else endSession();
      });
      return;
    }
    if (isValid && !role) {
      // Keep the app loaded so the notification stays visible on the login screen.
      notifyNotAuthorized();
      clearSession();
      void navigate({ to: LOGIN_ROUTE });
      return;
    }
    if (isValid && data) {
      setUser({ userId: data.userId, email: data.email, roles: data.roles ?? [] });
    }
  }, [data, isError, isValid, role, setUser, navigate, refetch]);

  const isAuthenticated = isValid && !!role && !!userId;
  useTokenRefresh({ enabled: isAuthenticated });

  return { isVerifying: isPending || (!!data && !isAuthenticated), isAuthenticated };
};
