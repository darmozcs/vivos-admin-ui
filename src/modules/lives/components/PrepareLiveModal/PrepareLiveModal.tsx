import { TagsMultiSelect } from "@/modules/common/components";
import type { SelectOption } from "@/modules/common/utils";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LIVE_TITLE_MAX, type PrepareLiveFormData } from "../../schemas/prepareLive.schema";

interface PrepareLiveModalProps {
  opened: boolean;
  title: string;
  onClose: () => void;
  form: UseFormReturn<PrepareLiveFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  tagOptions: SelectOption[];
}

export const PrepareLiveModal = ({
  opened,
  title,
  onClose,
  form,
  onSubmit,
  isLoading,
  tagOptions,
}: PrepareLiveModalProps) => {
  const { t } = useTranslation("lives");
  const titleError = form.formState.errors.title?.message;

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label={t("prepare.fields.title")}
            placeholder={t("prepare.fields.titlePlaceholder")}
            data-autofocus
            {...form.register("title")}
            error={titleError && t(titleError, { max: LIVE_TITLE_MAX })}
          />
          <Controller
            name="tagIds"
            control={form.control}
            render={({ field }) => (
              <TagsMultiSelect options={tagOptions} value={field.value ?? []} onChange={field.onChange} />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("prepare.submit")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
