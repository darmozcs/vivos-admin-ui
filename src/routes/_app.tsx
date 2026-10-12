import { LOGIN_ROUTE, tokenStorage } from "@/libs/http";
import { AuthGuardContainer } from "@/modules/auth/containers";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  // Without a stored token there is nothing to validate: go straight to the login.
  beforeLoad: () => {
    if (!tokenStorage.getAccess()) throw redirect({ to: LOGIN_ROUTE });
  },
  component: AuthGuardContainer,
});
