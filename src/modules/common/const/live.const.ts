import type { LiveStatus } from "@/types";

export const LIVE_STATUS_BADGE: Record<
  LiveStatus,
  { labelKey: string; color: string; dot: { color: string; filled: boolean } }
> = {
  NOT_STARTED: {
    labelKey: "common:liveStatus.notStarted",
    color: "plum.0",
    dot: { color: "plum.9", filled: false },
  },
  RUNNING: {
    labelKey: "common:liveStatus.running",
    color: "primary.6",
    dot: { color: "white", filled: true },
  },
  PAUSED: {
    labelKey: "common:liveStatus.paused",
    color: "primary.6",
    dot: { color: "white", filled: false },
  },
  ENDED: {
    labelKey: "common:liveStatus.ended",
    color: "plum.9",
    dot: { color: "white", filled: false },
  },
};

export const STAT_TONE = {
  DARK: "dark",
  OUTLINE: "outline",
  ACCENT: "accent",
} as const;

export type StatTone = (typeof STAT_TONE)[keyof typeof STAT_TONE];

export const STAT_TONE_STYLES: Record<
  StatTone,
  { bg: string; c: string; labelColor: string; withBorder: boolean }
> = {
  dark: { bg: "plum.9", c: "white", labelColor: "blossom.1", withBorder: false },
  outline: { bg: "white", c: "plum.9", labelColor: "dimmed", withBorder: true },
  accent: { bg: "blossom.5", c: "plum.9", labelColor: "plum.9", withBorder: false },
};
