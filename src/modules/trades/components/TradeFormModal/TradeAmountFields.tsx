import { NumberInput, SimpleGrid } from "@mantine/core";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TRADE_FIELD_LIMITS } from "../../const/trade.const";
import type { TradeFormData } from "../../schemas/tradeForm.schema";

interface TradeAmountFieldsProps {
  /** Payments have no garment quantity: only the price is shown. */
  showQuantity: boolean;
  form: UseFormReturn<TradeFormData>;
}

const PRICE_DECIMALS = 2;

/** Quantity (when the type has one) and price, side by side from the sm breakpoint. */
export const TradeAmountFields = ({ form, showQuantity }: TradeAmountFieldsProps) => {
  const { t } = useTranslation("trades");
  const { errors } = form.formState;
  const errorOf = (key?: string) => key && t(key, TRADE_FIELD_LIMITS);

  return (
    <SimpleGrid cols={{ base: 1, sm: showQuantity ? 2 : 1 }}>
      {showQuantity && (
        <Controller
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <NumberInput
              label={t("form.fields.quantity")}
              min={TRADE_FIELD_LIMITS.quantityMin}
              allowDecimal={false}
              allowNegative={false}
              thousandSeparator="."
              decimalSeparator=","
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errorOf(errors.quantity?.message)}
            />
          )}
        />
      )}
      <Controller
        name="price"
        control={form.control}
        render={({ field }) => (
          <NumberInput
            label={t("form.fields.price")}
            prefix="$ "
            min={TRADE_FIELD_LIMITS.priceMin}
            decimalScale={PRICE_DECIMALS}
            allowNegative={false}
            thousandSeparator="."
            decimalSeparator=","
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errorOf(errors.price?.message)}
          />
        )}
      />
    </SimpleGrid>
  );
};
