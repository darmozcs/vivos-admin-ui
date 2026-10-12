import { FiltersBar, RangeFilter } from "@/modules/common/components";
import {
  DATE_FILTER_FORMAT,
  FILTER_INPUT_SIZE,
  FILTER_INPUT_WIDTH,
  FILTER_WIDE_INPUT_WIDTH,
} from "@/modules/common/const";
import type { LivesDateRange, LivesFilters, LivesRangeFilter } from "@/store";
import type { NumberRange } from "@/types";
import { TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { LIVES_RANGE_FILTERS } from "../../const/livesFilters.const";

interface LivesFiltersBarProps {
  filters: LivesFilters;
  rangeErrors: Partial<Record<LivesRangeFilter, string>>;
  canClear: boolean;
  onDateRangeChange: (value: LivesDateRange) => void;
  onTitleChange: (value: string) => void;
  onRangeChange: (key: LivesRangeFilter, value: NumberRange) => void;
  onClear: () => void;
}

export const LivesFiltersBar = ({
  filters,
  rangeErrors,
  canClear,
  onDateRangeChange,
  onTitleChange,
  onRangeChange,
  onClear,
}: LivesFiltersBarProps) => {
  const { t } = useTranslation("liveHistory");

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
        size={FILTER_INPUT_SIZE}
        w={FILTER_INPUT_WIDTH}
        label={t("filters.title")}
        placeholder={t("filters.titlePlaceholder")}
        leftSection={<IconSearch size={16} />}
        value={filters.title}
        onChange={(event) => onTitleChange(event.currentTarget.value)}
      />
      {LIVES_RANGE_FILTERS.map(({ key, labelKey, allowDecimal }) => (
        <RangeFilter
          key={key}
          label={t(labelKey)}
          minLabel={t("filters.min")}
          maxLabel={t("filters.max")}
          value={filters[key]}
          error={rangeErrors[key]}
          allowDecimal={allowDecimal}
          onChange={(value) => onRangeChange(key, value)}
        />
      ))}
    </FiltersBar>
  );
};
