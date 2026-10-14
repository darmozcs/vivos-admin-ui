import { FiltersBar } from "@/modules/common/components";
import {
  FILTER_INPUT_SIZE,
  FILTER_INPUT_WIDTH,
  FILTER_WIDE_INPUT_WIDTH,
} from "@/modules/common/const";
import type { SelectOption } from "@/modules/common/utils";
import type { SellersFilters } from "@/store";
import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface SellersFiltersBarProps {
  filters: SellersFilters;
  canClear: boolean;
  departmentOptions: SelectOption[];
  deliveryTypeOptions: SelectOption[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string | null) => void;
  onDeliveryTypeChange: (value: string | null) => void;
  onClear: () => void;
}

export const SellersFiltersBar = ({
  filters,
  canClear,
  departmentOptions,
  deliveryTypeOptions,
  onSearchChange,
  onDepartmentChange,
  onDeliveryTypeChange,
  onClear,
}: SellersFiltersBarProps) => {
  const { t } = useTranslation("sellers");
  const inputProps = { size: FILTER_INPUT_SIZE, w: FILTER_INPUT_WIDTH };

  return (
    <FiltersBar clearLabel={t("filters.clear")} canClear={canClear} onClear={onClear}>
      <TextInput
        size={FILTER_INPUT_SIZE}
        w={FILTER_WIDE_INPUT_WIDTH}
        label={t("filters.search")}
        placeholder={t("filters.searchPlaceholder")}
        leftSection={<IconSearch size={16} />}
        value={filters.search}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
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
