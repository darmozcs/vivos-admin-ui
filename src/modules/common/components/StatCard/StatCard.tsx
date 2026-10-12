import { Paper, Stack, Text } from "@mantine/core";
import { STAT_TONE_STYLES, type StatTone } from "../../const/live.const";

interface StatCardProps {
  label: string;
  value: string | number;
  tone: StatTone;
  tabularNumbers?: boolean;
}

export const StatCard = ({ label, value, tone, tabularNumbers }: StatCardProps) => {
  const styles = STAT_TONE_STYLES[tone];

  return (
    <Paper
      bg={styles.bg}
      c={styles.c}
      withBorder={styles.withBorder}
      px="lg"
      py="md"
    >
      <Stack gap={6}>
        <Text size="sm" fw={600} c={styles.labelColor}>
          {label}
        </Text>
        <Text
          ff="heading"
          fz={{ base: 28, sm: 36 }}
          fw={700}
          lh={1.1}
          style={tabularNumbers ? { fontVariantNumeric: "tabular-nums" } : undefined}
        >
          {value}
        </Text>
      </Stack>
    </Paper>
  );
};
