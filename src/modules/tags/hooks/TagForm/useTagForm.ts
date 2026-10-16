import { useCreateTagMutation, useUpdateTagMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Tag } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TAG_FORM_DEFAULT_VALUES, tagFormSchema, type TagFormData } from "../../schemas/tagForm.schema";

interface UseTagFormProps {
  /** Tag being edited; null creates a new one. */
  tag: Tag | null;
  onDone: () => void;
}

/** Create or edit form of a tag. */
export const useTagForm = ({ tag, onDone }: UseTagFormProps) => {
  const { t } = useTranslation("tags");
  const createTag = useCreateTagMutation();
  const updateTag = useUpdateTagMutation();
  const messages = tag ? "edit" : "create";

  const form = useForm<TagFormData>({
    resolver: yupResolver(tagFormSchema),
    defaultValues: TAG_FORM_DEFAULT_VALUES,
  });

  // Load the selected tag (or a blank form) every time the modal opens.
  useEffect(() => {
    form.reset(tag ? { name: tag.name, color: tag.color } : TAG_FORM_DEFAULT_VALUES);
  }, [tag, form]);

  const close = () => {
    form.reset(TAG_FORM_DEFAULT_VALUES);
    onDone();
  };

  const callbacks = {
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: t("common:notifications.successTitle"),
        message: t(`${messages}.success`),
      });
      close();
    },
    onError: (error: unknown) =>
      notifications.show({
        color: "red",
        title: t("common:notifications.errorTitle"),
        message: extractErrorMessage(error, t(`${messages}.error`)),
      }),
  };

  const onSubmit = (data: TagFormData) => {
    if (tag) updateTag.mutate({ id: tag.id, payload: data }, callbacks);
    else createTag.mutate(data, callbacks);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    close,
    isLoading: createTag.isPending || updateTag.isPending,
  };
};
