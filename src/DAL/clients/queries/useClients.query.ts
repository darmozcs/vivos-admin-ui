import { CLIENT_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Client } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import {
  getClientsService,
  type GetClientsParams,
} from "../services/client.service";

export const useClientsQuery = (params: GetClientsParams = {}) => {
  return useApiQuery<Client[]>({
    queryKey: [CLIENT_LIST, params],
    queryFn: async () => (await getClientsService(params)).data,
    placeholderData: keepPreviousData,
  });
};
