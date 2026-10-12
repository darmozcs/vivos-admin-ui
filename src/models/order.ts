import type { OrderStatus, PackageStatus } from "@/types";

export interface OrderItem {
  code: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  /** Human readable sale number assigned by the server. */
  number: number;
  liveId: string;
  clientId: string;
  /** Sale (payment) status. */
  status: OrderStatus;
  /** Shipping status of the package. */
  packageStatus: PackageStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

/** Totals of every order matching the sales filters (GET /orders/summary). */
export interface OrdersSummary {
  orders: number;
  units: number;
  totalAmount: number;
}
