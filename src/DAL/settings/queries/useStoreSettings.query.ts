import { STORE_SETTINGS_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { StoreSettings } from "@/models";
import { getStoreSettingsService } from "../services/settings.service";

interface UseStoreSettingsQueryOptions {
  /** Only store admins have a store: other roles must not request it. */
  enabled?: boolean;
}

export const useStoreSettingsQuery = ({ enabled = true }: UseStoreSettingsQueryOptions = {}) => {
  return useApiQuery<StoreSettings>({
    queryKey: [STORE_SETTINGS_DETAIL],
    queryFn: async () => (await getStoreSettingsService()).data,
    staleTime: Infinity,
    enabled,
  });
};
