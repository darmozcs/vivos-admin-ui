type ParamValue = string | number | boolean | null | undefined;

/**
 * Drops empty values (null, undefined, blank strings) and trims the rest, so
 * filters that are not set are never sent as query params.
 */
export const compactParams = <T extends Record<string, ParamValue>>(params: T) =>
  Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
      .filter(([, value]) => value !== null && value !== undefined && value !== ""),
  ) as Partial<{ [K in keyof T]: NonNullable<T[K]> }>;
