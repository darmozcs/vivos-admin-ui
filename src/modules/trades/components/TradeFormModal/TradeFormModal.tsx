import type { SelectOption } from "@/modules/common/utils";
import { Button, Group, Modal, SegmentedControl, Select, Stack, Textarea } from "@mantine/core";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TRADE_FIELD_LIMITS } from "../../const/trade.const";
import type { TradeFormData } from "../../schemas/tradeForm.schema";
import { TradeAmountFields } from "./TradeAmountFields";
import { TradeCounterpartField } from "./TradeCounterpartField";
import { TradeTagsField } from "./TradeTagsField";

interface TradeFormModalProps {
  opened: boolean;
  title: string;
  submitLabel: string;
  onClose: () => void;
  form: UseFormReturn<TradeFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  type: string;
  /** The type can't change once the trade exists. */
  typeLocked: boolean;
  typeOptions: SelectOption[];
  statusOptions: SelectOption[];
  counterpartLabel: string;
  showQuantity: boolean;
  tagOptions: SelectOption[];
  counterpartOptions: SelectOption[];
  onTypeChange: (value: string) => void;
}

const NOTE_MIN_ROWS = 2;

/** Trade form shared by the create and edit modals. */
export const TradeFormModal = ({
  opened,
  title,
  submitLabel,
  onClose,
  form,
  onSubmit,
  isLoading,
  type,
  typeLocked,
  typeOptions,
  statusOptions,
  counterpartLabel,
  showQuantity,
  tagOptions,
  counterpartOptions,
  onTypeChange,
}: TradeFormModalProps) => {
  const { t } = useTranslation("trades");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, TRADE_FIELD_LIMITS);

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={onSubmit}>
        <Stack>
          <SegmentedControl
            fullWidth
            data={typeOptions}
            value={type}
            onChange={onTypeChange}
            disabled={typeLocked}
            aria-label={t("form.fields.type")}
          />
          <TradeCounterpartField form={form} label={counterpartLabel} options={counterpartOptions} />
          <TradeAmountFields form={form} showQuantity={showQuantity} />
          <TradeTagsField form={form} options={tagOptions} />
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Select
                label={t("form.fields.status")}
                data={statusOptions}
                allowDeselect={false}
                value={field.value ?? null}
                onChange={field.onChange}
                error={errorOf(errors.status?.message)}
              />
            )}
          />
          <Textarea
            label={t("form.fields.note")}
            placeholder={t("form.fields.notePlaceholder")}
            autosize
            minRows={NOTE_MIN_ROWS}
            {...form.register("note")}
            error={errorOf(errors.note?.message)}
          />
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
