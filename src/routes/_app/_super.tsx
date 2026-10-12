import { requireSessionRole } from "@/modules/auth/utils";
import { USER_ROLE } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

/** Super admin area: store management. */
export const Route = createFileRoute("/_app/_super")({
  beforeLoad: () => requireSessionRole(USER_ROLE.SUPER_ADMIN),
});
