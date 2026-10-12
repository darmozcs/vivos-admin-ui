import { config } from "@/config";
import { endSession, refreshSession, SESSION_REFRESH } from "@/libs/http";
import { useEffect } from "react";

interface UseTokenRefreshProps {
  enabled: boolean;
}

/**
 * Refreshes the tokens periodically while the admin is open. It shares the
 * same in-flight refresh as the http client 401 retry, so they never race.
 */
export const useTokenRefresh = ({ enabled }: UseTokenRefreshProps) => {
  useEffect(() => {
    if (!enabled) return;
    const timer = setInterval(async () => {
      const result = await refreshSession();
      // UNAVAILABLE (no answer) keeps the session: the next tick or a 401 retries.
      if (result === SESSION_REFRESH.REJECTED) endSession();
    }, config.VITE_TOKEN_REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [enabled]);
};
