import * as yup from "yup";
import { DEFAULT_TAG_COLOR, TAG_COLOR_PATTERN, TAG_FIELD_LIMITS } from "../const/tag.const";

export const tagFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("tags:form.errors.nameRequired")
    .max(TAG_FIELD_LIMITS.nameMax, "tags:form.errors.nameMax"),
  color: yup
    .string()
    .required("tags:form.errors.colorInvalid")
    .matches(TAG_COLOR_PATTERN, "tags:form.errors.colorInvalid"),
});

export type TagFormData = yup.InferType<typeof tagFormSchema>;

export const TAG_FORM_DEFAULT_VALUES: TagFormData = { name: "", color: DEFAULT_TAG_COLOR };
