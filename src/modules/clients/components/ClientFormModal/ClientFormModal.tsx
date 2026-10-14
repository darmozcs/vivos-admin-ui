import { Button, Group, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { ClientDeliveryFields } from "@/modules/common/components";
import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { useTranslation } from "react-i18next";
import type { ClientFormData } from "../../schemas/clientForm.schema";

interface ClientFormModalProps {
  opened: boolean;
  title: string;
  submitLabel: string;
  onClose: () => void;
  form: UseFormReturn<ClientFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

const ADDRESS_MIN_ROWS = 2;

/** Client data form shared by the create and edit modals. */
export const ClientFormModal = ({
  opened,
  title,
  submitLabel,
  onClose,
  form,
  onSubmit,
  isLoading,
}: ClientFormModalProps) => {
  const { t } = useTranslation("clients");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, CLIENT_FIELD_MAX);

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label={t("form.fields.fullName")}
            data-autofocus
            {...form.register("fullName")}
            error={errorOf(errors.fullName?.message)}
          />
          <TextInput
            label={t("form.fields.account")}
            placeholder={t("form.fields.accountPlaceholder")}
            {...form.register("account")}
            error={errorOf(errors.account?.message)}
          />
          <TextInput
            type="tel"
            label={t("form.fields.phone")}
            {...form.register("phone")}
            error={errorOf(errors.phone?.message)}
          />
          <TextInput
            type="email"
            label={t("form.fields.email")}
            placeholder={t("form.fields.emailPlaceholder")}
            {...form.register("email")}
            error={errorOf(errors.email?.message)}
          />
          <Textarea
            label={t("form.fields.address")}
            placeholder={t("form.fields.addressPlaceholder")}
            autosize
            minRows={ADDRESS_MIN_ROWS}
            {...form.register("address")}
            error={errorOf(errors.address?.message)}
          />
          <ClientDeliveryFields control={form.control} />
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
