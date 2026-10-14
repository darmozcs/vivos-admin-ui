import { SELLER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Seller } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import {
  getSellersService,
  type GetSellersParams,
} from "../services/seller.service";

export const useSellersQuery = (params: GetSellersParams = {}) => {
  return useApiQuery<Seller[]>({
    queryKey: [SELLER_LIST, params],
    queryFn: async () => (await getSellersService(params)).data,
    placeholderData: keepPreviousData,
  });
};
