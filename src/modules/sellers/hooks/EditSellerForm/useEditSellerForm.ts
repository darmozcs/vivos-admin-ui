import { useUpdateSellerMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Seller } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SELLER_FORM_DEFAULT_VALUES,
  sellerFormSchema,
  type SellerFormData,
} from "../../schemas/sellerForm.schema";

interface UseEditSellerFormProps {
  seller: Seller | null;
  onDone: () => void;
}

export const useEditSellerForm = ({ seller, onDone }: UseEditSellerFormProps) => {
  const { t } = useTranslation("sellers");
  const updateSeller = useUpdateSellerMutation();

  const form = useForm<SellerFormData>({
    resolver: yupResolver(sellerFormSchema),
    defaultValues: SELLER_FORM_DEFAULT_VALUES,
  });

  // Load the selected seller into the form every time the modal opens.
  useEffect(() => {
    if (!seller) return;
    form.reset({
      fullName: seller.fullName,
      account: seller.account,
      phone: seller.phone,
      email: seller.email,
      address: seller.address,
      department: seller.department,
      deliveryType: seller.deliveryType,
    });
  }, [seller, form]);

  const onSubmit = (data: SellerFormData) => {
    if (!seller) return;
    updateSeller.mutate(
      { id: seller.id, payload: data },
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
    isLoading: updateSeller.isPending,
  };
};
