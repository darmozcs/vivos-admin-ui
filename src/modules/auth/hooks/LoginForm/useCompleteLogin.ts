import { applySession, resolveSessionRole } from "@/libs/http";
import type { AuthResponse } from "@/models";
import { useNavigate } from "@tanstack/react-router";
import { HOME_ROUTE_BY_ROLE } from "../../const/auth.const";

/** Stores a darmoz-auth session and opens the home of its role. */
export const useCompleteLogin = () => {
  const navigate = useNavigate();

  return (response: AuthResponse) => {
    if (!applySession(response)) return;
    const role = resolveSessionRole(response.roles);
    if (role) void navigate({ to: HOME_ROUTE_BY_ROLE[role] });
  };
};
