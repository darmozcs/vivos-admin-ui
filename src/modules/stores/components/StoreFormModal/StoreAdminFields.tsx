import { Alert, PasswordInput, Stack, TextInput } from "@mantine/core";
import { IconMailCheck } from "@tabler/icons-react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { STORE_FORM_LIMITS } from "../../const/stores.const";
import type { CreateStoreFormData } from "../../schemas/createStore.schema";

interface StoreAdminFieldsProps {
  form: UseFormReturn<CreateStoreFormData>;
}

/** Account of the store admin; only asked when the store is created. */
export const StoreAdminFields = ({ form }: StoreAdminFieldsProps) => {
  const { t } = useTranslation("stores");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, STORE_FORM_LIMITS);

  return (
    <Stack gap="md">
      <TextInput
        type="email"
        label={t("form.fields.adminEmail")}
        autoComplete="off"
        {...form.register("adminEmail")}
        error={errorOf(errors.adminEmail?.message)}
      />
      <PasswordInput
        label={t("form.fields.adminPassword")}
        description={t("form.fields.passwordHint", STORE_FORM_LIMITS)}
        autoComplete="new-password"
        {...form.register("adminPassword")}
        error={errorOf(errors.adminPassword?.message)}
      />
      <PasswordInput
        label={t("form.fields.confirmPassword")}
        autoComplete="new-password"
        {...form.register("confirmPassword")}
        error={errorOf(errors.confirmPassword?.message)}
      />
      <Alert color="plum.9" variant="light" icon={<IconMailCheck size={18} />}>
        {t("create.verificationNotice")}
      </Alert>
    </Stack>
  );
};
