import { Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { MockCredential } from "../../const/auth.const";

interface MockCredentialsHintProps {
  credentials: readonly MockCredential[];
  verificationCode: string;
}

/** Demo accounts of the mocks; only rendered when mocks are on. */
export const MockCredentialsHint = ({ credentials, verificationCode }: MockCredentialsHintProps) => {
  const { t } = useTranslation("auth");

  return (
    <Stack gap={2} align="center">
      <Text size="xs" fw={700} c="plum.9">
        {t("login.demo.title")}
      </Text>
      {credentials.map(({ labelKey, email, password }) => (
        <Text key={email} size="xs" c="plum.9" ta="center">
          {t(labelKey, { email, password })}
        </Text>
      ))}
      <Text size="xs" c="plum.9" ta="center">
        {t("login.demo.code", { code: verificationCode })}
      </Text>
    </Stack>
  );
};
