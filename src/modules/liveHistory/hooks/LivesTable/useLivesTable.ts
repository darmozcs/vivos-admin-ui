import { useLivesQuery } from "@/DAL";
import { formatClock, formatMoney } from "@/libs";
import { getLiveElapsedMs } from "@/modules/common/utils";
import type { LiveStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getLiveDate } from "../../utils/liveHistory.utils";
import { useLivesQueryParams } from "../LivesFilters/useLivesQueryParams";
import { useLiveDelete } from "./useLiveDelete";

export interface LiveRow {
  id: string;
  title: string;
  status: LiveStatus;
  date: string;
  duration: string;
  buyers: number;
  units: number;
  total: string;
  /** Only lives without sales can be deleted. */
  canDelete: boolean;
}

export const useLivesTable = () => {
  const { t } = useTranslation("liveHistory");
  const navigate = useNavigate();
  const { params, hasActiveFilters } = useLivesQueryParams();
  const { data: lives = [], isLoading, isPlaceholderData } = useLivesQuery(params);
  const { requestDelete } = useLiveDelete();

  const records = useMemo<LiveRow[]>(() => {
    const now = Date.now();
    return lives.map((live) => ({
      id: live.id,
      // Lives prepared without a name get one (start date and time) when they start.
      title: live.title || t("untitled"),
      status: live.status,
      date: getLiveDate(live),
      duration: formatClock(getLiveElapsedMs(live, now)),
      buyers: live.buyers,
      units: live.units,
      total: formatMoney(live.totalAmount),
      canDelete: live.buyers === 0,
    }));
  }, [lives, t]);

  const openLive = (liveId: string) =>
    navigate({ to: "/lives/$liveId", params: { liveId } });

  return {
    records,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    openLive,
    requestDelete,
  };
};
