import { PageHeader } from "@/modules/common/components";
import {
  PasswordSettingsContainer,
  StoreSettingsContainer,
} from "@/modules/settings/containers";
import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

const SETTINGS_MAX_WIDTH = 680;

export const Settings = () => {
  const { t } = useTranslation("settings");

  return (
    <Stack gap="lg" maw={SETTINGS_MAX_WIDTH}>
      <PageHeader title={t("title")} description={t("description")} />
      <StoreSettingsContainer />
      <PasswordSettingsContainer />
    </Stack>
  );
};
