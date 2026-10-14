import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import { DELIVERY_TYPE, DEPARTMENT, type DeliveryType, type Department } from "@/types";
import * as yup from "yup";

export const sellerFormSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("sellers:form.errors.nameRequired")
    .max(CLIENT_FIELD_MAX.fullNameMax, "sellers:form.errors.fullNameMax"),
  account: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.accountMax, "sellers:form.errors.accountMax")
    .default(""),
  phone: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.phoneMax, "sellers:form.errors.phoneMax")
    .default(""),
  email: yup
    .string()
    .trim()
    .email("sellers:form.errors.emailInvalid")
    .max(CLIENT_FIELD_MAX.emailMax, "sellers:form.errors.emailMax")
    .default(""),
  address: yup
    .string()
    .trim()
    .max(CLIENT_FIELD_MAX.addressMax, "sellers:form.errors.addressMax")
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

export type SellerFormData = yup.InferType<typeof sellerFormSchema>;

export const SELLER_FORM_DEFAULT_VALUES: SellerFormData = {
  fullName: "",
  account: "",
  phone: "",
  email: "",
  address: "",
  department: null,
  deliveryType: null,
};
