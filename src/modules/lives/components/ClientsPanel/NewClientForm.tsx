import { Button, Group, Paper, Stack, TextInput } from "@mantine/core";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { useTranslation } from "react-i18next";
import type { NewClientFormData } from "../../schemas/newClient.schema";

interface NewClientFormProps {
  form: UseFormReturn<NewClientFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
}

/** Quick client creation during the live: only name and account; the rest is filled in later. */
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
          <Group gap="xs" grow preventGrowOverflow={false}>
            <Button variant="default" onClick={onCancel} flex={1}>
              {t("newClient.cancel")}
            </Button>
            <Button type="submit" loading={isLoading} flex={2}>
              {t("newClient.submit")}
            </Button>
          </Group>
          <TextInput
            label={t("newClient.fields.fullName")}
            autoFocus
            {...form.register("fullName")}
            error={errorOf(errors.fullName?.message)}
          />
          <TextInput
            label={t("newClient.fields.account")}
            placeholder={t("newClient.fields.accountPlaceholder")}
            {...form.register("account")}
            error={errorOf(errors.account?.message)}
          />
        </Stack>
      </form>
    </Paper>
  );
};
