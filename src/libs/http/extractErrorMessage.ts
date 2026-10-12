interface ApiErrorShape {
  response?: {
    status?: number;
    data?: { message?: string; detail?: string; error?: string };
  };
}

export const extractErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as ApiErrorShape)?.response?.data;
  return data?.message || data?.detail || fallback;
};

/** HTTP status of a failed request, if the server answered. */
export const getErrorStatus = (error: unknown) =>
  (error as ApiErrorShape)?.response?.status;

/** Machine readable error code sent by darmoz-auth (e.g. "EMAIL_NOT_VERIFIED"). */
export const getErrorCode = (error: unknown) =>
  (error as ApiErrorShape)?.response?.data?.error;
