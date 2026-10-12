import { useLivesQuery } from "@/DAL";
import { formatClock, formatMoney } from "@/libs";
import { getLiveElapsedMs } from "@/modules/common/utils";
import type { LiveStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { getLiveDate } from "../../utils/liveHistory.utils";
import { useLivesQueryParams } from "../LivesFilters/useLivesQueryParams";

export interface LiveRow {
  id: string;
  title: string;
  platform: string;
  status: LiveStatus;
  date: string;
  duration: string;
  buyers: number;
  units: number;
  total: string;
}

export const useLivesTable = () => {
  const navigate = useNavigate();
  const { params, hasActiveFilters } = useLivesQueryParams();
  const { data: lives = [], isLoading, isPlaceholderData } = useLivesQuery(params);

  const records = useMemo<LiveRow[]>(() => {
    const now = Date.now();
    return lives.map((live) => ({
      id: live.id,
      title: live.title,
      platform: live.platform,
      status: live.status,
      date: getLiveDate(live),
      duration: formatClock(getLiveElapsedMs(live, now)),
      buyers: live.buyers,
      units: live.units,
      total: formatMoney(live.totalAmount),
    }));
  }, [lives]);

  const openLive = (liveId: string) =>
    navigate({ to: "/lives/$liveId", params: { liveId } });

  return {
    records,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    openLive,
  };
};
