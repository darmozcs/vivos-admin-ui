import { Alert, Button, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LOGIN_ERROR_PROPS } from "../../const/loginForm.const";
import type { LoginFormData } from "../../schemas/login.schema";

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  errorMessage: string | null;
}

export const LoginForm = ({ form, onSubmit, isLoading, errorMessage }: LoginFormProps) => {
  const { t } = useTranslation("auth");
  const { errors } = form.formState;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        <Title order={3}>{t("login.title")}</Title>
        {errorMessage && (
          <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />} role="alert">
            {errorMessage}
          </Alert>
        )}
        <TextInput
          label={t("login.fields.email")}
          placeholder={t("login.fields.emailPlaceholder")}
          autoComplete="username"
          data-autofocus
          {...form.register("email")}
          error={errors.email?.message && t(errors.email.message)}
          errorProps={LOGIN_ERROR_PROPS}
        />
        <PasswordInput
          label={t("login.fields.password")}
          autoComplete="current-password"
          {...form.register("password")}
          error={errors.password?.message && t(errors.password.message)}
          errorProps={LOGIN_ERROR_PROPS}
        />
        <Button type="submit" size="lg" fullWidth loading={isLoading}>
          {t("login.submit")}
        </Button>
      </Stack>
    </form>
  );
};
