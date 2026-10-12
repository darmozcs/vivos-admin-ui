import { USER_ROLE, type UserRole } from "@/types";
import { tokenStorage } from "./tokenStorage";

export interface AccessTokenClaims {
  sub?: string;
  email?: string;
  roles?: string[];
  applicationId?: string;
  exp?: number;
}

const BASE64_BLOCK = 4;

const decodeBase64Url = (segment: string) => {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (BASE64_BLOCK - (base64.length % BASE64_BLOCK)) % BASE64_BLOCK;
  const bytes = Uint8Array.from(atob(base64 + "=".repeat(padding)), (char) =>
    char.charCodeAt(0),
  );
  return new TextDecoder().decode(bytes);
};

/**
 * Reads the claims of an access token WITHOUT verifying its signature.
 * Only for routing decisions: the backends are the ones that enforce access.
 */
export const decodeAccessToken = (token: string | null): AccessTokenClaims | null => {
  const payload = token?.split(".")[1];
  if (!payload) return null;
  try {
    return JSON.parse(decodeBase64Url(payload)) as AccessTokenClaims;
  } catch {
    return null;
  }
};

/** Role used by this admin; the super admin wins when a user has both. */
export const resolveSessionRole = (
  roles: readonly string[] | null | undefined,
): UserRole | null => {
  if (roles?.includes(USER_ROLE.SUPER_ADMIN)) return USER_ROLE.SUPER_ADMIN;
  if (roles?.includes(USER_ROLE.ADMIN)) return USER_ROLE.ADMIN;
  return null;
};

/** Role of the stored session, or null without a usable access token. */
export const getSessionRole = (): UserRole | null =>
  resolveSessionRole(decodeAccessToken(tokenStorage.getAccess())?.roles);
