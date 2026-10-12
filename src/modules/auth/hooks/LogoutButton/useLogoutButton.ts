import { useLogoutMutation } from "@/DAL";
import { endSession, tokenStorage } from "@/libs/http";

export const useLogoutButton = () => {
  const logout = useLogoutMutation();

  const onLogout = () => {
    const refreshToken = tokenStorage.getRefresh();
    if (!refreshToken) {
      endSession();
      return;
    }
    // The local session is dropped even if darmoz-auth could not revoke the token.
    logout.mutate({ refreshToken }, { onSettled: endSession });
  };

  return { onLogout, isLoading: logout.isPending };
};
