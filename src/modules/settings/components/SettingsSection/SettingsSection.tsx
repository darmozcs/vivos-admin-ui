import { Paper, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => {
  return (
    <Paper component="section" withBorder p={{ base: "md", sm: "lg" }}>
      <Stack gap="md">
        <Stack gap={2}>
          <Title order={2}>{title}</Title>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
};
