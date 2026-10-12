import { FiltersBar } from "@/modules/common/components";
import { FILTER_INPUT_SIZE, FILTER_INPUT_WIDTH } from "@/modules/common/const";
import type { SelectOption } from "@/modules/common/utils";
import type { ClientsFilters } from "@/store";
import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface ClientsFiltersBarProps {
  filters: ClientsFilters;
  canClear: boolean;
  departmentOptions: SelectOption[];
  deliveryTypeOptions: SelectOption[];
  onFullNameChange: (value: string) => void;
  onAccountChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onDepartmentChange: (value: string | null) => void;
  onDeliveryTypeChange: (value: string | null) => void;
  onClear: () => void;
}

export const ClientsFiltersBar = ({
  filters,
  canClear,
  departmentOptions,
  deliveryTypeOptions,
  onFullNameChange,
  onAccountChange,
  onPhoneChange,
  onDepartmentChange,
  onDeliveryTypeChange,
  onClear,
}: ClientsFiltersBarProps) => {
  const { t } = useTranslation("clients");
  const inputProps = { size: FILTER_INPUT_SIZE, w: FILTER_INPUT_WIDTH };

  return (
    <FiltersBar clearLabel={t("filters.clear")} canClear={canClear} onClear={onClear}>
      <TextInput
        {...inputProps}
        label={t("filters.fullName")}
        placeholder={t("filters.fullNamePlaceholder")}
        leftSection={<IconSearch size={16} />}
        value={filters.fullName}
        onChange={(event) => onFullNameChange(event.currentTarget.value)}
      />
      <TextInput
        {...inputProps}
        label={t("filters.account")}
        placeholder={t("filters.accountPlaceholder")}
        value={filters.account}
        onChange={(event) => onAccountChange(event.currentTarget.value)}
      />
      <TextInput
        {...inputProps}
        type="tel"
        label={t("filters.phone")}
        placeholder={t("filters.phonePlaceholder")}
        value={filters.phone}
        onChange={(event) => onPhoneChange(event.currentTarget.value)}
      />
      <Select
        {...inputProps}
        label={t("filters.department")}
        placeholder={t("filters.allPlaceholder")}
        data={departmentOptions}
        searchable
        clearable
        nothingFoundMessage={t("filters.noOptions")}
        value={filters.department}
        onChange={onDepartmentChange}
      />
      <Select
        {...inputProps}
        label={t("filters.deliveryType")}
        placeholder={t("filters.allPlaceholder")}
        data={deliveryTypeOptions}
        clearable
        value={filters.deliveryType}
        onChange={onDeliveryTypeChange}
      />
    </FiltersBar>
  );
};
