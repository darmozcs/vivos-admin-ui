import * as yup from "yup";

export const addItemSchema = yup.object({
  code: yup.string().trim().required("lives:addItem.errors.required"),
  name: yup.string().trim().required("lives:addItem.errors.required"),
  color: yup.string().trim().default(""),
  price: yup
    .number()
    .transform((value, original) => (original === "" ? undefined : value))
    .typeError("lives:addItem.errors.required")
    .required("lives:addItem.errors.required")
    .min(0, "lives:addItem.errors.required"),
});

export type AddItemFormData = yup.InferType<typeof addItemSchema>;

export const ADD_ITEM_DEFAULT_VALUES = {
  code: "",
  name: "",
  color: "",
  price: undefined as unknown as number,
};
