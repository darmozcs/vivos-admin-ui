import type { DeliveryType, Department } from "@/types";

export interface Seller {
  id: string;
  fullName: string;
  account: string;
  phone: string;
  email: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
  createdAt: string;
}
