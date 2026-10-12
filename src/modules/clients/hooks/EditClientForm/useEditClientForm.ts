import { useUpdateClientMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Client } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CLIENT_FORM_DEFAULT_VALUES,
  clientFormSchema,
  type ClientFormData,
} from "../../schemas/clientForm.schema";

interface UseEditClientFormProps {
  client: Client | null;
  onDone: () => void;
}

export const useEditClientForm = ({ client, onDone }: UseEditClientFormProps) => {
  const { t } = useTranslation("clients");
  const updateClient = useUpdateClientMutation();

  const form = useForm<ClientFormData>({
    resolver: yupResolver(clientFormSchema),
    defaultValues: CLIENT_FORM_DEFAULT_VALUES,
  });

  // Load the selected client into the form every time the modal opens.
  useEffect(() => {
    if (!client) return;
    form.reset({
      fullName: client.fullName,
      account: client.account,
      phone: client.phone,
      address: client.address,
      department: client.department,
      deliveryType: client.deliveryType,
    });
  }, [client, form]);

  const onSubmit = (data: ClientFormData) => {
    if (!client) return;
    updateClient.mutate(
      { id: client.id, payload: data },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: t("common:notifications.successTitle"),
            message: t("edit.success"),
          });
          onDone();
        },
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("edit.errors.save")),
          }),
      },
    );
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: updateClient.isPending,
  };
};
