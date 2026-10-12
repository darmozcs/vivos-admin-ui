import { getSessionRole, LOGIN_ROUTE } from "@/libs/http";
import type { UserRole } from "@/types";
import { redirect } from "@tanstack/react-router";
import { HOME_ROUTE_BY_ROLE } from "../const/auth.const";

/** Home of the stored session (by the role in its access token), or the login. */
export const getHomeRoute = () => {
  const role = getSessionRole();
  return role ? HOME_ROUTE_BY_ROLE[role] : LOGIN_ROUTE;
};

/**
 * `beforeLoad` guard of a role layout: any other session is sent to its own home.
 * The role is read from the token only to route; the backends enforce access.
 */
export const requireSessionRole = (role: UserRole) => {
  if (getSessionRole() !== role) throw redirect({ to: getHomeRoute() });
};
