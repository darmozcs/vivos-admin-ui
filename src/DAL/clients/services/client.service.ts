import { CLIENT_DETAIL_PATH, CLIENTS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Client } from "@/models";
import type { DeliveryType, Department } from "@/types";
import type { AxiosResponse } from "axios";

/** Filters of GET /clients, combined with AND. Empty values must not be sent. */
export interface GetClientsParams {
  /** Free search used by the live workspace. */
  search?: string;
  fullName?: string;
  account?: string;
  phone?: string;
  email?: string;
  department?: Department;
  deliveryType?: DeliveryType;
}

export interface CreateClientPayload {
  fullName: string;
  account?: string;
  phone?: string;
  email?: string;
  address?: string;
  department?: Department | null;
  deliveryType?: DeliveryType | null;
}

/** The PATCH replaces every field: a missing department/delivery type is cleared. */
export interface UpdateClientPayload {
  fullName: string;
  account: string;
  phone: string;
  email: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
}

export const getClientsService = async (
  params: GetClientsParams = {},
): Promise<AxiosResponse<Client[]>> =>
  await httpClient.get<Client[]>(CLIENTS_PATH, { params });

export const createClientService = async (
  payload: CreateClientPayload,
): Promise<AxiosResponse<Client>> =>
  await httpClient.post<Client>(CLIENTS_PATH, payload);

export const updateClientService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateClientPayload;
}): Promise<AxiosResponse<Client>> =>
  await httpClient.patch<Client>(CLIENT_DETAIL_PATH({ id }), payload);

export const deleteClientService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(CLIENT_DETAIL_PATH({ id }));
