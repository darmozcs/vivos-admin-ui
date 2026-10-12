import * as yup from "yup";
import { VERIFICATION_CODE_LENGTH } from "../const/auth.const";

const CODE_PATTERN = new RegExp(`^\\d{${VERIFICATION_CODE_LENGTH}}$`);

export const verifyEmailSchema = yup.object({
  code: yup
    .string()
    .required("auth:verifyEmail.errors.codeRequired")
    .matches(CODE_PATTERN, "auth:verifyEmail.errors.codeLength"),
});

export type VerifyEmailFormData = yup.InferType<typeof verifyEmailSchema>;

export const VERIFY_EMAIL_DEFAULT_VALUES: VerifyEmailFormData = { code: "" };
