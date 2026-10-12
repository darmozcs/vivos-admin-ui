import type { DeliveryType, Department } from "@/types";

export interface Client {
  id: string;
  fullName: string;
  account: string;
  phone: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
  createdAt: string;
}
