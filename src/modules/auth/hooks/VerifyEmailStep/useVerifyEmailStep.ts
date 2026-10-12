import {
  useConfirmEmailWithCredentialsMutation,
  useResendVerificationWithCredentialsMutation,
} from "@/DAL";
import { getErrorStatus, HTTP_STATUS } from "@/libs/http";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "../../schemas/login.schema";
import {
  VERIFY_EMAIL_DEFAULT_VALUES,
  verifyEmailSchema,
  type VerifyEmailFormData,
} from "../../schemas/verifyEmail.schema";
import { useCompleteLogin } from "../LoginForm/useCompleteLogin";
import { useAuthNotifier } from "../useAuthNotifier";
import { useResendCooldown } from "./useResendCooldown";

interface UseVerifyEmailStepProps {
  /** Credentials typed on the login form; kept only in memory, never stored. */
  credentials: LoginFormData | null;
  onBack: () => void;
}

export const useVerifyEmailStep = ({ credentials, onBack }: UseVerifyEmailStepProps) => {
  const confirm = useConfirmEmailWithCredentialsMutation();
  const resend = useResendVerificationWithCredentialsMutation();
  const completeLogin = useCompleteLogin();
  const cooldown = useResendCooldown();
  const { notifySuccess, notifyError } = useAuthNotifier();

  const form = useForm<VerifyEmailFormData>({
    resolver: yupResolver(verifyEmailSchema),
    defaultValues: VERIFY_EMAIL_DEFAULT_VALUES,
  });

  const back = () => {
    form.reset(VERIFY_EMAIL_DEFAULT_VALUES);
    cooldown.reset();
    onBack();
  };

  const onConfirmError = (error: unknown) => {
    const status = getErrorStatus(error);
    if (status === HTTP_STATUS.BAD_REQUEST) {
      form.setError("code", { message: "auth:verifyEmail.errors.invalidCode" });
    } else if (status === HTTP_STATUS.CONFLICT) {
      notifySuccess("verifyEmail.alreadyVerified");
      back();
    } else {
      notifyError(error, "verifyEmail.errors.confirm");
    }
  };

  const onSubmit = form.handleSubmit(({ code }) => {
    if (!credentials) return;
    confirm.mutate({ ...credentials, code }, { onSuccess: completeLogin, onError: onConfirmError });
  });

  const onResend = () => {
    if (!credentials || cooldown.secondsLeft > 0) return;
    resend.mutate(credentials, {
      onSuccess: () => {
        cooldown.start();
        notifySuccess("verifyEmail.codeSent");
      },
      onError: (error) => {
        if (getErrorStatus(error) === HTTP_STATUS.TOO_MANY_REQUESTS) cooldown.start();
        notifyError(error, "verifyEmail.errors.resend");
      },
    });
  };

  return {
    email: credentials?.email ?? "",
    form,
    onSubmit,
    isConfirming: confirm.isPending,
    onResend,
    isResending: resend.isPending,
    resendSecondsLeft: cooldown.secondsLeft,
    onBack: back,
  };
};
