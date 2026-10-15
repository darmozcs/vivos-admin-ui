import { BALANCE_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Balance } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getBalanceService, type GetBalanceParams } from "../services/balance.service";

export const useBalanceQuery = (params: GetBalanceParams = {}) => {
  return useApiQuery<Balance>({
    queryKey: [BALANCE_DETAIL, params],
    queryFn: async () => (await getBalanceService(params)).data,
    placeholderData: keepPreviousData,
  });
};
