import {
  ADMIN_STORE_DETAIL_PATH,
  ADMIN_STORE_PASSWORD_PATH,
  ADMIN_STORE_VERIFICATION_EMAIL_PATH,
  ADMIN_STORES_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Store } from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateStorePayload {
  name: string;
  adminEmail: string;
  adminPassword: string;
}

export interface UpdateStorePayload {
  name?: string;
  active?: boolean;
}

export interface ResetStoreAdminPasswordPayload {
  password: string;
}

export const getStoresService = async (): Promise<AxiosResponse<Store[]>> =>
  await httpClient.get<Store[]>(ADMIN_STORES_PATH);

export const createStoreService = async (
  payload: CreateStorePayload,
): Promise<AxiosResponse<Store>> =>
  await httpClient.post<Store>(ADMIN_STORES_PATH, payload);

export const updateStoreService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStorePayload;
}): Promise<AxiosResponse<Store>> =>
  await httpClient.patch<Store>(ADMIN_STORE_DETAIL_PATH({ id }), payload);

export const resetStoreAdminPasswordService = async ({
  id,
  payload,
}: {
  id: string;
  payload: ResetStoreAdminPasswordPayload;
}): Promise<AxiosResponse<void>> =>
  await httpClient.put<void>(ADMIN_STORE_PASSWORD_PATH({ id }), payload);

export const resendStoreAdminVerificationService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(ADMIN_STORE_VERIFICATION_EMAIL_PATH({ id }));
