import { extractErrorMessage } from "@/libs";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Success / error toasts shared by the settings forms. */
export const useSettingsNotifier = () => {
  const { t } = useTranslation("settings");

  return {
    notifySaved: (messageKey: string) =>
      notifications.show({
        color: "green",
        title: t("common:notifications.successTitle"),
        message: t(messageKey),
      }),
    notifyError: (error: unknown, fallbackKey: string) =>
      notifications.show({
        color: "red",
        title: t("common:notifications.errorTitle"),
        message: extractErrorMessage(error, t(fallbackKey)),
      }),
  };
};
