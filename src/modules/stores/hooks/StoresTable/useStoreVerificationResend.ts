import { useResendStoreAdminVerificationMutation } from "@/DAL";
import type { Store } from "@/models";
import { useStoresNotifier } from "../useStoresNotifier";

/** Sends the verification code again to an admin whose email is still pending. */
export const useStoreVerificationResend = () => {
  const resend = useResendStoreAdminVerificationMutation();
  const { notifySuccess, notifyError } = useStoresNotifier();

  const resendVerification = ({ id, adminEmail }: Store) =>
    resend.mutate(id, {
      onSuccess: () => notifySuccess("resendVerification.success", { email: adminEmail }),
      onError: (error) => notifyError(error, "resendVerification.error"),
    });

  return {
    resendVerification,
    /** Store whose code is being sent, to show the loader on its row only. */
    resendingStoreId: resend.isPending ? resend.variables : undefined,
  };
};
