import * as yup from "yup";

export const LIVE_TITLE_MAX = 120;

/** The title is optional: an empty one becomes the start date and time. */
export const prepareLiveSchema = yup.object({
  title: yup.string().trim().default("").max(LIVE_TITLE_MAX, "lives:prepare.errors.titleMax"),
});

export type PrepareLiveFormData = yup.InferType<typeof prepareLiveSchema>;

export const PREPARE_LIVE_DEFAULT_VALUES: PrepareLiveFormData = { title: "" };
