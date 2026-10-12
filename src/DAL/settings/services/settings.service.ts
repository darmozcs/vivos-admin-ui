import { SETTINGS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { StoreSettings } from "@/models";
import type { AxiosResponse } from "axios";

export const getStoreSettingsService = async (): Promise<AxiosResponse<StoreSettings>> =>
  await httpClient.get<StoreSettings>(SETTINGS_PATH);

export const updateStoreSettingsService = async (
  payload: StoreSettings,
): Promise<AxiosResponse<StoreSettings>> =>
  await httpClient.put<StoreSettings>(SETTINGS_PATH, payload);
