import { useLiveOrdersQuery } from "@/DAL";
import { formatClock, formatMoney, splitDuration } from "@/libs";
import { useNow } from "@/modules/common/hooks";
import {
  getLiveElapsedMs,
  getOrderTotal,
  getOrderUnits,
  isBillableOrder,
} from "@/modules/common/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CLOCK_TICK_MS } from "../../const/lives.const";
import {
  isLiveEnded,
  isLiveRunning,
} from "../../utils/live.utils";
import { useWorkspaceLive } from "../WorkspaceLive/useWorkspaceLive";

export const useLiveStats = () => {
  const { t } = useTranslation("lives");
  const { data: live } = useWorkspaceLive();
  const { data: orders = [] } = useLiveOrdersQuery(live?.id);
  const now = useNow({ intervalMs: CLOCK_TICK_MS, enabled: isLiveRunning(live) });

  const totals = useMemo(() => {
    // Cancelled sales stay listed but do not count towards the live totals.
    return orders.filter(isBillableOrder).reduce(
      (acc, order) => ({
        buyers: acc.buyers + 1,
        amount: acc.amount + getOrderTotal(order.items),
        units: acc.units + getOrderUnits(order.items),
      }),
      { buyers: 0, amount: 0, units: 0 },
    );
  }, [orders]);

  const elapsedMs = getLiveElapsedMs(live, now);
  const { hours, minutes } = splitDuration(elapsedMs);
  const duration = hours
    ? t("summary.durationHours", { hours, minutes })
    : t("summary.durationMinutes", { minutes });

  return {
    clock: formatClock(elapsedMs),
    buyers: totals.buyers,
    units: totals.units,
    grandTotal: formatMoney(totals.amount),
    ended: isLiveEnded(live),
    endSummary: t("summary.text", {
      duration,
      buyers: t("summary.buyers", { count: totals.buyers }),
      units: t("summary.units", { count: totals.units }),
      total: formatMoney(totals.amount),
    }),
  };
};
