import { Stack, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { StoreSettingsFormData } from "../../schemas/settings.schema";
import { SaveButton } from "../SaveButton/SaveButton";
import { SettingsSection } from "../SettingsSection/SettingsSection";

interface StoreSettingsFormProps {
  form: UseFormReturn<StoreSettingsFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isDirty: boolean;
}

export const StoreSettingsForm = ({
  form,
  onSubmit,
  isLoading,
  isDirty,
}: StoreSettingsFormProps) => {
  const { t } = useTranslation("settings");
  const error = form.formState.errors.storeName?.message;

  return (
    <SettingsSection title={t("store.title")} description={t("store.description")}>
      <form onSubmit={onSubmit} noValidate>
        <Stack gap="md">
          <TextInput
            label={t("store.fields.storeName")}
            placeholder={t("store.fields.storeNamePlaceholder")}
            {...form.register("storeName")}
            error={error && t(error)}
          />
          <SaveButton isLoading={isLoading} disabled={!isDirty} />
        </Stack>
      </form>
    </SettingsSection>
  );
};
