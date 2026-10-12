import { Button, Group, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface StartLiveHintProps {
  onStart: () => void;
}

export const StartLiveHint = ({ onStart }: StartLiveHintProps) => {
  const { t } = useTranslation("lives");

  return (
    <Paper bg="plum.0" p="md" radius="md">
      <Group justify="space-between" gap="sm">
        <Text size="sm" fw={600}>
          {t("editor.startHint")}
        </Text>
        <Button color="primary" onClick={onStart}>
          {t("actions.start")}
        </Button>
      </Group>
    </Paper>
  );
};
