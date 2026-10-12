import {
  ORDER_STATUS,
  PACKAGE_STATUS,
  type OrderStatus,
  type PackageStatus,
} from "@/types";

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PAID,
  ORDER_STATUS.CANCELLED,
];

export const DEFAULT_ORDER_STATUS: OrderStatus = ORDER_STATUS.PENDING;

export const ORDER_STATUS_LABEL_KEYS: Record<OrderStatus, string> = {
  PENDING: "common:orderStatus.pending",
  PAID: "common:orderStatus.paid",
  CANCELLED: "common:orderStatus.cancelled",
};

export const ORDER_STATUS_CHIP_COLORS: Record<OrderStatus, string> = {
  PENDING: "#FFE6CC",
  PAID: "#DCEBFF",
  CANCELLED: "#FFE3E3",
};

export const PACKAGE_STATUS_OPTIONS: PackageStatus[] = [
  PACKAGE_STATUS.PENDING,
  PACKAGE_STATUS.PREPARED,
  PACKAGE_STATUS.SHIPPED,
  PACKAGE_STATUS.DELIVERED,
];

export const DEFAULT_PACKAGE_STATUS: PackageStatus = PACKAGE_STATUS.PENDING;

export const PACKAGE_STATUS_LABEL_KEYS: Record<PackageStatus, string> = {
  PENDING: "common:packageStatus.pending",
  PREPARED: "common:packageStatus.prepared",
  SHIPPED: "common:packageStatus.shipped",
  DELIVERED: "common:packageStatus.delivered",
};

export const PACKAGE_STATUS_CHIP_COLORS: Record<PackageStatus, string> = {
  PENDING: "#F1E9EE",
  PREPARED: "#FFF3BF",
  SHIPPED: "#E8E1FF",
  DELIVERED: "#D3F9D8",
};
