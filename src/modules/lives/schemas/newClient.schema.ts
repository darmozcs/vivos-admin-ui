import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { DELIVERY_TYPE, DEPARTMENT, type DeliveryType, type Department } from "@/types";
import * as yup from "yup";

export const newClientSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("lives:newClient.errors.nameRequired")
    .max(CLIENT_FIELD_MAX.fullNameMax, "lives:newClient.errors.fullNameMax"),
  account: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.accountMax, "lives:newClient.errors.accountMax")
    .default(""),
  phone: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.phoneMax, "lives:newClient.errors.phoneMax")
    .default(""),
  department: yup
    .mixed<Department>()
    .oneOf(Object.values(DEPARTMENT))
    .nullable()
    .defined()
    .default(null),
  deliveryType: yup
    .mixed<DeliveryType>()
    .oneOf(Object.values(DELIVERY_TYPE))
    .nullable()
    .defined()
    .default(null),
});

export type NewClientFormData = yup.InferType<typeof newClientSchema>;

export const NEW_CLIENT_DEFAULT_VALUES: NewClientFormData = {
  fullName: "",
  account: "",
  phone: "",
  department: null,
  deliveryType: null,
};
