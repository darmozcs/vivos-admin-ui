import { useChangePasswordMutation } from "@/DAL";
import { clearSession, getErrorStatus, HTTP_STATUS, LOGIN_ROUTE } from "@/libs/http";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import {
  PASSWORD_DEFAULT_VALUES,
  passwordSchema,
  type PasswordFormData,
} from "../../schemas/settings.schema";
import { useSettingsNotifier } from "../useSettingsNotifier";

export const usePasswordForm = () => {
  const navigate = useNavigate();
  const changePassword = useChangePasswordMutation();
  const { notifySaved, notifyError } = useSettingsNotifier();

  const form = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: PASSWORD_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit(({ currentPassword, newPassword }) =>
    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          // darmoz-auth revokes every session after the change: sign in again.
          // The app is not reloaded so the notification stays on screen.
          notifySaved("password.success");
          clearSession();
          void navigate({ to: LOGIN_ROUTE });
        },
        onError: (error) => {
          if (getErrorStatus(error) === HTTP_STATUS.BAD_REQUEST) {
            // The server rejects a wrong current password: show it on that field.
            form.setError("currentPassword", {
              message: "settings:password.errors.currentInvalid",
            });
            return;
          }
          notifyError(error, "password.errors.save");
        },
      },
    ),
  );

  return { form, onSubmit, isLoading: changePassword.isPending };
};
