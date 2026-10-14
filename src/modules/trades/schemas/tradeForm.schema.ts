import { TRADE_STATUS, TRADE_TYPE, type TradeStatus, type TradeType } from "@/types";
import * as yup from "yup";
import { TRADE_FIELD_LIMITS, TRADE_STATUSES_BY_TYPE } from "../const/trade.const";

/** NumberInput returns "" when cleared. */
const emptyToUndefined = (value: unknown, original: unknown) =>
  original === "" ? undefined : value;

/** counterpartId is the seller of a sale or the client of a purchase. */
export const tradeFormSchema = yup.object({
  type: yup.mixed<TradeType>().oneOf(Object.values(TRADE_TYPE)).required(),
  status: yup
    .mixed<TradeStatus>()
    .oneOf(Object.values(TRADE_STATUS))
    .required("trades:form.errors.statusRequired")
    .test("status-of-type", "trades:form.errors.statusRequired", (status, context) =>
      TRADE_STATUSES_BY_TYPE[context.parent.type as TradeType].some((allowed) => allowed === status),
    ),
  quantity: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("trades:form.errors.quantityRequired")
    .required("trades:form.errors.quantityRequired")
    .integer("trades:form.errors.quantityMin")
    .min(TRADE_FIELD_LIMITS.quantityMin, "trades:form.errors.quantityMin"),
  price: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("trades:form.errors.priceRequired")
    .required("trades:form.errors.priceRequired")
    .min(TRADE_FIELD_LIMITS.priceMin, "trades:form.errors.priceMin"),
  note: yup.string().trim().max(TRADE_FIELD_LIMITS.noteMax, "trades:form.errors.noteMax").default(""),
  counterpartId: yup.string().required("trades:form.errors.counterpartRequired"),
});

export type TradeFormData = yup.InferType<typeof tradeFormSchema>;

/** quantity, price and counterpart start empty until the user fills them. */
export const getTradeFormDefaultValues = (type: TradeType = TRADE_TYPE.SALE): TradeFormData => ({
  type,
  status: TRADE_STATUSES_BY_TYPE[type][0],
  quantity: undefined as unknown as number,
  price: undefined as unknown as number,
  note: "",
  counterpartId: undefined as unknown as string,
});
