import type { LiveAction } from "@/types";

/** darmoz-auth (identity provider). */
export const AUTH_PATH = "/auth";
export const AUTH_LOGIN_PATH = AUTH_PATH + "/login";
export const AUTH_REFRESH_PATH = AUTH_PATH + "/refresh";
export const AUTH_LOGOUT_PATH = AUTH_PATH + "/logout";
export const AUTH_VERIFY_PATH = AUTH_PATH + "/verify";
export const AUTH_PASSWORD_PATH = AUTH_PATH + "/password";
export const AUTH_VERIFY_EMAIL_PATH = AUTH_PATH + "/verify-email";
export const AUTH_CONFIRM_EMAIL_WITH_CREDENTIALS_PATH =
  AUTH_VERIFY_EMAIL_PATH + "/confirm-with-credentials";
export const AUTH_RESEND_VERIFICATION_WITH_CREDENTIALS_PATH =
  AUTH_VERIFY_EMAIL_PATH + "/resend-with-credentials";

/** vivos-be (business API). */
export const BASE_PATH = "/vivos-api";

export const SETTINGS_PATH = BASE_PATH + "/settings";

export const ADMIN_STORES_PATH = BASE_PATH + "/admin/stores";
export const ADMIN_STORE_DETAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_STORES_PATH}/${id}`;
export const ADMIN_STORE_PASSWORD_PATH = ({ id }: { id: string }) =>
  `${ADMIN_STORE_DETAIL_PATH({ id })}/admin-password`;
export const ADMIN_STORE_VERIFICATION_EMAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_STORE_DETAIL_PATH({ id })}/admin-verification-email`;

export const CLIENTS_PATH = BASE_PATH + "/clients";
export const CLIENT_DETAIL_PATH = ({ id }: { id: string }) => `${CLIENTS_PATH}/${id}`;

export const LIVES_PATH = BASE_PATH + "/lives";
export const LIVE_CURRENT_PATH = LIVES_PATH + "/current";
export const LIVES_SUMMARY_PATH = LIVES_PATH + "/summary";
export const LIVE_DETAIL_PATH = ({ id }: { id: string }) => `${LIVES_PATH}/${id}`;
export const LIVE_ACTION_PATH = ({
  id,
  action,
}: {
  id: string;
  action: LiveAction;
}) => `${LIVES_PATH}/${id}/${action}`;
export const LIVE_ORDERS_PATH = ({ liveId }: { liveId: string }) =>
  `${LIVES_PATH}/${liveId}/orders`;
export const LIVE_CLIENT_ORDER_PATH = ({
  liveId,
  clientId,
}: {
  liveId: string;
  clientId: string;
}) => `${LIVE_ORDERS_PATH({ liveId })}/${clientId}`;

export const ORDERS_PATH = BASE_PATH + "/orders";
export const ORDERS_SUMMARY_PATH = ORDERS_PATH + "/summary";
export const ORDER_DETAIL_PATH = ({ id }: { id: string }) => `${ORDERS_PATH}/${id}`;

export const SELLERS_PATH = BASE_PATH + "/sellers";
export const SELLER_DETAIL_PATH = ({ id }: { id: string }) => `${SELLERS_PATH}/${id}`;

export const TRADES_PATH = BASE_PATH + "/trades";
export const TRADES_SUMMARY_PATH = TRADES_PATH + "/summary";
export const TRADE_DETAIL_PATH = ({ id }: { id: string }) => `${TRADES_PATH}/${id}`;

export const BALANCE_PATH = BASE_PATH + "/balance";

export const TAGS_PATH = BASE_PATH + "/tags";
export const TAG_DETAIL_PATH = ({ id }: { id: string }) => `${TAGS_PATH}/${id}`;
export const LIVE_TAGS_PATH = ({ id }: { id: string }) => `${LIVES_PATH}/${id}/tags`;
