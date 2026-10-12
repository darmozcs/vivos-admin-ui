import { useCreateLiveMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { useLiveWorkspaceStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  PREPARE_LIVE_DEFAULT_VALUES,
  prepareLiveSchema,
  type PrepareLiveFormData,
} from "../../schemas/prepareLive.schema";

interface UsePrepareLiveFormProps {
  onDone: () => void;
}

export const usePrepareLiveForm = ({ onDone }: UsePrepareLiveFormProps) => {
  const { t } = useTranslation("lives");
  const createLive = useCreateLiveMutation();
  const resetWorkspace = useLiveWorkspaceStore((state) => state.reset);

  const form = useForm<PrepareLiveFormData>({
    resolver: yupResolver(prepareLiveSchema),
    defaultValues: PREPARE_LIVE_DEFAULT_VALUES,
  });

  const onSubmit = (data: PrepareLiveFormData) => {
    createLive.mutate(data, {
      onSuccess: () => {
        resetWorkspace();
        form.reset();
        onDone();
        notifications.show({
          color: "green",
          title: t("common:notifications.successTitle"),
          message: t("prepare.success"),
        });
      },
      onError: (error) =>
        notifications.show({
          color: "red",
          title: t("common:notifications.errorTitle"),
          message: extractErrorMessage(error, t("errors.prepare")),
        }),
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: createLive.isPending,
  };
};
