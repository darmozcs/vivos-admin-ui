import { config } from "@/config";
import {
  AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_PASSWORD_PATH,
  AUTH_REFRESH_PATH,
  AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH,
  AUTH_VERIFY_PATH,
} from "@/DAL/const";
import type {
  ChangePasswordPayload,
  ConfirmEmailWithCredentialsPayload,
  LoginPayload,
  RefreshTokenPayload,
} from "@/DAL/auth";
import type { VerifyResponse } from "@/models";
import { delay, http, HttpResponse } from "msw";
import {
  findUserByEmail,
  findUsersByLogin,
  loadMockAccounts,
  MOCK_VERIFICATION_CODE,
  revokeUserSessions,
  updateMockAccounts,
  type MockAccounts,
} from "../data/accounts";
import { issueSession, sendVerificationCode } from "../utils/authSession";
import { MOCK_DELAY_MS } from "../utils/response";
import { authErrorResponse, findTokenSession, getBearerToken } from "../utils/session";
import { toEpochSeconds } from "../utils/token";

const API_URL = config.VITE_API_BASE_URL || "";
const MIN_PASSWORD_LENGTH = 8;
const noContent = () => new HttpResponse(null, { status: 204 });
const invalidCredentials = () => authErrorResponse(401, "Unauthorized", "Credenciales inválidas");

/** Credential check of the *-with-credentials endpoints (full email only, unlike /login). */
const checkCredentials = (accounts: MockAccounts, body: LoginPayload) => {
  const user = findUserByEmail(accounts, body.email);
  return user && user.password === body.password && user.enabled ? user : null;
};

const INVALID_VERIFY: VerifyResponse = {
  valid: false,
  userId: null,
  email: null,
  roles: null,
  permissions: null,
  expiresAt: null,
  reason: "invalid",
};

export const authHandlers = [
  http.post(`${API_URL}${AUTH_LOGIN_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const body = (await request.json()) as LoginPayload;
    return updateMockAccounts((accounts) => {
      const user = findUsersByLogin(accounts, body.email).find(
        (candidate) => candidate.enabled && candidate.password === body.password,
      );
      if (!user) return invalidCredentials();
      if (!user.emailVerified) {
        return authErrorResponse(403, "EMAIL_NOT_VERIFIED", "El email no está verificado");
      }
      return HttpResponse.json(issueSession(accounts, user));
    });
  }),

  http.post(`${API_URL}${AUTH_REFRESH_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const { refreshToken } = (await request.json()) as RefreshTokenPayload;
    return updateMockAccounts((accounts) => {
      const user = accounts.users.find((u) => u.id === accounts.refreshTokens[refreshToken]);
      // Refresh tokens rotate: the used one is always consumed.
      delete accounts.refreshTokens[refreshToken];
      if (!user || !user.enabled) {
        return authErrorResponse(401, "Unauthorized", "Refresh token inválido");
      }
      return HttpResponse.json(issueSession(accounts, user));
    });
  }),

  http.post(`${API_URL}${AUTH_LOGOUT_PATH}`, async ({ request }) => {
    const { refreshToken } = (await request.json()) as RefreshTokenPayload;
    updateMockAccounts((accounts) => delete accounts.refreshTokens[refreshToken]);
    return noContent();
  }),

  http.post(`${API_URL}${AUTH_VERIFY_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const session = findTokenSession(loadMockAccounts(), getBearerToken(request));
    if (!session) return HttpResponse.json(INVALID_VERIFY);
    const { user, claims } = session;
    if (!user.enabled) return HttpResponse.json({ ...INVALID_VERIFY, reason: "disabled" });
    return HttpResponse.json<VerifyResponse>({
      valid: true,
      userId: user.id,
      email: user.email,
      roles: claims.roles,
      permissions: [],
      expiresAt: new Date(claims.exp * 1000).toISOString(),
      reason: null,
    });
  }),

  http.post(`${API_URL}${AUTH_PASSWORD_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const body = (await request.json()) as ChangePasswordPayload;
    return updateMockAccounts((accounts) => {
      const session = findTokenSession(accounts, getBearerToken(request));
      if (!session) return authErrorResponse(401, "Unauthorized", "Sesión inválida");
      const { user } = session;
      if (body.currentPassword !== user.password) {
        return authErrorResponse(400, "Bad Request", "La contraseña actual no es correcta");
      }
      if ((body.newPassword ?? "").length < MIN_PASSWORD_LENGTH) {
        return authErrorResponse(400, "Bad Request", "La nueva contraseña es muy corta");
      }
      user.password = body.newPassword;
      // darmoz-auth revokes every session of the user after the change.
      user.tokensValidAfter = toEpochSeconds(Date.now());
      revokeUserSessions(accounts, user.id);
      return noContent();
    });
  }),

  http.post(`${API_URL}${AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const body = (await request.json()) as ConfirmEmailWithCredentialsPayload;
    return updateMockAccounts((accounts) => {
      const user = checkCredentials(accounts, body);
      if (!user) return invalidCredentials();
      if (user.emailVerified) return authErrorResponse(409, "Conflict", "El email ya está verificado");
      if (body.code !== MOCK_VERIFICATION_CODE) {
        return authErrorResponse(400, "Bad Request", "Código inválido o vencido");
      }
      user.emailVerified = true;
      return HttpResponse.json(issueSession(accounts, user));
    });
  }),

  http.post(`${API_URL}${AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const body = (await request.json()) as LoginPayload;
    return updateMockAccounts((accounts) => {
      const user = checkCredentials(accounts, body);
      if (!user) return invalidCredentials();
      if (user.emailVerified) return authErrorResponse(409, "Conflict", "El email ya está verificado");
      return sendVerificationCode(user)
        ? noContent()
        : authErrorResponse(429, "Too Many Requests", "Esperá un minuto para pedir otro código");
    });
  }),
];
