import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { DELIVERY_TYPE, DEPARTMENT, type DeliveryType, type Department } from "@/types";
import * as yup from "yup";

export const clientFormSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("clients:form.errors.nameRequired")
    .max(CLIENT_FIELD_MAX.fullNameMax, "clients:form.errors.fullNameMax"),
  account: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.accountMax, "clients:form.errors.accountMax")
    .default(""),
  phone: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.phoneMax, "clients:form.errors.phoneMax")
    .default(""),
  email: yup
    .string()
    .trim()
    .email("clients:form.errors.emailInvalid")
    .max(CLIENT_FIELD_MAX.emailMax, "clients:form.errors.emailMax")
    .default(""),
  address: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.addressMax, "clients:form.errors.addressMax")
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

export type ClientFormData = yup.InferType<typeof clientFormSchema>;

export const CLIENT_FORM_DEFAULT_VALUES: ClientFormData = {
  fullName: "",
  account: "",
  phone: "",
  email: "",
  address: "",
  department: null,
  deliveryType: null,
};
