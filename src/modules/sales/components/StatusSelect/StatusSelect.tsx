import { ColorSwatch, Select } from "@mantine/core";

interface StatusSelectOption {
  value: string;
  label: string;
  color: string;
}

interface StatusSelectProps {
  value: string;
  options: StatusSelectOption[];
  ariaLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const SWATCH_SIZE = 12;

/** Compact select used to change a status straight from a table row. */
export const StatusSelect = ({
  value,
  options,
  ariaLabel,
  disabled,
  onChange,
}: StatusSelectProps) => {
  const current = options.find((option) => option.value === value);

  return (
    <Select
      size="xs"
      aria-label={ariaLabel}
      value={value}
      data={options}
      allowDeselect={false}
      disabled={disabled}
      comboboxProps={{ withinPortal: true }}
      leftSection={current && <ColorSwatch color={current.color} size={SWATCH_SIZE} withShadow={false} />}
      renderOption={({ option }) => {
        const color = options.find((item) => item.value === option.value)?.color;
        return (
          <>
            {color && <ColorSwatch color={color} size={SWATCH_SIZE} withShadow={false} mr="xs" />}
            {option.label}
          </>
        );
      }}
      onChange={(next) => next && onChange(next)}
    />
  );
};
