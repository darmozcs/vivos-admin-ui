const ACCESS_TOKEN_TTL_MS = 720_000;
const MS_PER_SECOND = 1000;

/** Claims of the darmoz-auth access token used by the mocks. */
export interface TokenPayload {
  jti: string;
  sub: string;
  email: string;
  roles: string[];
  applicationId: string;
  typ: "access";
  iss: string;
  iat: number;
  exp: number;
}

export const generateId = (): string => crypto.randomUUID();

const base64UrlEncode = (data: string): string =>
  btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const base64UrlDecode = (data: string): string => {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
};

export const createMockAccessToken = (payload: {
  userId: string;
  email: string;
  roles: string[];
  applicationId: string;
}): string => {
  const now = Date.now();
  const tokenPayload: TokenPayload = {
    jti: generateId(),
    sub: payload.userId,
    email: payload.email,
    roles: payload.roles,
    applicationId: payload.applicationId,
    typ: "access",
    iss: "darmoz-auth-mock",
    iat: Math.floor(now / MS_PER_SECOND),
    exp: Math.floor((now + ACCESS_TOKEN_TTL_MS) / MS_PER_SECOND),
  };

  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify(tokenPayload));
  const signature = base64UrlEncode("mock-signature");

  return `${header}.${body}.${signature}`;
};

export const createMockRefreshToken = (): string => generateId();

export const decodeMockToken = (token: string): TokenPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1])) as TokenPayload;
  } catch {
    return null;
  }
};

export const toEpochSeconds = (ms: number) => Math.floor(ms / MS_PER_SECOND);
