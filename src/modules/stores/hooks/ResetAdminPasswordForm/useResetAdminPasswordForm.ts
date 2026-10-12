import { useResetStoreAdminPasswordMutation } from "@/DAL";
import type { Store } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  RESET_PASSWORD_DEFAULT_VALUES,
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../schemas/resetPassword.schema";
import { useStoresNotifier } from "../useStoresNotifier";

interface UseResetAdminPasswordFormProps {
  store: Store | null;
  onDone: () => void;
}

export const useResetAdminPasswordForm = ({ store, onDone }: UseResetAdminPasswordFormProps) => {
  const resetPassword = useResetStoreAdminPasswordMutation();
  const { notifySuccess, notifyError } = useStoresNotifier();

  const form = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
  });

  const close = () => {
    form.reset(RESET_PASSWORD_DEFAULT_VALUES);
    onDone();
  };

  const onSubmit = ({ password }: ResetPasswordFormData) => {
    if (!store) return;
    resetPassword.mutate(
      { id: store.id, payload: { password } },
      {
        onSuccess: () => {
          notifySuccess("resetPassword.success", { email: store.adminEmail });
          close();
        },
        onError: (error) => notifyError(error, "resetPassword.error"),
      },
    );
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    close,
    isLoading: resetPassword.isPending,
  };
};
