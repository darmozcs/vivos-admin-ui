import * as yup from "yup";

const DEFAULT_TOKEN_REFRESH_INTERVAL_MS = 300_000;
const MIN_TOKEN_REFRESH_INTERVAL_MS = 60_000;

const envSchema = yup.object({
  VITE_ENABLE_MOCKS: yup.string().oneOf(["true", "false"]).default("false"),
  VITE_API_BASE_URL: yup.string().default(""),
  VITE_API_ID: yup.string().required("VITE_API_ID is required"),
  VITE_TOKEN_REFRESH_INTERVAL_MS: yup
    .number()
    .default(DEFAULT_TOKEN_REFRESH_INTERVAL_MS)
    .min(MIN_TOKEN_REFRESH_INTERVAL_MS, "Minimum refresh interval is 60 seconds"),
});

const rawEnv = {
  VITE_ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS ?? "false",
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_API_ID: import.meta.env.VITE_API_ID,
  VITE_TOKEN_REFRESH_INTERVAL_MS: Number(
    import.meta.env.VITE_TOKEN_REFRESH_INTERVAL_MS ?? DEFAULT_TOKEN_REFRESH_INTERVAL_MS,
  ),
};

const validated = envSchema.validateSync(rawEnv, { stripUnknown: true });

export const config = {
  ...validated,
  VITE_ENABLE_MOCKS: validated.VITE_ENABLE_MOCKS === "true",
};
