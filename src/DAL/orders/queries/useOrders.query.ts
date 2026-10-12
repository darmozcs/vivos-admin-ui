import { ORDER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Order } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import { getOrdersService, type GetOrdersParams } from "../services/order.service";

export const useOrdersQuery = (params: GetOrdersParams = {}) => {
  return useApiQuery<Order[]>({
    queryKey: [ORDER_LIST, params],
    queryFn: async () => (await getOrdersService(params)).data,
    placeholderData: keepPreviousData,
  });
};
