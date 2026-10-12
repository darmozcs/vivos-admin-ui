import { STORE_SETTINGS_DETAIL } from "@/DAL/const";
import type { StoreSettings } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreSettingsService } from "../services/settings.service";

export const useUpdateStoreSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: StoreSettings) =>
      (await updateStoreSettingsService(payload)).data,
    onSuccess: (settings) => {
      queryClient.setQueryData([STORE_SETTINGS_DETAIL], settings);
    },
  });
};
