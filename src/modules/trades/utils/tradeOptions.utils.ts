import type { SelectOption } from "@/modules/common/utils";
import { TRADE_STATUS, type TradeType } from "@/types";
import type { TFunction } from "i18next";
import {
  TRADE_STATUS_LABEL_KEYS,
  TRADE_STATUSES_BY_TYPE,
  TRADE_TYPE_LABEL_KEYS,
  TRADE_TYPE_OPTIONS,
} from "../const/trade.const";

export const getTradeTypeOptions = (t: TFunction): SelectOption[] =>
  TRADE_TYPE_OPTIONS.map((value) => ({ value, label: t(TRADE_TYPE_LABEL_KEYS[value]) }));

/** Statuses of one trade type, or every status when no type is given. */
export const getTradeStatusOptions = (t: TFunction, type?: TradeType | null): SelectOption[] =>
  (type ? TRADE_STATUSES_BY_TYPE[type] : Object.values(TRADE_STATUS)).map((value) => ({
    value,
    label: t(TRADE_STATUS_LABEL_KEYS[value]),
  }));
