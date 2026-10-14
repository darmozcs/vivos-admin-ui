import { useDeleteSellerMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Asks for confirmation and deletes a seller. */
export const useSellerDelete = () => {
  const { t } = useTranslation("sellers");
  const deleteSeller = useDeleteSellerMutation();

  const remove = (sellerId: string) =>
    deleteSeller.mutate(sellerId, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: t("common:notifications.successTitle"),
          message: t("delete.success"),
        });
      },
      onError: (error) =>
        notifications.show({
          color: "red",
          title: t("common:notifications.errorTitle"),
          message: extractErrorMessage(error, t("delete.error")),
        }),
    });

  const requestDelete = ({ id, fullName }: { id: string; fullName: string }) =>
    modals.openConfirmModal({
      title: t("delete.title"),
      children: t("delete.message", { name: fullName }),
      labels: { confirm: t("delete.confirm"), cancel: t("form.cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => remove(id),
    });

  return { requestDelete };
};
