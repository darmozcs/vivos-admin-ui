import type { SelectOption } from "@/modules/common/utils";
import { Select } from "@mantine/core";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TradeFormData } from "../../schemas/tradeForm.schema";

interface TradeCounterpartFieldProps {
  form: UseFormReturn<TradeFormData>;
  label: string;
  options: SelectOption[];
}

/** Seller of a sale or client of a purchase. */
export const TradeCounterpartField = ({ form, label, options }: TradeCounterpartFieldProps) => {
  const { t } = useTranslation("trades");
  const error = form.formState.errors.counterpartId?.message;

  return (
    <Controller
      name="counterpartId"
      control={form.control}
      render={({ field }) => (
        <Select
          label={label}
          placeholder={t("form.fields.counterpartPlaceholder")}
          data={options}
          searchable
          nothingFoundMessage={t("form.fields.noOptions")}
          value={field.value ?? null}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={error && t(error)}
        />
      )}
    />
  );
};
