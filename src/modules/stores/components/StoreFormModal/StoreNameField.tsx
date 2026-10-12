import { TextInput } from "@mantine/core";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { STORE_FORM_LIMITS } from "../../const/stores.const";

interface StoreNameFieldProps {
  registration: UseFormRegisterReturn;
  error?: string;
}

export const StoreNameField = ({ registration, error }: StoreNameFieldProps) => {
  const { t } = useTranslation("stores");

  return (
    <TextInput
      label={t("form.fields.name")}
      placeholder={t("form.fields.namePlaceholder")}
      data-autofocus
      {...registration}
      error={error && t(error, STORE_FORM_LIMITS)}
    />
  );
};
