import { FiltersBar } from "@/modules/common/components";
import {
  DATE_FILTER_FORMAT,
  FILTER_INPUT_SIZE,
  FILTER_INPUT_WIDTH,
  FILTER_WIDE_INPUT_WIDTH,
} from "@/modules/common/const";
import type { SelectOption } from "@/modules/common/utils";
import type { TradesDateRange, TradesFilters } from "@/store";
import { Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface TradesFiltersBarProps {
  filters: TradesFilters;
  canClear: boolean;
  typeOptions: SelectOption[];
  statusOptions: SelectOption[];
  onDateRangeChange: (value: TradesDateRange) => void;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
  onClear: () => void;
}

export const TradesFiltersBar = ({
  filters,
  canClear,
  typeOptions,
  statusOptions,
  onDateRangeChange,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: TradesFiltersBarProps) => {
  const { t } = useTranslation("trades");
  const inputProps = { size: FILTER_INPUT_SIZE, w: FILTER_INPUT_WIDTH };

  return (
    <FiltersBar clearLabel={t("filters.clear")} canClear={canClear} onClear={onClear}>
      <DatePickerInput
        type="range"
        size={FILTER_INPUT_SIZE}
        w={FILTER_WIDE_INPUT_WIDTH}
        label={t("filters.dateRange")}
        placeholder={t("filters.dateRangePlaceholder")}
        leftSection={<IconCalendar size={16} />}
        valueFormat={DATE_FILTER_FORMAT}
        allowSingleDateInRange
        clearable
        value={filters.dateRange}
        onChange={onDateRangeChange}
      />
      <TextInput
        {...inputProps}
        label={t("filters.search")}
        placeholder={t("filters.searchPlaceholder")}
        leftSection={<IconSearch size={16} />}
        value={filters.search}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
      />
      <Select
        {...inputProps}
        label={t("filters.type")}
        placeholder={t("filters.allPlaceholder")}
        data={typeOptions}
        clearable
        value={filters.type}
        onChange={onTypeChange}
      />
      <Select
        {...inputProps}
        label={t("filters.status")}
        placeholder={t("filters.allPlaceholder")}
        data={statusOptions}
        clearable
        value={filters.status}
        onChange={onStatusChange}
      />
    </FiltersBar>
  );
};
