import * as yup from "yup";

const STORE_NAME_MAX = 60;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 100;

export const storeSettingsSchema = yup.object({
  storeName: yup
    .string()
    .trim()
    .required("settings:store.errors.required")
    .max(STORE_NAME_MAX, "settings:store.errors.max"),
});

export const passwordSchema = yup.object({
  currentPassword: yup.string().required("settings:password.errors.currentRequired"),
  newPassword: yup
    .string()
    .required("settings:password.errors.newRequired")
    .min(PASSWORD_MIN, "settings:password.errors.min")
    .max(PASSWORD_MAX, "settings:password.errors.max"),
  confirmPassword: yup
    .string()
    .required("settings:password.errors.confirmRequired")
    .oneOf([yup.ref("newPassword")], "settings:password.errors.mismatch"),
});

export type StoreSettingsFormData = yup.InferType<typeof storeSettingsSchema>;
export type PasswordFormData = yup.InferType<typeof passwordSchema>;

export const PASSWORD_DEFAULT_VALUES: PasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
