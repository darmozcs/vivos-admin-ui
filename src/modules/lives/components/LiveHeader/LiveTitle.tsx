import { formatLiveNumber } from "@/libs";
import type { LiveStatus } from "@/types";
import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import { LiveStatusBadge } from "@/modules/common/components";

interface LiveTitleProps {
  number: number;
  title: string;
  /** Live duration (hh:mm:ss); null before the live starts. */
  clock: string | null;
  subtitle: string;
  status: LiveStatus;
}

export const LiveTitle = ({ number, title, clock, subtitle, status }: LiveTitleProps) => {
  return (
    <Group gap="md" wrap="wrap">
      <LiveStatusBadge status={status} />
      <Stack gap={0}>
        <Group gap="sm" wrap="wrap" align="center">
          <Title order={1}>
            <Text span c="dimmed" inherit>
              {formatLiveNumber(number)}
            </Text>{" "}
            {title}
          </Title>
          {clock && (
            <Badge size="xl" color="dark" radius="md" ff="monospace">
              {clock}
            </Badge>
          )}
        </Group>
        <Text size="sm" c="dimmed">
          {subtitle}
        </Text>
      </Stack>
    </Group>
  );
};
