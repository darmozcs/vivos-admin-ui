import { AdminLayoutContainer } from "@/modules/layouts/containers";
import { AuthGuardLoader } from "../../components";
import { useAuthGuard } from "../../hooks";

/** Shows the admin shell only for a validated session. */
export const AuthGuardContainer = () => {
  const { isVerifying, isAuthenticated } = useAuthGuard();

  if (isVerifying) return <AuthGuardLoader />;
  if (!isAuthenticated) return null;

  return <AdminLayoutContainer />;
};
