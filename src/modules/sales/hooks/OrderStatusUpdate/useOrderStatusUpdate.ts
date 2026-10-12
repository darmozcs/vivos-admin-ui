import { useUpdateOrderStatusMutation, type UpdateOrderStatusPayload } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Changes the sale or package status of an order from the sales table. */
export const useOrderStatusUpdate = () => {
  const { t } = useTranslation("sales");
  const updateStatus = useUpdateOrderStatusMutation();

  const update = (id: string, payload: UpdateOrderStatusPayload) =>
    updateStatus.mutate(
      { id, payload },
      {
        onSuccess: () =>
          notifications.show({
            color: "green",
            title: t("common:notifications.successTitle"),
            message: t("statusUpdate.success"),
          }),
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("statusUpdate.error")),
          }),
      },
    );

  return {
    update,
    updatingId: updateStatus.isPending ? updateStatus.variables?.id : undefined,
  };
};
