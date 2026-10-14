import { CLIENT_FIELD_MAX } from "@/modules/common/const";
import * as yup from "yup";

/** Quick creation during the live: the rest of the client data is filled in on the clients page. */
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
});

export type NewClientFormData = yup.InferType<typeof newClientSchema>;

export const NEW_CLIENT_DEFAULT_VALUES: NewClientFormData = {
  fullName: "",
  account: "",
};
