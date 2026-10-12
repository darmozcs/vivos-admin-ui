import { useStoresQuery } from "@/DAL";
import { useState } from "react";
import { useEditStoreForm } from "../EditStoreForm/useEditStoreForm";
import { useResetAdminPasswordForm } from "../ResetAdminPasswordForm/useResetAdminPasswordForm";
import { useStoreStatusToggle } from "./useStoreStatusToggle";
import { useStoreVerificationResend } from "./useStoreVerificationResend";

export const useStoresTable = () => {
  const { data: stores = [], isLoading } = useStoresQuery();
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [resettingStoreId, setResettingStoreId] = useState<string | null>(null);
  const { requestToggle } = useStoreStatusToggle();
  const { resendVerification, resendingStoreId } = useStoreVerificationResend();

  const findStore = (id: string | null) => stores.find((store) => store.id === id) ?? null;
  const editingStore = findStore(editingStoreId);
  const resettingStore = findStore(resettingStoreId);

  const editForm = useEditStoreForm({
    store: editingStore,
    onDone: () => setEditingStoreId(null),
  });
  const resetPasswordForm = useResetAdminPasswordForm({
    store: resettingStore,
    onDone: () => setResettingStoreId(null),
  });

  return {
    records: stores,
    isLoading,
    actions: {
      onEdit: setEditingStoreId,
      onToggleActive: requestToggle,
      onResetPassword: setResettingStoreId,
      onResendVerification: resendVerification,
      resendingStoreId,
    },
    editingStore,
    closeEdit: () => setEditingStoreId(null),
    editForm,
    resettingStore,
    resetPasswordForm,
  };
};
