import { useDeleteLiveMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Asks for confirmation and deletes a live without sales. */
export const useLiveDelete = () => {
  const { t } = useTranslation("liveHistory");
  const deleteLive = useDeleteLiveMutation();

  const remove = (liveId: string) =>
    deleteLive.mutate(liveId, {
      onSuccess: () =>
        notifications.show({
          color: "green",
          title: t("common:notifications.successTitle"),
          message: t("delete.success"),
        }),
      onError: (error) =>
        notifications.show({
          color: "red",
          title: t("common:notifications.errorTitle"),
          message: extractErrorMessage(error, t("delete.error")),
        }),
    });

  const requestDelete = ({ id, title }: { id: string; title: string }) =>
    modals.openConfirmModal({
      title: t("delete.title"),
      children: t("delete.message", { name: title }),
      labels: { confirm: t("delete.confirm"), cancel: t("delete.cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => remove(id),
    });

  return { requestDelete };
};
