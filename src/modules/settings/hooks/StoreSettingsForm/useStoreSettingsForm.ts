import { useStoreSettingsQuery, useUpdateStoreSettingsMutation } from "@/DAL";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  storeSettingsSchema,
  type StoreSettingsFormData,
} from "../../schemas/settings.schema";
import { useSettingsNotifier } from "../useSettingsNotifier";

export const useStoreSettingsForm = () => {
  const { data: settings } = useStoreSettingsQuery();
  const updateSettings = useUpdateStoreSettingsMutation();
  const { notifySaved, notifyError } = useSettingsNotifier();

  const form = useForm<StoreSettingsFormData>({
    resolver: yupResolver(storeSettingsSchema),
    defaultValues: { storeName: "" },
  });

  useEffect(() => {
    if (settings) form.reset({ storeName: settings.storeName });
  }, [settings, form]);

  const onSubmit = form.handleSubmit((data) =>
    updateSettings.mutate(data, {
      onSuccess: () => notifySaved("store.success"),
      onError: (error) => notifyError(error, "store.errors.save"),
    }),
  );

  return {
    form,
    onSubmit,
    isLoading: updateSettings.isPending,
    isDirty: form.formState.isDirty,
  };
};
