import { USER_ROLE } from "@/types";

// Mock-only persistence: accounts and stores are kept in localStorage so a
// created store, a changed password or a verified email survive a page reload.
// (Clients, lives and orders stay in memory, as before.)
const STORAGE_KEY = "tienda-admin:mock-accounts-v1";

/** "Vivos" application id in darmoz-auth. */
export const MOCK_APPLICATION_ID = "22222222-2222-2222-2222-222222222222";
/** Every verification code is accepted only if it is this one. */
export const MOCK_VERIFICATION_CODE = "123456";
const APP_ADMIN_ROLE = "APP_ADMIN";

export const MOCK_STORE_IDS = { STORE_1: "s1", STORE_2: "s2" } as const;

export interface MockUser {
  id: string;
  email: string;
  password: string;
  roles: string[];
  enabled: boolean;
  emailVerified: boolean;
  /** Access tokens issued before this moment (epoch seconds) are rejected. */
  tokensValidAfter: number;
  /** Last verification code sent (ms), for the 60 s resend throttle. */
  lastCodeSentAt: number;
}

export interface MockStore {
  id: string;
  name: string;
  active: boolean;
  adminUserId: string;
  createdAt: string;
}

export interface MockAccounts {
  users: MockUser[];
  stores: MockStore[];
  /** Refresh token → user id. */
  refreshTokens: Record<string, string>;
}

const user = (id: string, email: string, password: string, roles: string[]): MockUser => ({
  id,
  email,
  password,
  roles,
  enabled: true,
  emailVerified: true,
  tokensValidAfter: 0,
  lastCodeSentAt: 0,
});

const DEFAULT_ACCOUNTS: MockAccounts = {
  users: [
    user("u-super", "super@vivos.test", "super1234", [USER_ROLE.SUPER_ADMIN, APP_ADMIN_ROLE]),
    user("u-store-1", "tienda1@vivos.test", "admin1234", [USER_ROLE.ADMIN]),
    user("u-store-2", "tienda2@vivos.test", "admin1234", [USER_ROLE.ADMIN]),
  ],
  stores: [
    {
      id: MOCK_STORE_IDS.STORE_1,
      name: "Boutique Lucía",
      active: true,
      adminUserId: "u-store-1",
      createdAt: "2026-08-01T12:00:00Z",
    },
    {
      id: MOCK_STORE_IDS.STORE_2,
      name: "Moda Sur",
      active: true,
      adminUserId: "u-store-2",
      createdAt: "2026-09-10T12:00:00Z",
    },
  ],
  refreshTokens: {},
};

export const loadMockAccounts = (): MockAccounts => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as MockAccounts) : structuredClone(DEFAULT_ACCOUNTS);
  } catch {
    return structuredClone(DEFAULT_ACCOUNTS);
  }
};

export const saveMockAccounts = (accounts: MockAccounts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // Without storage the accounts only live until the next reload.
  }
};

/** Loads the accounts, applies a change and saves them back. */
export const updateMockAccounts = <T>(change: (accounts: MockAccounts) => T): T => {
  const accounts = loadMockAccounts();
  const result = change(accounts);
  saveMockAccounts(accounts);
  return result;
};

export const findUserByEmail = (accounts: MockAccounts, email?: string) =>
  accounts.users.find((u) => u.email.toLowerCase() === email?.trim().toLowerCase());

const EMAIL_SEPARATOR = "@";

/**
 * Like darmoz-auth /login: the full email, or only the part before the "@".
 * Several users may share that part; the caller picks the one whose password matches.
 */
export const findUsersByLogin = (accounts: MockAccounts, login?: string) => {
  const value = login?.trim().toLowerCase() ?? "";
  if (value.includes(EMAIL_SEPARATOR)) return accounts.users.filter((u) => u.email.toLowerCase() === value);
  return accounts.users.filter((u) => u.email.toLowerCase().startsWith(value + EMAIL_SEPARATOR));
};

/** Drops every refresh token of a user (password change, deactivation...). */
export const revokeUserSessions = (accounts: MockAccounts, userId: string) => {
  for (const [token, owner] of Object.entries(accounts.refreshTokens)) {
    if (owner === userId) delete accounts.refreshTokens[token];
  }
};
