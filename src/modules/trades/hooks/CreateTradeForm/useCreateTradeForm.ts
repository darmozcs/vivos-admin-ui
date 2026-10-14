import { useCreateTradeMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { getTradeFormDefaultValues, type TradeFormData } from "../../schemas/tradeForm.schema";
import { toTradePayload } from "../../utils/tradePayload.utils";
import { useTradeForm } from "../TradeForm/useTradeForm";

interface UseCreateTradeFormProps {
  onDone: () => void;
}

export const useCreateTradeForm = ({ onDone }: UseCreateTradeFormProps) => {
  const { t } = useTranslation("trades");
  const createTrade = useCreateTradeMutation();
  const tradeForm = useTradeForm();

  const close = () => {
    tradeForm.form.reset(getTradeFormDefaultValues());
    onDone();
  };

  const onSubmit = (data: TradeFormData) => {
    createTrade.mutate(toTradePayload(data), {
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
    ...tradeForm,
    onSubmit: tradeForm.form.handleSubmit(onSubmit),
    close,
    isLoading: createTrade.isPending,
    typeLocked: false,
  };
};
