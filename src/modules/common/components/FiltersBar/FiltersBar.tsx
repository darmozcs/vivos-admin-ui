import { Button, Flex, Paper } from "@mantine/core";
import { IconFilterOff } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";
import { FILTER_INPUT_SIZE } from "../../const/filters.const";

interface FiltersBarProps extends PropsWithChildren {
  clearLabel: string;
  canClear: boolean;
  onClear: () => void;
}

/** Wrapping row of filters with a "clear filters" action at the end. */
export const FiltersBar = ({ clearLabel, canClear, onClear, children }: FiltersBarProps) => {
  return (
    <Paper withBorder p="md">
      <Flex
        gap="sm"
        wrap="wrap"
        align={{ base: "stretch", sm: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
      >
        {children}
        <Button
          variant="subtle"
          size={FILTER_INPUT_SIZE}
          leftSection={<IconFilterOff size={18} />}
          disabled={!canClear}
          onClick={onClear}
        >
          {clearLabel}
        </Button>
      </Flex>
    </Paper>
  );
};
