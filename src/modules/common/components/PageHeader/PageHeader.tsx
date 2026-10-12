import { Group, Stack, Text, Title } from "@mantine/core";
import type { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <Group justify="space-between" align="center" gap="md">
      <Stack gap={2}>
        <Title order={1}>{title}</Title>
        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </Stack>
      {children}
    </Group>
  );
};
