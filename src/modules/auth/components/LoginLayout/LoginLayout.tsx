import { Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { LanguageMenuContainer } from "@/modules/common/containers";
import { useTranslation } from "react-i18next";
import { LOGIN_CARD_WIDTH } from "../../const/auth.const";

interface LoginLayoutProps {
  children: ReactNode;
}

/** Full-page frame of the login screen with the welcome header and language menu. */
export const LoginLayout = ({ children }: LoginLayoutProps) => {
  const { t } = useTranslation("auth");

  return (
    <Center mih="100vh" bg="white" p="md">
      <Paper
        w="100%"
        maw={LOGIN_CARD_WIDTH}
        bg="blossom.5"
        shadow="md"
        p={{ base: "lg", sm: "xl" }}
      >
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={4}>
              <Title order={2}>{t("login.welcome.title")}</Title>
              <Text c="dimmed">{t("login.welcome.description")}</Text>
            </Stack>
          </Group>
          {children}
          <LanguageMenuContainer />
        </Stack>
      </Paper>
    </Center>
  );
};
