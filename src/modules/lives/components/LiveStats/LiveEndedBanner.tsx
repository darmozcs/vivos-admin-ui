import { Group, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface LiveEndedBannerProps {
  summary: string;
}

export const LiveEndedBanner = ({ summary }: LiveEndedBannerProps) => {
  const { t } = useTranslation("lives");

  return (
    <Paper role="status" bg="blossom.0" withBorder bd="1px solid blossom.2" py="md">
      <Group gap="xs" wrap="wrap">
        <Text ff="heading" fw={700} size="lg">
          {t("summary.title")}
        </Text>
        <Text>{summary}</Text>
        <Text c="dimmed">{t("summary.stillEditable")}</Text>
      </Group>
    </Paper>
  );
};
