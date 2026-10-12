import { useEffect, useState } from "react";

interface UseNowProps {
  intervalMs: number;
  enabled?: boolean;
}

/** Returns the current timestamp, refreshed every `intervalMs` while enabled. */
export const useNow = ({ intervalMs, enabled = true }: UseNowProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [enabled, intervalMs]);

  return now;
};
