import { TagsMultiSelect } from "@/modules/common/components";
import type { SelectOption } from "@/modules/common/utils";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { TradeFormData } from "../../schemas/tradeForm.schema";

interface TradeTagsFieldProps {
  form: UseFormReturn<TradeFormData>;
  options: SelectOption[];
}

/** Store tags of the movement (any number). */
export const TradeTagsField = ({ form, options }: TradeTagsFieldProps) => (
  <Controller
    name="tagIds"
    control={form.control}
    render={({ field }) => (
      <TagsMultiSelect options={options} value={field.value ?? []} onChange={field.onChange} onBlur={field.onBlur} />
    )}
  />
);
