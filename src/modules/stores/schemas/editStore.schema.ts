import * as yup from "yup";
import { storeNameField } from "./createStore.schema";

export const editStoreSchema = yup.object({
  name: storeNameField,
});

export type EditStoreFormData = yup.InferType<typeof editStoreSchema>;

export const EDIT_STORE_DEFAULT_VALUES: EditStoreFormData = { name: "" };
