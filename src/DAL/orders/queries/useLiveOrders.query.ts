import { LIVE_ORDER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Order } from "@/models";
import { getLiveOrdersService } from "../services/order.service";

export const useLiveOrdersQuery = (liveId: string | undefined) => {
  return useApiQuery<Order[]>({
    queryKey: [LIVE_ORDER_LIST, liveId],
    queryFn: async () => (await getLiveOrdersService(liveId!)).data,
    enabled: !!liveId,
  });
};
