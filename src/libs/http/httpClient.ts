import { config } from "@/config";
import {
  AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH,
  AUTH_LOGIN_PATH,
  AUTH_REFRESH_PATH,
  AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH,
} from "@/DAL/const";
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { endSession, refreshSession, SESSION_REFRESH } from "./authSession";
import { HTTP_STATUS } from "./httpStatus";
import { tokenStorage } from "./tokenStorage";

/** Public darmoz-auth endpoints: no bearer token and no refresh on 401. */
const PUBLIC_AUTH_PATHS = [
  AUTH_LOGIN_PATH,
  AUTH_REFRESH_PATH,
  AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH,
  AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH,
];

const isPublicAuthPath = (url = "") => PUBLIC_AUTH_PATHS.some((path) => url.includes(path));

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retried?: boolean };

export const httpClient = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    API_ID: config.VITE_API_ID,
  },
});

httpClient.interceptors.request.use((request) => {
  const token = tokenStorage.getAccess();
  if (token && !isPublicAuthPath(request.url)) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetriableRequestConfig | undefined;
    // 403 is a business permission error (e.g. inactive store): it never ends the session.
    const canRefresh =
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !!request &&
      !request._retried &&
      !isPublicAuthPath(request.url);
    if (!canRefresh || !request) return Promise.reject(error);

    request._retried = true;
    const result = await refreshSession();
    if (result === SESSION_REFRESH.REFRESHED) return httpClient(request);
    if (result === SESSION_REFRESH.REJECTED) endSession();
    return Promise.reject(error);
  },
);
