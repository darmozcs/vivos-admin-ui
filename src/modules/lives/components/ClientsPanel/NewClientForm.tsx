import { Button, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { ClientDeliveryFields } from "@/modules/common/components";
import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { useTranslation } from "react-i18next";
import type { NewClientFormData } from "../../schemas/newClient.schema";

interface NewClientFormProps {
  form: UseFormReturn<NewClientFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
}

export const NewClientForm = ({
  form,
  onSubmit,
  onCancel,
  isLoading,
}: NewClientFormProps) => {
  const { t } = useTranslation("lives");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, CLIENT_FIELD_MAX);

  return (
    <Paper bg="plum.0" p="md" radius="md">
      <form onSubmit={onSubmit}>
        <Stack gap="sm">
          <Text fw={700} size="sm">
            {t("newClient.title")}
          </Text>
          <TextInput
            label={t("newClient.fields.fullName")}
            data-autofocus
            {...form.register("fullName")}
            error={errorOf(errors.fullName?.message)}
          />
          <TextInput
            label={t("newClient.fields.account")}
            placeholder={t("newClient.fields.accountPlaceholder")}
            {...form.register("account")}
            error={errorOf(errors.account?.message)}
          />
          <TextInput
            type="tel"
            label={t("newClient.fields.phone")}
            {...form.register("phone")}
            error={errorOf(errors.phone?.message)}
          />
          <ClientDeliveryFields control={form.control} />
          <Group gap="xs" grow preventGrowOverflow={false}>
            <Button type="submit" loading={isLoading} flex={2}>
              {t("newClient.submit")}
            </Button>
            <Button variant="default" onClick={onCancel} flex={1}>
              {t("newClient.cancel")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
