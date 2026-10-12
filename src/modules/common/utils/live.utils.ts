import type { Live } from "@/models";

/** Total streamed time, including the segment currently running. */
export const getLiveElapsedMs = (live: Live | undefined, now: number) => {
  if (!live) return 0;
  const running = live.runningSince
    ? now - new Date(live.runningSince).getTime()
    : 0;
  return live.accumulatedMs + Math.max(running, 0);
};
