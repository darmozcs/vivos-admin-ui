import { extractErrorMessage } from "@/libs/http";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Success / error toasts of the sign-in flow. */
export const useAuthNotifier = () => {
  const { t } = useTranslation("auth");

  return {
    notifySuccess: (messageKey: string) =>
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
