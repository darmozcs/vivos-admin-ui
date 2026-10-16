/** Limits enforced by vivos-be (also used to interpolate messages). */
export const TAG_FIELD_LIMITS = {
  nameMax: 60,
} as const;

export const TAG_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

/** Quick picks of the color input; any other hex color is allowed too. */
export const TAG_COLOR_SWATCHES = [
  "#E03131",
  "#F76707",
  "#F59F00",
  "#37B24D",
  "#1098AD",
  "#1C7ED6",
  "#7048E8",
  "#D6336C",
  "#495057",
  "#000000",
];

export const DEFAULT_TAG_COLOR = "#1C7ED6";
