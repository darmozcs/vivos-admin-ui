/** Wait after the last keystroke before a text filter hits the API. */
export const FILTER_DEBOUNCE_MS = 300;

/** Size shared by every input of the filter bars. */
export const FILTER_INPUT_SIZE = "sm";

/** Width of each filter: full width on mobile, fixed from `sm` up so the bar wraps. */
export const FILTER_INPUT_WIDTH = { base: "100%", sm: 200 } as const;
export const FILTER_WIDE_INPUT_WIDTH = { base: "100%", sm: 260 } as const;

/** Width of a min/max pair: full width on mobile, room for two inputs from `sm` up. */
export const FILTER_RANGE_WIDTH = { base: "100%", sm: 220 } as const;

/** dayjs format of the dates shown in the date range filters. */
export const DATE_FILTER_FORMAT = "DD/MM/YYYY";
