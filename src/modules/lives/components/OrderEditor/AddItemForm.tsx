import {
  Button,
  Flex,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { AddItemFormData } from "../../schemas/addItem.schema";

interface AddItemFormProps {
  title: string;
  form: UseFormReturn<AddItemFormData>;
  hasErrors: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCodeChange: (code: string) => void;
}

export const AddItemForm = ({
  title,
  form,
  hasErrors,
  onSubmit,
  onCodeChange,
}: AddItemFormProps) => {
  const { t } = useTranslation("lives");
  const { errors } = form.formState;

  return (
    <Stack gap="xs">
      <Text size="sm" fw={700} c="dimmed" tt="uppercase" lts="0.06em">
        {title}
      </Text>
      <Paper component="form" onSubmit={onSubmit} bg="plum.0" p="md" radius="md">
        <Flex gap="sm" align="flex-end" wrap="wrap">
          <Controller
            name="code"
            control={form.control}
            render={({ field }) => (
              <TextInput
                flex="1 1 90px"
                label={t("addItem.fields.code")}
                placeholder={t("addItem.fields.codePlaceholder")}
                fw={700}
                value={field.value}
                onChange={(event) => onCodeChange(event.currentTarget.value)}
                error={!!errors.code}
              />
            )}
          />
          <TextInput flex="3 1 180px" label={t("addItem.fields.name")} placeholder={t("addItem.fields.namePlaceholder")} {...form.register("name")} error={!!errors.name} />
          <TextInput flex="2 1 120px" label={t("addItem.fields.color")} placeholder={t("addItem.fields.colorPlaceholder")} {...form.register("color")} />
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <NumberInput
                flex="1 1 110px"
                label={t("addItem.fields.price")}
                placeholder="0"
                min={0}
                allowNegative={false}
                thousandSeparator="."
                decimalSeparator=","
                value={field.value ?? ""}
                onChange={(value) => field.onChange(value === "" ? undefined : Number(value))}
                error={!!errors.price}
              />
            )}
          />
          <Button type="submit" flex="1 1 120px" leftSection={<IconPlus size={16} stroke={2.4} />}>
            {t("addItem.submit")}
          </Button>
        </Flex>
      </Paper>
      {hasErrors && (
        <Text role="alert" size="sm" fw={600} c="primary.8">
          {t("addItem.errors.required")}
        </Text>
      )}
    </Stack>
  );
};
