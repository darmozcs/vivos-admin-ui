import * as yup from "yup";
import { ADMIN_PASSWORD_MAX, ADMIN_PASSWORD_MIN, STORE_NAME_MAX } from "../const/stores.const";

export const storeNameField = yup
  .string()
  .trim()
  .required("stores:form.errors.nameRequired")
  .max(STORE_NAME_MAX, "stores:form.errors.nameMax");

export const createStoreSchema = yup.object({
  name: storeNameField,
  adminEmail: yup
    .string()
    .trim()
    .required("stores:form.errors.emailRequired")
    .email("stores:form.errors.emailInvalid"),
  adminPassword: yup
    .string()
    .required("stores:form.errors.passwordRequired")
    .min(ADMIN_PASSWORD_MIN, "stores:form.errors.passwordMin")
    .max(ADMIN_PASSWORD_MAX, "stores:form.errors.passwordMax"),
  confirmPassword: yup
    .string()
    .required("stores:form.errors.confirmRequired")
    .oneOf([yup.ref("adminPassword")], "stores:form.errors.mismatch"),
});

export type CreateStoreFormData = yup.InferType<typeof createStoreSchema>;

export const CREATE_STORE_DEFAULT_VALUES: CreateStoreFormData = {
  name: "",
  adminEmail: "",
  adminPassword: "",
  confirmPassword: "",
};
