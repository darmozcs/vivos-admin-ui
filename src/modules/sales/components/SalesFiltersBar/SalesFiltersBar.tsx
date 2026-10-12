import { FiltersBar } from "@/modules/common/components";
import {
  DATE_FILTER_FORMAT,
  FILTER_INPUT_SIZE,
  FILTER_INPUT_WIDTH,
  FILTER_WIDE_INPUT_WIDTH,
} from "@/modules/common/const";
import type { SelectOption } from "@/modules/common/utils";
import type { SalesDateRange, SalesFilters } from "@/store";
import { Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface SalesFiltersBarProps {
  filters: SalesFilters;
  canClear: boolean;
  clientOptions: SelectOption[];
  statusOptions: SelectOption[];
  packageStatusOptions: SelectOption[];
  onDateRangeChange: (value: SalesDateRange) => void;
  onLiveTitleChange: (value: string) => void;
  onClientChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
  onPackageStatusChange: (value: string | null) => void;
  onClear: () => void;
}

export const SalesFiltersBar = ({
  filters,
  canClear,
  clientOptions,
  statusOptions,
  packageStatusOptions,
  onDateRangeChange,
  onLiveTitleChange,
  onClientChange,
  onStatusChange,
  onPackageStatusChange,
  onClear,
}: SalesFiltersBarProps) => {
  const { t } = useTranslation("sales");
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
        label={t("filters.liveTitle")}
        placeholder={t("filters.liveTitlePlaceholder")}
        leftSection={<IconSearch size={16} />}
        value={filters.liveTitle}
        onChange={(event) => onLiveTitleChange(event.currentTarget.value)}
      />
      <Select
        {...inputProps}
        label={t("filters.client")}
        placeholder={t("filters.allPlaceholder")}
        data={clientOptions}
        searchable
        clearable
        nothingFoundMessage={t("filters.noOptions")}
        value={filters.clientId}
        onChange={onClientChange}
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
      <Select
        {...inputProps}
        label={t("filters.packageStatus")}
        placeholder={t("filters.allPlaceholder")}
        data={packageStatusOptions}
        clearable
        value={filters.packageStatus}
        onChange={onPackageStatusChange}
      />
    </FiltersBar>
  );
};
