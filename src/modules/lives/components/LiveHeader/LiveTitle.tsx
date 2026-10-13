import type { LiveStatus } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import { LiveStatusBadge } from "@/modules/common/components";

interface LiveTitleProps {
  title: string;
  subtitle: string;
  status: LiveStatus;
}

export const LiveTitle = ({ title, subtitle, status }: LiveTitleProps) => {
  return (
    <Group gap="md" wrap="wrap">
      <LiveStatusBadge status={status} />
      <Stack gap={0}>
        <Title order={1}>{title}</Title>
        <Text size="sm" c="dimmed">
          {subtitle}
        </Text>
      </Stack>
    </Group>
  );
};
