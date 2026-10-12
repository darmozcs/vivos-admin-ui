import { Avatar, Center, Group, Paper, Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_CARD_WIDTH } from "../../const/auth.const";

interface LoginLayoutProps {
  children: ReactNode;
}

/** Full-page frame of the login screen with the generic app brand. */
export const LoginLayout = ({ children }: LoginLayoutProps) => {
  const { t } = useTranslation("auth");
  const brandName = t("common:brand.name");

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
          <Group gap="sm" wrap="nowrap">
            <Avatar radius="md" size={44} color="plum.9" name={brandName} />
            <Stack gap={0}>
              <Text ff="heading" fw={700} size="lg" c="plum.9">
                {brandName}
              </Text>
              <Text size="sm" c="plum.9">
                {t("login.subtitle")}
              </Text>
            </Stack>
          </Group>
          {children}
        </Stack>
      </Paper>
    </Center>
  );
};
