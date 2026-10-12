import { USER_ROLE } from "@/types";
import { HttpResponse } from "msw";
import { loadMockAccounts, type MockAccounts, type MockStore } from "../data/accounts";
import { errorResponse } from "./response";
import { decodeMockToken, toEpochSeconds } from "./token";

const BEARER_PREFIX = "Bearer ";

type MockErrorResponse = ReturnType<typeof errorResponse>;

export const getBearerToken = (request: Request) =>
  request.headers.get("Authorization")?.replace(BEARER_PREFIX, "") ?? "";

/** User and claims of an access token that is not expired nor revoked. */
export const findTokenSession = (accounts: MockAccounts, token: string) => {
  const claims = decodeMockToken(token);
  if (!claims || claims.exp < toEpochSeconds(Date.now())) return null;
  const user = accounts.users.find((u) => u.id === claims.sub);
  if (!user || claims.iat < user.tokensValidAfter) return null;
  return { user, claims };
};

/** darmoz-auth error body: { timestamp, status, error, message }. */
export const authErrorResponse = (status: number, error: string, message: string) =>
  HttpResponse.json(
    { timestamp: new Date().toISOString(), status, error, message },
    { status },
  );

const unauthorized = () => errorResponse(401, "Sesión inválida o vencida");

/**
 * vivos-be store scope: the store always comes from the token (`sub`), never
 * from the client. Inactive stores answer 403 even with a valid token.
 */
export const requireStore = (request: Request): { store: MockStore } | { error: MockErrorResponse } => {
  const accounts = loadMockAccounts();
  const session = findTokenSession(accounts, getBearerToken(request));
  if (!session) return { error: unauthorized() };
  if (!session.claims.roles.includes(USER_ROLE.ADMIN)) {
    return { error: errorResponse(403, "No tenés permisos para esta acción") };
  }
  const store = accounts.stores.find((s) => s.adminUserId === session.user.id);
  if (!store || !store.active) {
    return { error: errorResponse(403, "La tienda no existe o está desactivada") };
  }
  return { store };
};

/** vivos-be `/admin/**`: only SUPER_ADMIN tokens. */
export const requireSuperAdmin = (
  request: Request,
): { accounts: MockAccounts } | { error: MockErrorResponse } => {
  const accounts = loadMockAccounts();
  const session = findTokenSession(accounts, getBearerToken(request));
  if (!session) return { error: unauthorized() };
  if (!session.claims.roles.includes(USER_ROLE.SUPER_ADMIN)) {
    return { error: errorResponse(403, "No tenés permisos para esta acción") };
  }
  return { accounts };
};
