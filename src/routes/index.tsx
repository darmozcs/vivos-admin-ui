import { getHomeRoute } from "@/modules/auth/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: getHomeRoute() });
  },
});
