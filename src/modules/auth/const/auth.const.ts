import { USER_ROLE, type UserRole } from "@/types";

/** Landing page of each role after signing in. */
export const HOME_ROUTE_BY_ROLE = {
  [USER_ROLE.SUPER_ADMIN]: "/stores",
  [USER_ROLE.ADMIN]: "/live",
} as const satisfies Record<UserRole, string>;

export const LOGIN_CARD_WIDTH = 420;

export const LOGIN_STEP = {
  CREDENTIALS: "CREDENTIALS",
  VERIFY_EMAIL: "VERIFY_EMAIL",
} as const;

export type LoginStep = (typeof LOGIN_STEP)[keyof typeof LOGIN_STEP];

/** Error code darmoz-auth returns (403) when the account email is not verified yet. */
export const EMAIL_NOT_VERIFIED_ERROR = "EMAIL_NOT_VERIFIED";

export const VERIFICATION_CODE_LENGTH = 6;
export const RESEND_COOLDOWN_SECONDS = 60;

/** Code accepted by the mocks for any email verification. */
export const MOCK_VERIFICATION_CODE = "123456";

/** Accounts of the mocks, shown on the login screen only when mocks are on. */
export const MOCK_CREDENTIALS = [
  { labelKey: "login.demo.superAdmin", email: "super@vivos.test", password: "super1234" },
  { labelKey: "login.demo.storeAdmin", email: "tienda1@vivos.test", password: "admin1234" },
  { labelKey: "login.demo.storeAdmin", email: "tienda2@vivos.test", password: "admin1234" },
] as const;

export type MockCredential = (typeof MOCK_CREDENTIALS)[number];
