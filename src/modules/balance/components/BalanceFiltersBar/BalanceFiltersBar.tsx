import { FiltersBar } from "@/modules/common/components";
import {
  DATE_FILTER_FORMAT,
  FILTER_INPUT_SIZE,
  FILTER_INPUT_WIDTH,
  FILTER_WIDE_INPUT_WIDTH,
} from "@/modules/common/const";
import type { SelectOption } from "@/modules/common/utils";
import type { BalanceDateRange, BalanceFilters } from "@/store";
import { Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface BalanceFiltersBarProps {
  filters: BalanceFilters;
  canClear: boolean;
  typeOptions: SelectOption[];
  onDateRangeChange: (value: BalanceDateRange) => void;
  onTypeChange: (value: string | null) => void;
  onClear: () => void;
}

export const BalanceFiltersBar = ({
  filters,
  canClear,
  typeOptions,
  onDateRangeChange,
  onTypeChange,
  onClear,
}: BalanceFiltersBarProps) => {
  const { t } = useTranslation("balance");

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
      <Select
        size={FILTER_INPUT_SIZE}
        w={FILTER_INPUT_WIDTH}
        label={t("filters.type")}
        placeholder={t("filters.allPlaceholder")}
        data={typeOptions}
        clearable
        value={filters.type}
        onChange={onTypeChange}
      />
    </FiltersBar>
  );
};
