import { BALANCE_ENTRY_TYPE, type BalanceEntryType } from "@/types";

export const BALANCE_ENTRY_TYPE_OPTIONS: BalanceEntryType[] = [
  BALANCE_ENTRY_TYPE.PURCHASE,
  BALANCE_ENTRY_TYPE.SALE,
  BALANCE_ENTRY_TYPE.LIVE,
];

export const BALANCE_ENTRY_TYPE_LABEL_KEYS: Record<BalanceEntryType, string> = {
  PURCHASE: "balance:type.purchase",
  SALE: "balance:type.sale",
  LIVE: "balance:type.live",
};

/** Sales add (green), purchases subtract (red); lives stand out in black (autoContrast gives white text). */
export const BALANCE_ENTRY_TYPE_CHIP_COLORS: Record<BalanceEntryType, string> = {
  PURCHASE: "#FFE3E3",
  SALE: "#D3F9D8",
  LIVE: "#000000",
};
