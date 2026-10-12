import type { LiveStatus } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import { LiveStatusBadge } from "@/modules/common/components";

interface LiveTitleProps {
  title: string;
  platform: string;
  subtitle: string;
  status: LiveStatus;
}

export const LiveTitle = ({ title, platform, subtitle, status }: LiveTitleProps) => {
  return (
    <Group gap="md" wrap="wrap">
      <LiveStatusBadge status={status} />
      <Stack gap={0}>
        <Title order={1}>{title}</Title>
        <Text size="sm" c="dimmed">
          {platform} · {subtitle}
        </Text>
      </Stack>
    </Group>
  );
};
