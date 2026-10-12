import { Button, Group, PinInput, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { VERIFICATION_CODE_LENGTH } from "../../const/auth.const";
import { LOGIN_ERROR_PROPS } from "../../const/loginForm.const";
import type { VerifyEmailFormData } from "../../schemas/verifyEmail.schema";

interface VerifyEmailStepProps {
  email: string;
  form: UseFormReturn<VerifyEmailFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isConfirming: boolean;
  onResend: () => void;
  isResending: boolean;
  resendSecondsLeft: number;
  onBack: () => void;
}

export const VerifyEmailStep = ({
  email,
  form,
  onSubmit,
  isConfirming,
  onResend,
  isResending,
  resendSecondsLeft,
  onBack,
}: VerifyEmailStepProps) => {
  const { t } = useTranslation("auth");
  const error = form.formState.errors.code?.message;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        <Title order={2}>{t("verifyEmail.title")}</Title>
        <Text size="sm" c="plum.9">
          {t("verifyEmail.description", { email })}
        </Text>
        <Stack gap={4} align="center">
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <PinInput
                length={VERIFICATION_CODE_LENGTH}
                type="number"
                oneTimeCode
                autoFocus
                size="md"
                value={field.value}
                onChange={field.onChange}
                error={!!error}
                aria-label={t("verifyEmail.fields.code")}
              />
            )}
          />
          {error && (
            <Text size="sm" {...LOGIN_ERROR_PROPS}>
              {t(error, { length: VERIFICATION_CODE_LENGTH })}
            </Text>
          )}
        </Stack>
        <Button type="submit" size="lg" fullWidth loading={isConfirming}>
          {t("verifyEmail.submit")}
        </Button>
        <Group justify="space-between" gap="xs">
          <Button variant="subtle" leftSection={<IconArrowLeft size={18} />} onClick={onBack}>
            {t("verifyEmail.back")}
          </Button>
          <Button
            variant="subtle"
            loading={isResending}
            disabled={resendSecondsLeft > 0}
            onClick={onResend}
          >
            {resendSecondsLeft > 0
              ? t("verifyEmail.resendIn", { seconds: resendSecondsLeft })
              : t("verifyEmail.resend")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
