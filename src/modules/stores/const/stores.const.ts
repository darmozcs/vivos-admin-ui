export const STORE_NAME_MAX = 60;
export const ADMIN_PASSWORD_MIN = 8;
export const ADMIN_PASSWORD_MAX = 100;

/** Values interpolated in the form validation messages. */
export const STORE_FORM_LIMITS = {
  max: STORE_NAME_MAX,
  min: ADMIN_PASSWORD_MIN,
  passwordMax: ADMIN_PASSWORD_MAX,
} as const;

export const STORE_STATUS_BADGE = {
  ACTIVE: { labelKey: "status.active", color: "green.7" },
  INACTIVE: { labelKey: "status.inactive", color: "gray.5" },
} as const;

export const EMAIL_VERIFIED_BADGE = {
  VERIFIED: { labelKey: "emailStatus.verified", color: "plum.9" },
  PENDING: { labelKey: "emailStatus.pending", color: "blossom.3" },
} as const;

export const STORES_TABLE_MIN_HEIGHT = 200;

/** i18n section of each status change (stores namespace). */
export const STORE_STATUS_ACTION = {
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
} as const;
