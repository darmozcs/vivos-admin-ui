import * as yup from "yup";

/** darmoz-auth accepts the full email or only the part before the "@" on login. */
export const loginSchema = yup.object({
  email: yup.string().trim().required("auth:login.errors.emailRequired"),
  password: yup.string().required("auth:login.errors.passwordRequired"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const LOGIN_DEFAULT_VALUES: LoginFormData = { email: "", password: "" };
