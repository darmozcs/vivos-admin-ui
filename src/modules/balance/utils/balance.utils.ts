import type { SelectOption } from "@/modules/common/utils";
import { BALANCE_ENTRY_TYPE, type BalanceEntryType } from "@/types";
import type { TFunction } from "i18next";
import {
  BALANCE_ENTRY_TYPE_LABEL_KEYS,
  BALANCE_ENTRY_TYPE_OPTIONS,
  BALANCE_SUBTRACTING_TYPES,
} from "../const/balance.const";

/** Purchases and payments subtract money and add garments; sales and lives do the opposite. */
export const balanceSign = (type: BalanceEntryType) => (BALANCE_SUBTRACTING_TYPES.includes(type) ? -1 : 1);

/** Payments have no garment quantity. */
export const hasBalanceQuantity = (type: BalanceEntryType) => type !== BALANCE_ENTRY_TYPE.PAYMENT;

export const getBalanceEntryTypeOptions = (t: TFunction): SelectOption[] =>
  BALANCE_ENTRY_TYPE_OPTIONS.map((value) => ({ value, label: t(BALANCE_ENTRY_TYPE_LABEL_KEYS[value]) }));
