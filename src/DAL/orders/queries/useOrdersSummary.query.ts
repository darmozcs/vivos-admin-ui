import { ORDER_SUMMARY_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { OrdersSummary } from "@/models";
import { keepPreviousData } from "@tanstack/react-query";
import {
  getOrdersSummaryService,
  type GetOrdersParams,
} from "../services/order.service";

export const useOrdersSummaryQuery = (params: GetOrdersParams = {}) => {
  return useApiQuery<OrdersSummary>({
    queryKey: [ORDER_SUMMARY_DETAIL, params],
    queryFn: async () => (await getOrdersSummaryService(params)).data,
    placeholderData: keepPreviousData,
  });
};
