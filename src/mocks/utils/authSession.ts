import type { AuthResponse } from "@/models";
import {
  MOCK_APPLICATION_ID,
  MOCK_VERIFICATION_CODE,
  type MockAccounts,
  type MockUser,
} from "../data/accounts";
import { createMockAccessToken, createMockRefreshToken } from "./token";

const ACCESS_TOKEN_TTL_SECONDS = 720;
const RESEND_THROTTLE_MS = 60_000;

/** Issues a darmoz-auth session (access JWT + rotating refresh token). */
export const issueSession = (accounts: MockAccounts, user: MockUser): AuthResponse => {
  const refreshToken = createMockRefreshToken();
  accounts.refreshTokens[refreshToken] = user.id;
  return {
    userId: user.id,
    email: user.email,
    roles: user.roles,
    permissions: [],
    accessToken: createMockAccessToken({
      userId: user.id,
      email: user.email,
      roles: user.roles,
      applicationId: MOCK_APPLICATION_ID,
    }),
    refreshToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_TTL_SECONDS,
    emailVerified: user.emailVerified,
    unverifiedLoginLimit: 0,
    unverifiedLoginCount: 0,
  };
};

/**
 * "Sends" the verification code (logged to the console). Returns false when a
 * code was sent less than 60 s ago, like the darmoz-auth throttle.
 */
export const sendVerificationCode = (user: MockUser): boolean => {
  const now = Date.now();
  if (now - user.lastCodeSentAt < RESEND_THROTTLE_MS) return false;
  user.lastCodeSentAt = now;
  console.info(`[MSW] Verification code for ${user.email}: ${MOCK_VERIFICATION_CODE}`);
  return true;
};
