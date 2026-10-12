import type { DeliveryType, Department } from "@/types";
import { Select } from "@mantine/core";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getDeliveryTypeOptions, getDepartmentOptions } from "../../utils/selectOptions.utils";

/** Fields every form using these selects must have. */
export interface ClientDeliveryFieldValues extends FieldValues {
  department: Department | null;
  deliveryType: DeliveryType | null;
}

interface ClientDeliveryFieldsProps<T extends ClientDeliveryFieldValues> {
  control: Control<T>;
}

const DEPARTMENT_FIELD = "department";
const DELIVERY_TYPE_FIELD = "deliveryType";

/** Department and delivery type selects shared by the client forms. Both are optional. */
export const ClientDeliveryFields = <T extends ClientDeliveryFieldValues>({
  control,
}: ClientDeliveryFieldsProps<T>) => {
  const { t } = useTranslation("common");
  const departmentOptions = getDepartmentOptions(t);
  const deliveryTypeOptions = getDeliveryTypeOptions(t);

  return (
    <>
      <Controller
        name={DEPARTMENT_FIELD as Path<T>}
        control={control}
        render={({ field }) => (
          <Select
            label={t("clientDelivery.department")}
            placeholder={t("clientDelivery.departmentPlaceholder")}
            data={departmentOptions}
            searchable
            clearable
            nothingFoundMessage={t("clientDelivery.noResults")}
            value={field.value ?? null}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <Controller
        name={DELIVERY_TYPE_FIELD as Path<T>}
        control={control}
        render={({ field }) => (
          <Select
            label={t("clientDelivery.deliveryType")}
            placeholder={t("clientDelivery.deliveryTypePlaceholder")}
            data={deliveryTypeOptions}
            clearable
            value={field.value ?? null}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
    </>
  );
};
