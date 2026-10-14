import { useClientsQuery, useSellersQuery } from "@/DAL";
import { TRADE_TYPE, type TradeType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TRADE_STATUSES_BY_TYPE } from "../../const/trade.const";
import {
  getTradeFormDefaultValues,
  tradeFormSchema,
  type TradeFormData,
} from "../../schemas/tradeForm.schema";
import { getTradeStatusOptions, getTradeTypeOptions } from "../../utils/tradeOptions.utils";

/** Form state and options shared by the create and edit trade modals. */
export const useTradeForm = () => {
  const { t } = useTranslation("trades");
  const form = useForm<TradeFormData>({
    resolver: yupResolver(tradeFormSchema),
    defaultValues: getTradeFormDefaultValues(),
  });
  const type = form.watch("type");
  const isSale = type === TRADE_TYPE.SALE;
  const { data: sellers = [] } = useSellersQuery();
  const { data: clients = [] } = useClientsQuery();

  const counterpartOptions = useMemo(
    () => (isSale ? clients : sellers).map(({ id, fullName }) => ({ value: id, label: fullName })),
    [isSale, sellers, clients],
  );

  /** A new type has other statuses and another kind of counterpart. */
  const onTypeChange = (value: string) => {
    const nextType = value as TradeType;
    form.reset({
      ...form.getValues(),
      type: nextType,
      status: TRADE_STATUSES_BY_TYPE[nextType][0],
      counterpartId: getTradeFormDefaultValues(nextType).counterpartId,
    });
  };

  return {
    form,
    type,
    typeOptions: getTradeTypeOptions(t),
    statusOptions: getTradeStatusOptions(t, type),
    counterpartLabel: isSale ? t("form.fields.client") : t("form.fields.seller"),
    counterpartOptions,
    onTypeChange,
  };
};
