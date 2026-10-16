import { MultiSelect, type MultiSelectProps } from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { SelectOption } from "../../utils/selectOptions.utils";

interface TagsMultiSelectProps extends Omit<MultiSelectProps, "data" | "value" | "onChange"> {
  options: SelectOption[];
  value: string[];
  onChange: (tagIds: string[]) => void;
}

/** Picks several store tags; shared by the movement and live forms and the filter bars. */
export const TagsMultiSelect = ({ options, value, onChange, ...rest }: TagsMultiSelectProps) => {
  const { t } = useTranslation("common");

  return (
    <MultiSelect
      label={t("tags.label")}
      placeholder={value.length === 0 ? t("tags.placeholder") : undefined}
      nothingFoundMessage={t("tags.noOptions")}
      searchable
      clearable
      hidePickedOptions
      data={options}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};
