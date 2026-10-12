import { useDeleteClientMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { useLiveWorkspaceStore } from "@/store";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

/** Asks for confirmation and deletes a client. */
export const useClientDelete = () => {
  const { t } = useTranslation("clients");
  const deleteClient = useDeleteClientMutation();
  const selectedClientId = useLiveWorkspaceStore((s) => s.selectedClientId);
  const selectClient = useLiveWorkspaceStore((s) => s.selectClient);

  const remove = (clientId: string) =>
    deleteClient.mutate(clientId, {
      onSuccess: () => {
        // Don't leave the live workspace pointing at a client that no longer exists.
        if (selectedClientId === clientId) selectClient(null);
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
