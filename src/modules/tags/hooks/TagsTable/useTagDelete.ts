import { useDeleteTagMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Tag } from "@/models";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Asks for confirmation and deletes a tag (it is removed from every live and movement). */
export const useTagDelete = () => {
  const { t } = useTranslation("tags");
  const deleteTag = useDeleteTagMutation();

  const remove = (tagId: string) =>
    deleteTag.mutate(tagId, {
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

  const requestDelete = ({ id, name }: Tag) =>
    modals.openConfirmModal({
      title: t("delete.title"),
      children: t("delete.message", { name }),
      labels: { confirm: t("delete.confirm"), cancel: t("form.cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => remove(id),
    });

  return { requestDelete };
};
