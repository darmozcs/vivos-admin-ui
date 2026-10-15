import { useUpdateOrderStatusMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UsePackageNumberEditorProps {
  orderId: string | null;
  number: number | null;
}

/** Popover state to change the package number of a sale (unique within the live). */
export const usePackageNumberEditor = ({ orderId, number }: UsePackageNumberEditorProps) => {
  const { t } = useTranslation("lives");
  const updateOrder = useUpdateOrderStatusMutation();
  const [opened, { open, close }] = useDisclosure();
  const [value, setValue] = useState<number | "">("");

  const onOpen = () => {
    setValue(number ?? "");
    open();
  };

  const onSave = () => {
    if (!orderId || value === "" || value === number) {
      close();
      return;
    }
    updateOrder.mutate(
      { id: orderId, payload: { number: value } },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: t("common:notifications.successTitle"),
            message: t("editor.packageNumber.success"),
          });
          close();
        },
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("errors.packageNumber")),
          }),
      },
    );
  };

  return {
    opened,
    onOpen,
    onClose: close,
    value,
    onValueChange: (next: string | number) => setValue(typeof next === "number" ? next : ""),
    onSave,
    isSaving: updateOrder.isPending,
  };
};
