import { config } from "@/config";
import { AUTH_REFRESH_PATH } from "@/DAL/const";
import type { AuthResponse } from "@/models";
import { useUserStore } from "@/store";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { i18n } from "../i18n";
import { queryClient } from "../query/queryClient";
import { resolveSessionRole } from "./tokenClaims";
import { tokenStorage } from "./tokenStorage";

export const LOGIN_ROUTE = "/login";

export const SESSION_REFRESH = {
  REFRESHED: "REFRESHED",
  /** The server refused the refresh token (or the account lost its role). */
  REJECTED: "REJECTED",
  /** No answer from the server: keep the session and try again later. */
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type SessionRefreshResult = (typeof SESSION_REFRESH)[keyof typeof SESSION_REFRESH];

/** Warns that the account has no role this admin can use. */
export const notifyNotAuthorized = () =>
  notifications.show({
    color: "red",
    title: i18n.t("common:notifications.errorTitle"),
    message: i18n.t("common:auth.notAuthorized"),
  });

/**
 * Stores the session of a darmoz-auth response. Only SUPER_ADMIN or ADMIN
 * accounts are accepted; any other role is rejected with a notification.
 */
export const applySession = (authResponse: AuthResponse): boolean => {
  if (!resolveSessionRole(authResponse.roles)) {
    notifyNotAuthorized();
    return false;
  }
  tokenStorage.setTokens(authResponse.accessToken, authResponse.refreshToken);
  useUserStore.getState().setUser({
    userId: authResponse.userId,
    email: authResponse.email,
    roles: authResponse.roles,
  });
  return true;
};

/** Drops the local session without leaving the current page. */
export const clearSession = () => {
  tokenStorage.clear();
  useUserStore.getState().clearUser();
  queryClient.clear();
};

/** Drops the local session and reloads the app on the login screen. */
export const endSession = () => {
  clearSession();
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.location.assign(`${base}${LOGIN_ROUTE}`);
};

const performRefresh = async (): Promise<SessionRefreshResult> => {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) return SESSION_REFRESH.REJECTED;
  try {
    // Plain axios: this call must never re-enter the httpClient interceptors.
    const { data } = await axios.post<AuthResponse>(
      `${config.VITE_API_BASE_URL}${AUTH_REFRESH_PATH}`,
      { refreshToken },
      { headers: { "Content-Type": "application/json", API_ID: config.VITE_API_ID } },
    );
    return applySession(data) ? SESSION_REFRESH.REFRESHED : SESSION_REFRESH.REJECTED;
  } catch (error) {
    return axios.isAxiosError(error) && !error.response
      ? SESSION_REFRESH.UNAVAILABLE
      : SESSION_REFRESH.REJECTED;
  }
};

let refreshInFlight: Promise<SessionRefreshResult> | null = null;

/**
 * Single entry point to refresh the tokens, shared by the periodic refresh and
 * the 401 retry. Concurrent callers share the same request: darmoz-auth rotates
 * refresh tokens and a reused one would revoke every session of the user.
 */
export const refreshSession = (): Promise<SessionRefreshResult> => {
  refreshInFlight ??= performRefresh().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
};
