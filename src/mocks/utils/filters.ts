const ACCOUNT_PREFIX = "@";
const LOCAL_TIME_ZONE = "America/Montevideo";

/** "en-CA" formats dates as YYYY-MM-DD. */
const localDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: LOCAL_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Trimmed, lower-cased query param; undefined when missing or blank. */
export const textParam = (params: URLSearchParams, name: string) => {
  const value = params.get(name)?.trim().toLowerCase();
  return value || undefined;
};

/** Case-insensitive "contains"; a missing filter always matches. */
export const containsText = (value: string | null | undefined, filter?: string) =>
  !filter || (value ?? "").toLowerCase().includes(filter);

/** Account filters ignore the leading "@" on both sides, like vivos-be. */
export const stripAccountPrefix = (value: string) =>
  value.startsWith(ACCOUNT_PREFIX) ? value.slice(ACCOUNT_PREFIX.length) : value;

/** Local Montevideo day (YYYY-MM-DD) of an ISO timestamp. */
export const toLocalDay = (isoDate: string) => localDayFormatter.format(new Date(isoDate));

/** Error detail when a "from" day is after the "to" day, like vivos-be. */
export const INVALID_DATE_RANGE = "La fecha desde no puede ser posterior a la fecha hasta";

/** Inclusive numeric range from `min<Name>` / `max<Name>` params; undefined sides are open. */
export interface NumberRangeParam {
  min?: number;
  max?: number;
}

const numberParam = (params: URLSearchParams, name: string) => {
  const raw = params.get(name)?.trim();
  if (!raw) return { value: undefined };
  const value = Number(raw);
  return Number.isFinite(value) ? { value } : { error: `${name} debe ser un número` };
};

/**
 * Reads `min<suffix>` and `max<suffix>`; returns an error detail when one is not
 * a number or min > max (vivos-be answers 400 in both cases).
 */
export const rangeParam = (
  params: URLSearchParams,
  suffix: string,
): { range: NumberRangeParam } | { error: string } => {
  const min = numberParam(params, `min${suffix}`);
  const max = numberParam(params, `max${suffix}`);
  if (min.error || max.error) return { error: (min.error ?? max.error)! };
  if (min.value !== undefined && max.value !== undefined && min.value > max.value) {
    return { error: `min${suffix} no puede ser mayor que max${suffix}` };
  }
  return { range: { min: min.value, max: max.value } };
};

/** Inclusive range check; a missing side always matches. */
export const inRange = (value: number, { min, max }: NumberRangeParam) =>
  (min === undefined || value >= min) && (max === undefined || value <= max);
