import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) => {
  const { t } = useTranslation("lives");

  return (
    <Group gap={4} wrap="nowrap" bd="1px solid gray.3" bdrs="md" w="fit-content">
      <ActionIcon size="md" color="plum.9" onClick={onDecrement} aria-label={t("table.decrement")}>
        <IconMinus size={16} stroke={2.4} />
      </ActionIcon>
      <Text fw={700} miw={24} ta="center">
        {quantity}
      </Text>
      <ActionIcon size="md" color="plum.9" onClick={onIncrement} aria-label={t("table.increment")}>
        <IconPlus size={16} stroke={2.4} />
      </ActionIcon>
    </Group>
  );
};
