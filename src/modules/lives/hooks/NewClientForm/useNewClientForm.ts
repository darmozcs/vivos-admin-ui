import { useCreateClientMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Client } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  NEW_CLIENT_DEFAULT_VALUES,
  newClientSchema,
  type NewClientFormData,
} from "../../schemas/newClient.schema";

interface UseNewClientFormProps {
  onCreated: (client: Client) => void;
}

export const useNewClientForm = ({ onCreated }: UseNewClientFormProps) => {
  const { t } = useTranslation("lives");
  const createClient = useCreateClientMutation();

  const form = useForm<NewClientFormData>({
    resolver: yupResolver(newClientSchema),
    defaultValues: NEW_CLIENT_DEFAULT_VALUES,
  });

  const onSubmit = (data: NewClientFormData) => {
    createClient.mutate(data, {
      onSuccess: (client) => {
        form.reset(NEW_CLIENT_DEFAULT_VALUES);
        onCreated(client);
      },
      onError: (error) =>
        notifications.show({
          color: "red",
          title: t("common:notifications.errorTitle"),
          message: extractErrorMessage(error, t("errors.createClient")),
        }),
    });
  };

  const prefill = (fullName: string) =>
    form.reset({ ...NEW_CLIENT_DEFAULT_VALUES, fullName });

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: createClient.isPending,
    prefill,
  };
};
