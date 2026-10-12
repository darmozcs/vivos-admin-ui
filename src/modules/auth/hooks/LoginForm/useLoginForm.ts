import { useLoginMutation } from "@/DAL";
import { config } from "@/config";
import { extractErrorMessage, getErrorCode, getErrorStatus, HTTP_STATUS } from "@/libs/http";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  EMAIL_NOT_VERIFIED_ERROR,
  LOGIN_STEP,
  MOCK_CREDENTIALS,
  MOCK_VERIFICATION_CODE,
} from "../../const/auth.const";
import { LOGIN_DEFAULT_VALUES, loginSchema, type LoginFormData } from "../../schemas/login.schema";
import { useVerifyEmailStep } from "../VerifyEmailStep/useVerifyEmailStep";
import { useCompleteLogin } from "./useCompleteLogin";

const EMAIL_SEPARATOR = "@";

const isEmailNotVerified = (error: unknown) =>
  getErrorStatus(error) === HTTP_STATUS.FORBIDDEN && getErrorCode(error) === EMAIL_NOT_VERIFIED_ERROR;

// Only /login accepts the part before the "@"; the verification endpoints need the full email.
const isFullEmail = (login: string) => login.includes(EMAIL_SEPARATOR);

export const useLoginForm = () => {
  const { t } = useTranslation("auth");
  const login = useLoginMutation();
  const completeLogin = useCompleteLogin();
  // Needed by the verification step, which proves the credentials again.
  const [pendingCredentials, setPendingCredentials] = useState<LoginFormData | null>(null);

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((data) =>
    login.mutate(data, {
      onSuccess: completeLogin,
      onError: (error) => {
        if (isEmailNotVerified(error) && isFullEmail(data.email)) setPendingCredentials(data);
      },
    }),
  );

  const verifyEmail = useVerifyEmailStep({
    credentials: pendingCredentials,
    onBack: () => {
      setPendingCredentials(null);
      login.reset();
    },
  });

  const getErrorMessage = () => {
    if (!login.error) return null;
    if (isEmailNotVerified(login.error)) {
      return isFullEmail(login.variables?.email ?? "") ? null : t("login.errors.verifyNeedsEmail");
    }
    if (getErrorStatus(login.error) === HTTP_STATUS.UNAUTHORIZED) {
      return t("login.errors.invalidCredentials");
    }
    return extractErrorMessage(login.error, t("login.errors.generic"));
  };

  return {
    step: pendingCredentials ? LOGIN_STEP.VERIFY_EMAIL : LOGIN_STEP.CREDENTIALS,
    form,
    onSubmit,
    isLoading: login.isPending,
    errorMessage: getErrorMessage(),
    mockCredentials: config.VITE_ENABLE_MOCKS ? MOCK_CREDENTIALS : null,
    mockVerificationCode: MOCK_VERIFICATION_CODE,
    verifyEmail,
  };
};
