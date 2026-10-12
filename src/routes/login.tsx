import { getSessionRole } from "@/libs/http";
import { buildPageHead } from "@/libs/i18n/pageHead";
import { getHomeRoute } from "@/modules/auth/utils";
import { Login } from "@/pages/Login.page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  // A session with a usable role goes to its home; anything else signs in again.
  beforeLoad: () => {
    if (getSessionRole()) throw redirect({ to: getHomeRoute() });
  },
  head: () => buildPageHead("common:meta.login.title", "common:meta.login.description"),
  component: Login,
});
