import { Group, Paper, Stack, Title, type PaperProps } from "@mantine/core";
import type { ReactNode } from "react";

interface LivePanelProps extends PaperProps {
  title?: ReactNode;
  headerAside?: ReactNode;
  emphasis?: boolean;
  children: ReactNode;
}

export const LivePanel = ({
  title,
  headerAside,
  emphasis,
  children,
  ...rest
}: LivePanelProps) => {
  return (
    <Paper
      component="section"
      withBorder
      bd={emphasis ? "2px solid plum.9" : undefined}
      p={{ base: "md", sm: "lg" }}
      {...rest}
    >
      <Stack gap="md">
        {title && (
          <Group justify="space-between" align="center" gap="sm">
            <Title order={2}>{title}</Title>
            {headerAside}
          </Group>
        )}
        {children}
      </Stack>
    </Paper>
  );
};
