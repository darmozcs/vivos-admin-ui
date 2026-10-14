import { useDeleteTradeMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Asks for confirmation and deletes a trade. */
export const useTradeDelete = () => {
  const { t } = useTranslation("trades");
  const deleteTrade = useDeleteTradeMutation();

  const remove = (tradeId: string) =>
    deleteTrade.mutate(tradeId, {
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

  const requestDelete = (tradeId: string) =>
    modals.openConfirmModal({
      title: t("delete.title"),
      children: t("delete.message"),
      labels: { confirm: t("delete.confirm"), cancel: t("form.cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => remove(tradeId),
    });

  return { requestDelete };
};
