import { BALANCE_ENTRY_TYPE, type BalanceEntryType } from "@/types";

export const BALANCE_ENTRY_TYPE_OPTIONS: BalanceEntryType[] = [
  BALANCE_ENTRY_TYPE.PURCHASE,
  BALANCE_ENTRY_TYPE.SALE,
  BALANCE_ENTRY_TYPE.LIVE,
  BALANCE_ENTRY_TYPE.PAYMENT,
];

export const BALANCE_ENTRY_TYPE_LABEL_KEYS: Record<BalanceEntryType, string> = {
  PURCHASE: "balance:type.purchase",
  SALE: "balance:type.sale",
  LIVE: "balance:type.live",
  PAYMENT: "balance:type.payment",
};

/** Sales add (green), purchases and payments subtract (red/orange); lives stand out in black (autoContrast gives white text). */
export const BALANCE_ENTRY_TYPE_CHIP_COLORS: Record<BalanceEntryType, string> = {
  PURCHASE: "#FFE3E3",
  SALE: "#D3F9D8",
  LIVE: "#000000",
  PAYMENT: "#FFD8A8",
};

/** Purchases and payments subtract money; payments carry no garments. */
export const BALANCE_SUBTRACTING_TYPES: BalanceEntryType[] = [
  BALANCE_ENTRY_TYPE.PURCHASE,
  BALANCE_ENTRY_TYPE.PAYMENT,
];
