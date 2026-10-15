import type { BalanceEntryType } from "@/types";

/** One row of GET /balance. amount is always positive; its sign depends on the type. */
export interface BalanceEntry {
  id: string;
  type: BalanceEntryType;
  quantity: number;
  amount: number;
  createdAt: string;
}

/** Sales include lives. balance = sales - purchases; netQuantity = garments bought - sold. */
export interface BalanceSummary {
  salesTotal: number;
  purchasesTotal: number;
  balance: number;
  soldQuantity: number;
  boughtQuantity: number;
  netQuantity: number;
}

export interface Balance {
  entries: BalanceEntry[];
  summary: BalanceSummary;
}
