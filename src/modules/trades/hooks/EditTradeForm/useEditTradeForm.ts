import { useUpdateTradeMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Trade } from "@/models";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { TradeFormData } from "../../schemas/tradeForm.schema";
import { toTradePayload } from "../../utils/tradePayload.utils";
import { useTradeForm } from "../TradeForm/useTradeForm";

interface UseEditTradeFormProps {
  trade: Trade | null;
  onDone: () => void;
}

export const useEditTradeForm = ({ trade, onDone }: UseEditTradeFormProps) => {
  const { t } = useTranslation("trades");
  const updateTrade = useUpdateTradeMutation();
  const tradeForm = useTradeForm();
  const { form } = tradeForm;

  // Load the selected trade into the form every time the modal opens.
  useEffect(() => {
    if (!trade) return;
    form.reset({
      type: trade.type,
      status: trade.status,
      quantity: trade.quantity ?? undefined,
      price: trade.price,
      note: trade.note,
      counterpartId: (trade.clientId ?? trade.sellerId) as string,
      tagIds: trade.tagIds,
    });
  }, [trade, form]);

  const onSubmit = (data: TradeFormData) => {
    if (!trade) return;
    updateTrade.mutate(
      { id: trade.id, payload: toTradePayload(data) },
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
            message: extractErrorMessage(error, t("edit.error")),
          }),
      },
    );
  };

  return {
    ...tradeForm,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: updateTrade.isPending,
    typeLocked: true,
  };
};
