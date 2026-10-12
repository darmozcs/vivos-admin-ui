import { Group, Input, NumberInput } from "@mantine/core";
import type { NumberRange } from "@/types";
import { useId } from "react";
import { FILTER_INPUT_SIZE, FILTER_RANGE_WIDTH } from "../../const/filters.const";

interface RangeFilterProps {
  label: string;
  minLabel: string;
  maxLabel: string;
  value: NumberRange;
  /** Shown under the pair, e.g. when min is greater than max. */
  error?: string;
  /** Integers only unless set. */
  allowDecimal?: boolean;
  onChange: (value: NumberRange) => void;
}

const MIN_VALUE = 0;

/** NumberInput returns "" when cleared. */
const toNumber = (value: string | number) => (typeof value === "number" ? value : null);

/** Labelled pair of "min" and "max" number inputs. */
export const RangeFilter = ({
  label,
  minLabel,
  maxLabel,
  value,
  error,
  allowDecimal = false,
  onChange,
}: RangeFilterProps) => {
  const labelId = useId();
  const [min, max] = value;
  const inputProps = {
    size: FILTER_INPUT_SIZE,
    min: MIN_VALUE,
    allowNegative: false,
    allowDecimal,
    error: Boolean(error),
    flex: 1,
    miw: 0,
  };

  return (
    <Input.Wrapper
      w={FILTER_RANGE_WIDTH}
      label={label}
      labelProps={{ id: labelId }}
      error={error}
      size={FILTER_INPUT_SIZE}
    >
      <Group gap="xs" wrap="nowrap" role="group" aria-labelledby={labelId}>
        <NumberInput
          {...inputProps}
          placeholder={minLabel}
          aria-label={`${label} ${minLabel}`}
          value={min ?? ""}
          onChange={(next) => onChange([toNumber(next), max])}
        />
        <NumberInput
          {...inputProps}
          placeholder={maxLabel}
          aria-label={`${label} ${maxLabel}`}
          value={max ?? ""}
          onChange={(next) => onChange([min, toNumber(next)])}
        />
      </Group>
    </Input.Wrapper>
  );
};
