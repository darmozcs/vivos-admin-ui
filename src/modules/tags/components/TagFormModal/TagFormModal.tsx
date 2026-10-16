import { Badge, Button, ColorInput, Group, Modal, Stack, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TAG_COLOR_SWATCHES, TAG_FIELD_LIMITS } from "../../const/tag.const";
import type { TagFormData } from "../../schemas/tagForm.schema";

interface TagFormModalProps {
  opened: boolean;
  title: string;
  submitLabel: string;
  onClose: () => void;
  form: UseFormReturn<TagFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

/** Tag form shared by the create and edit modals, with a live preview of the badge. */
export const TagFormModal = ({ opened, title, submitLabel, onClose, form, onSubmit, isLoading }: TagFormModalProps) => {
  const { t } = useTranslation("tags");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, TAG_FIELD_LIMITS);
  const [name, color] = form.watch(["name", "color"]);

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label={t("form.fields.name")}
            placeholder={t("form.fields.namePlaceholder")}
            data-autofocus
            {...form.register("name")}
            error={errorOf(errors.name?.message)}
          />
          <Controller
            name="color"
            control={form.control}
            render={({ field }) => (
              <ColorInput
                label={t("form.fields.color")}
                format="hex"
                swatches={TAG_COLOR_SWATCHES}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errorOf(errors.color?.message)}
              />
            )}
          />
          <Group gap="xs">
            <Badge color={color} autoContrast tt="none">
              {name.trim() || t("form.previewPlaceholder")}
            </Badge>
          </Group>
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={onClose}>
              {t("form.cancel")}
            </Button>
            <Button type="submit" loading={isLoading}>
              {submitLabel}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
