import { PasswordInput, Stack } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PASSWORD_MAX, PASSWORD_MIN, type PasswordFormData } from "../../schemas/settings.schema";
import { SaveButton } from "../SaveButton/SaveButton";
import { SettingsSection } from "../SettingsSection/SettingsSection";

interface PasswordFormProps {
  form: UseFormReturn<PasswordFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

export const PasswordForm = ({ form, onSubmit, isLoading }: PasswordFormProps) => {
  const { t } = useTranslation("settings");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, { min: PASSWORD_MIN, max: PASSWORD_MAX });

  return (
    <SettingsSection title={t("password.title")} description={t("password.description")}>
      <form onSubmit={onSubmit} noValidate>
        <Stack gap="md">
          <PasswordInput
            label={t("password.fields.current")}
            autoComplete="current-password"
            {...form.register("currentPassword")}
            error={errorOf(errors.currentPassword?.message)}
          />
          <PasswordInput
            label={t("password.fields.new")}
            description={t("password.fields.newHint", { min: PASSWORD_MIN })}
            autoComplete="new-password"
            {...form.register("newPassword")}
            error={errorOf(errors.newPassword?.message)}
          />
          <PasswordInput
            label={t("password.fields.confirm")}
            autoComplete="new-password"
            {...form.register("confirmPassword")}
            error={errorOf(errors.confirmPassword?.message)}
          />
          <SaveButton isLoading={isLoading} />
        </Stack>
      </form>
    </SettingsSection>
  );
};
