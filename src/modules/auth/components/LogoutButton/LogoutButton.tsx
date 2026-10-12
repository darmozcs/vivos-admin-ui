import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface LogoutButtonProps {
  isLoading: boolean;
  onLogout: () => void;
}

export const LogoutButton = ({ isLoading, onLogout }: LogoutButtonProps) => {
  const { t } = useTranslation("auth");

  return (
    <Button
      variant="subtle"
      justify="flex-start"
      fullWidth
      leftSection={<IconLogout size={20} stroke={1.8} />}
      loading={isLoading}
      onClick={onLogout}
    >
      {t("logout")}
    </Button>
  );
};
