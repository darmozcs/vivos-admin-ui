import { STORE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Store } from "@/models";
import { getStoresService } from "../services/store.service";

export const useStoresQuery = () => {
  return useApiQuery<Store[]>({
    queryKey: [STORE_LIST],
    queryFn: async () => (await getStoresService()).data,
  });
};
