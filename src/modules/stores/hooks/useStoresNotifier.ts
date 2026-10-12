import { extractErrorMessage } from "@/libs/http";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Success / error toasts shared by the store actions. */
export const useStoresNotifier = () => {
  const { t } = useTranslation("stores");

  return {
    notifySuccess: (messageKey: string, values?: Record<string, string>) =>
      notifications.show({
        color: "green",
        title: t("common:notifications.successTitle"),
        message: t(messageKey, values),
      }),
    notifyError: (error: unknown, fallbackKey: string) =>
      notifications.show({
        color: "red",
        title: t("common:notifications.errorTitle"),
        message: extractErrorMessage(error, t(fallbackKey)),
      }),
  };
};
