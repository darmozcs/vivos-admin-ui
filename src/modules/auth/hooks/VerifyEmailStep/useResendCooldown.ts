import { useNow } from "@/modules/common/hooks";
import { useState } from "react";
import { RESEND_COOLDOWN_SECONDS } from "../../const/auth.const";

const MS_PER_SECOND = 1000;

/** Seconds left before the verification code can be requested again. */
export const useResendCooldown = () => {
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const now = useNow({ intervalMs: MS_PER_SECOND, enabled: endsAt !== null });
  const remaining = endsAt ? Math.ceil((endsAt - now) / MS_PER_SECOND) : 0;

  return {
    secondsLeft: Math.min(RESEND_COOLDOWN_SECONDS, Math.max(0, remaining)),
    start: () => setEndsAt(Date.now() + RESEND_COOLDOWN_SECONDS * MS_PER_SECOND),
    reset: () => setEndsAt(null),
  };
};
