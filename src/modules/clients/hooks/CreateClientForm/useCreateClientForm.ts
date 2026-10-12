import { useCreateClientMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CLIENT_FORM_DEFAULT_VALUES,
  clientFormSchema,
  type ClientFormData,
} from "../../schemas/clientForm.schema";

interface UseCreateClientFormProps {
  onDone: () => void;
}

export const useCreateClientForm = ({ onDone }: UseCreateClientFormProps) => {
  const { t } = useTranslation("clients");
  const createClient = useCreateClientMutation();

  const form = useForm<ClientFormData>({
    resolver: yupResolver(clientFormSchema),
    defaultValues: CLIENT_FORM_DEFAULT_VALUES,
  });

  const close = () => {
    form.reset(CLIENT_FORM_DEFAULT_VALUES);
    onDone();
  };

  const onSubmit = (data: ClientFormData) => {
    createClient.mutate(data, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: t("common:notifications.successTitle"),
          message: t("create.success"),
        });
        close();
      },
      onError: (error) =>
        notifications.show({
          color: "red",
          title: t("common:notifications.errorTitle"),
          message: extractErrorMessage(error, t("create.error")),
        }),
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    close,
    isLoading: createClient.isPending,
  };
};
