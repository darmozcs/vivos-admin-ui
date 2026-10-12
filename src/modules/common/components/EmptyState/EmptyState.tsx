import { Paper, Stack, Text, type PaperProps } from "@mantine/core";
import type { ReactNode } from "react";

interface EmptyStateProps extends PaperProps {
  message: ReactNode;
  action?: ReactNode;
}

const DASHED_BORDER = { borderStyle: "dashed" } as const;

export const EmptyState = ({ message, action, ...rest }: EmptyStateProps) => {
  return (
    <Paper withBorder p="md" radius="md" style={DASHED_BORDER} {...rest}>
      <Stack gap="sm" align="stretch">
        <Text size="sm" c="dimmed" ta={action ? "left" : "center"}>
          {message}
        </Text>
        {action}
      </Stack>
    </Paper>
  );
};
