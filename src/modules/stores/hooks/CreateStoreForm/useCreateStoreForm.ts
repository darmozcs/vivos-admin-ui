import { useCreateStoreMutation } from "@/DAL";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  CREATE_STORE_DEFAULT_VALUES,
  createStoreSchema,
  type CreateStoreFormData,
} from "../../schemas/createStore.schema";
import { useStoresNotifier } from "../useStoresNotifier";

interface UseCreateStoreFormProps {
  onDone: () => void;
}

export const useCreateStoreForm = ({ onDone }: UseCreateStoreFormProps) => {
  const createStore = useCreateStoreMutation();
  const { notifySuccess, notifyError } = useStoresNotifier();

  const form = useForm<CreateStoreFormData>({
    resolver: yupResolver(createStoreSchema),
    defaultValues: CREATE_STORE_DEFAULT_VALUES,
  });

  const close = () => {
    form.reset(CREATE_STORE_DEFAULT_VALUES);
    onDone();
  };

  const onSubmit = ({ name, adminEmail, adminPassword }: CreateStoreFormData) =>
    createStore.mutate(
      { name, adminEmail, adminPassword },
      {
        onSuccess: () => {
          notifySuccess("create.success", { email: adminEmail });
          close();
        },
        onError: (error) => notifyError(error, "create.error"),
      },
    );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    close,
    isLoading: createStore.isPending,
  };
};
