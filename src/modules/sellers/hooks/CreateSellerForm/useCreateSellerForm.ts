import { useCreateSellerMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SELLER_FORM_DEFAULT_VALUES,
  sellerFormSchema,
  type SellerFormData,
} from "../../schemas/sellerForm.schema";

interface UseCreateSellerFormProps {
  onDone: () => void;
}

export const useCreateSellerForm = ({ onDone }: UseCreateSellerFormProps) => {
  const { t } = useTranslation("sellers");
  const createSeller = useCreateSellerMutation();

  const form = useForm<SellerFormData>({
    resolver: yupResolver(sellerFormSchema),
    defaultValues: SELLER_FORM_DEFAULT_VALUES,
  });

  const close = () => {
    form.reset(SELLER_FORM_DEFAULT_VALUES);
    onDone();
  };

  const onSubmit = (data: SellerFormData) => {
    createSeller.mutate(data, {
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
    isLoading: createSeller.isPending,
  };
};
