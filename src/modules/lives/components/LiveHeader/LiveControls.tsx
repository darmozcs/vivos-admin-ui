import { Button, Group, Text } from "@mantine/core";
import {
  IconCheck,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface LiveControlsProps {
  started: boolean;
  active: boolean;
  canPrepareNext: boolean;
  isRunning: boolean;
  isPending: boolean;
  savedLabel: string;
  onStart: () => void;
  onToggleRun: () => void;
  onEnd: () => void;
  onPrepareNext: () => void;
}

export const LiveControls = ({
  started,
  active,
  canPrepareNext,
  isRunning,
  isPending,
  savedLabel,
  onStart,
  onToggleRun,
  onEnd,
  onPrepareNext,
}: LiveControlsProps) => {
  const { t } = useTranslation("lives");

  return (
    <Group gap="sm" wrap="wrap">
      {savedLabel && (
        <Group gap={6} role="status" c="dimmed">
          <IconCheck size={16} stroke={2.2} />
          <Text size="sm">{savedLabel}</Text>
        </Group>
      )}
      {!started && (
        <Button
          size="lg"
          color="primary"
          leftSection={<IconPlayerPlayFilled size={18} />}
          loading={isPending}
          onClick={onStart}
        >
          {t("actions.start")}
        </Button>
      )}
      {active && (
        <>
          <Button variant="default" disabled={isPending} onClick={onToggleRun}>
            {isRunning ? t("actions.pause") : t("actions.resume")}
          </Button>
          <Button
            leftSection={<IconPlayerStopFilled size={14} />}
            disabled={isPending}
            onClick={onEnd}
          >
            {t("actions.end")}
          </Button>
        </>
      )}
      {canPrepareNext && (
        <Button variant="default" onClick={onPrepareNext}>
          {t("actions.prepareNext")}
        </Button>
      )}
    </Group>
  );
};
