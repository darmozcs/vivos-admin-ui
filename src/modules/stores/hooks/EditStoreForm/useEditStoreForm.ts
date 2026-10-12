import { useUpdateStoreMutation } from "@/DAL";
import type { Store } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  EDIT_STORE_DEFAULT_VALUES,
  editStoreSchema,
  type EditStoreFormData,
} from "../../schemas/editStore.schema";
import { useStoresNotifier } from "../useStoresNotifier";

interface UseEditStoreFormProps {
  store: Store | null;
  onDone: () => void;
}

export const useEditStoreForm = ({ store, onDone }: UseEditStoreFormProps) => {
  const updateStore = useUpdateStoreMutation();
  const { notifySuccess, notifyError } = useStoresNotifier();

  const form = useForm<EditStoreFormData>({
    resolver: yupResolver(editStoreSchema),
    defaultValues: EDIT_STORE_DEFAULT_VALUES,
  });

  // Load the selected store into the form every time the modal opens.
  useEffect(() => {
    if (store) form.reset({ name: store.name });
  }, [store, form]);

  const onSubmit = ({ name }: EditStoreFormData) => {
    if (!store) return;
    updateStore.mutate(
      { id: store.id, payload: { name } },
      {
        onSuccess: () => {
          notifySuccess("edit.success");
          onDone();
        },
        onError: (error) => notifyError(error, "edit.error"),
      },
    );
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: updateStore.isPending,
  };
};
