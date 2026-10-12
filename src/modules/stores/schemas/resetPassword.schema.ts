import * as yup from "yup";
import { ADMIN_PASSWORD_MAX, ADMIN_PASSWORD_MIN } from "../const/stores.const";

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("stores:form.errors.passwordRequired")
    .min(ADMIN_PASSWORD_MIN, "stores:form.errors.passwordMin")
    .max(ADMIN_PASSWORD_MAX, "stores:form.errors.passwordMax"),
  confirmPassword: yup
    .string()
    .required("stores:form.errors.confirmRequired")
    .oneOf([yup.ref("password")], "stores:form.errors.mismatch"),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

export const RESET_PASSWORD_DEFAULT_VALUES: ResetPasswordFormData = {
  password: "",
  confirmPassword: "",
};
