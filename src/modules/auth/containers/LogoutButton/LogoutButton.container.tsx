import { LogoutButton } from "../../components";
import { useLogoutButton } from "../../hooks";

export const LogoutButtonContainer = () => {
  const { onLogout, isLoading } = useLogoutButton();

  return <LogoutButton isLoading={isLoading} onLogout={onLogout} />;
};
