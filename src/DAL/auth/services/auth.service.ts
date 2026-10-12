import {
  AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_PASSWORD_PATH,
  AUTH_REFRESH_PATH,
  AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH,
  AUTH_VERIFY_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { AuthResponse, VerifyResponse } from "@/models";
import type { AxiosResponse } from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ConfirmEmailWithCredentialsPayload extends LoginPayload {
  code: string;
}

export const loginService = async (
  payload: LoginPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_LOGIN_PATH, payload);

export const refreshService = async (
  payload: RefreshTokenPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_REFRESH_PATH, payload);

export const logoutService = async (
  payload: RefreshTokenPayload,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(AUTH_LOGOUT_PATH, payload);

export const verifyService = async (): Promise<AxiosResponse<VerifyResponse>> =>
  await httpClient.post<VerifyResponse>(AUTH_VERIFY_PATH);

export const changePasswordService = async (
  payload: ChangePasswordPayload,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(AUTH_PASSWORD_PATH, payload);

export const confirmEmailWithCredentialsService = async (
  payload: ConfirmEmailWithCredentialsPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH, payload);

export const resendVerificationWithCredentialsService = async (
  payload: LoginPayload,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH, payload);
