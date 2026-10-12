import {
  ORDER_STATUS_LABEL_KEYS,
  ORDER_STATUS_OPTIONS,
  PACKAGE_STATUS_LABEL_KEYS,
  PACKAGE_STATUS_OPTIONS,
} from "../const/orderStatus.const";
import { DELIVERY_TYPE, DEPARTMENT } from "@/types";
import type { TFunction } from "i18next";

export interface SelectOption {
  value: string;
  label: string;
}

export const getDepartmentOptions = (t: TFunction): SelectOption[] =>
  Object.values(DEPARTMENT).map((value) => ({ value, label: t(`common:department.${value}`) }));

export const getDeliveryTypeOptions = (t: TFunction): SelectOption[] =>
  Object.values(DELIVERY_TYPE).map((value) => ({
    value,
    label: t(`common:deliveryType.${value}`),
  }));

export const getOrderStatusOptions = (t: TFunction): SelectOption[] =>
  ORDER_STATUS_OPTIONS.map((value) => ({ value, label: t(ORDER_STATUS_LABEL_KEYS[value]) }));

export const getPackageStatusOptions = (t: TFunction): SelectOption[] =>
  PACKAGE_STATUS_OPTIONS.map((value) => ({ value, label: t(PACKAGE_STATUS_LABEL_KEYS[value]) }));
