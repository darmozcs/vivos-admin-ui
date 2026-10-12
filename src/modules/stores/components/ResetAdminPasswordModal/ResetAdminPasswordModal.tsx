import { Button, Group, Modal, PasswordInput, Stack, Text } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { STORE_FORM_LIMITS } from "../../const/stores.const";
import type { ResetPasswordFormData } from "../../schemas/resetPassword.schema";

interface ResetAdminPasswordModalProps {
  opened: boolean;
  adminEmail: string;
  onClose: () => void;
  form: UseFormReturn<ResetPasswordFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

export const ResetAdminPasswordModal = ({
  opened,
  adminEmail,
  onClose,
  form,
  onSubmit,
  isLoading,
}: ResetAdminPasswordModalProps) => {
  const { t } = useTranslation("stores");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, STORE_FORM_LIMITS);

  return (
    <Modal opened={opened} onClose={onClose} title={t("resetPassword.title")}>
      <form onSubmit={onSubmit} noValidate>
        <Stack>
          <Text size="sm" c="dimmed">
            {t("resetPassword.description", { email: adminEmail })}
          </Text>
          <PasswordInput
            label={t("form.fields.newPassword")}
            description={t("form.fields.passwordHint", STORE_FORM_LIMITS)}
            autoComplete="new-password"
            data-autofocus
            {...form.register("password")}
            error={errorOf(errors.password?.message)}
          />
          <PasswordInput
            label={t("form.fields.confirmPassword")}
            autoComplete="new-password"
            {...form.register("confirmPassword")}
            error={errorOf(errors.confirmPassword?.message)}
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={onClose}>
              {t("form.cancel")}
            </Button>
            <Button type="submit" loading={isLoading}>
              {t("resetPassword.submit")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
