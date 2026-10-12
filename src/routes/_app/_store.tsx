import { requireSessionRole } from "@/modules/auth/utils";
import { USER_ROLE } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

/** Store admin area: clients, lives, sales and settings of the admin's store. */
export const Route = createFileRoute("/_app/_store")({
  beforeLoad: () => requireSessionRole(USER_ROLE.ADMIN),
});
