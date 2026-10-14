import { SELLER_DETAIL_PATH, SELLERS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Seller } from "@/models";
import type { DeliveryType, Department } from "@/types";
import type { AxiosResponse } from "axios";

/** Filters of GET /sellers, combined with AND. Empty values must not be sent. */
export interface GetSellersParams {
  search?: string;
  fullName?: string;
  account?: string;
  phone?: string;
  email?: string;
  department?: Department;
  deliveryType?: DeliveryType;
}

export interface CreateSellerPayload {
  fullName: string;
  account?: string;
  phone?: string;
  email?: string;
  address?: string;
  department?: Department | null;
  deliveryType?: DeliveryType | null;
}

/** The PATCH replaces every field: a missing department/delivery type is cleared. */
export interface UpdateSellerPayload {
  fullName: string;
  account: string;
  phone: string;
  email: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
}

export const getSellersService = async (
  params: GetSellersParams = {},
): Promise<AxiosResponse<Seller[]>> =>
  await httpClient.get<Seller[]>(SELLERS_PATH, { params });

export const createSellerService = async (
  payload: CreateSellerPayload,
): Promise<AxiosResponse<Seller>> =>
  await httpClient.post<Seller>(SELLERS_PATH, payload);

export const updateSellerService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateSellerPayload;
}): Promise<AxiosResponse<Seller>> =>
  await httpClient.patch<Seller>(SELLER_DETAIL_PATH({ id }), payload);

export const deleteSellerService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(SELLER_DETAIL_PATH({ id }));
