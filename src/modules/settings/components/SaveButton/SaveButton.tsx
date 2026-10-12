import { Button, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SaveButtonProps {
  isLoading: boolean;
  disabled?: boolean;
}

export const SaveButton = ({ isLoading, disabled }: SaveButtonProps) => {
  const { t } = useTranslation("settings");

  return (
    <Group justify="flex-end">
      <Button type="submit" loading={isLoading} disabled={disabled}>
        {t("save")}
      </Button>
    </Group>
  );
};
