import { Center, Loader, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const AuthGuardLoader = () => {
  const { t } = useTranslation("auth");

  return (
    <Center h="100vh">
      <Stack align="center" gap="md">
        <Loader color="primary" />
        <Text c="dimmed">{t("guard.verifying")}</Text>
      </Stack>
    </Center>
  );
};
