import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface BackToLivesButtonProps {
  onClick: () => void;
}

export const BackToLivesButton = ({ onClick }: BackToLivesButtonProps) => {
  const { t } = useTranslation("lives");

  return (
    <Button
      variant="subtle"
      size="compact-sm"
      w="fit-content"
      leftSection={<IconArrowLeft size={16} />}
      onClick={onClick}
    >
      {t("actions.backToLives")}
    </Button>
  );
};
