import { useUpdateStoreMutation } from "@/DAL";
import type { Store } from "@/models";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { STORE_STATUS_ACTION } from "../../const/stores.const";
import { useStoresNotifier } from "../useStoresNotifier";

const actionOf = (store: Store) =>
  store.active ? STORE_STATUS_ACTION.DEACTIVATE : STORE_STATUS_ACTION.ACTIVATE;

/** Asks for confirmation and activates or deactivates a store (and its admin). */
export const useStoreStatusToggle = () => {
  const { t } = useTranslation("stores");
  const updateStore = useUpdateStoreMutation();
  const { notifySuccess, notifyError } = useStoresNotifier();

  const toggle = (store: Store) => {
    const action = actionOf(store);
    updateStore.mutate(
      { id: store.id, payload: { active: !store.active } },
      {
        onSuccess: () => notifySuccess(`${action}.success`, { name: store.name }),
        onError: (error) => notifyError(error, `${action}.error`),
      },
    );
  };

  const requestToggle = (store: Store) => {
    const action = actionOf(store);
    modals.openConfirmModal({
      title: t(`${action}.title`),
      children: t(`${action}.message`, { name: store.name }),
      labels: { confirm: t(`${action}.confirm`), cancel: t("form.cancel") },
      confirmProps: { color: store.active ? "red" : "plum.9" },
      onConfirm: () => toggle(store),
    });
  };

  return { requestToggle };
};
