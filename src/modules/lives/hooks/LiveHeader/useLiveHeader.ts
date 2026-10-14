import { useCurrentLiveQuery, useLiveActionMutation } from "@/DAL";
import { extractErrorMessage, formatClock, formatDate, formatTime } from "@/libs";
import type { Live } from "@/models";
import { useNow } from "@/modules/common/hooks";
import { getLiveElapsedMs } from "@/modules/common/utils";
import { useLiveWorkspaceStore } from "@/store";
import { LIVE_ACTION, type LiveAction } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  CLOCK_TICK_MS,
  MS_PER_SECOND,
  SAVED_JUST_NOW_SECONDS,
  SECONDS_PER_MINUTE,
} from "../../const/lives.const";
import {
  isLiveActive,
  isLiveEnded,
  isLiveRunning,
  isLiveStarted,
} from "../../utils/live.utils";
import { useWorkspaceLive } from "../WorkspaceLive/useWorkspaceLive";

const getSchedule = (t: TFunction, live: Live) => {
  if (!live.startedAt) return t("subtitle.ready");
  if (live.endedAt) {
    return t("subtitle.ended", {
      from: formatTime(live.startedAt),
      to: formatTime(live.endedAt),
    });
  }
  return t("subtitle.started", { time: formatTime(live.startedAt) });
};

/** "10/10/2026 · de 21:00 a 22:10" */
const getSubtitle = (t: TFunction, live?: Live) =>
  live
    ? `${formatDate(live.startedAt ?? live.createdAt)} · ${getSchedule(t, live)}`
    : "";

const getSavedLabel = (t: TFunction, savedAt: number, now: number) => {
  const seconds = Math.max(Math.floor((now - savedAt) / MS_PER_SECOND), 0);
  if (seconds < SAVED_JUST_NOW_SECONDS) return t("saved.justNow");
  if (seconds < SECONDS_PER_MINUTE) return t("saved.seconds", { count: seconds });
  return t("saved.minutes", { count: Math.floor(seconds / SECONDS_PER_MINUTE) });
};

export const useLiveHeader = () => {
  const { t } = useTranslation("lives");
  const navigate = useNavigate();
  const { data: live, isLoading, isError, noCurrentLive, fromHistory } = useWorkspaceLive();
  const { data: currentLive } = useCurrentLiveQuery();
  const liveAction = useLiveActionMutation();
  const lastSavedAt = useLiveWorkspaceStore((state) => state.lastSavedAt);
  const [prepareOpened, { open: openPrepare, close: closePrepare }] =
    useDisclosure();
  const started = isLiveStarted(live);
  const now = useNow({ intervalMs: CLOCK_TICK_MS, enabled: started });

  const runAction = (action: LiveAction) => {
    if (!live) return;
    liveAction.mutate(
      { id: live.id, action },
      {
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("errors.action")),
          }),
      },
    );
  };

  const confirmEnd = () =>
    modals.openConfirmModal({
      title: t("end.confirmTitle"),
      children: t("end.confirmMessage"),
      labels: { confirm: t("end.confirm"), cancel: t("end.cancel") },
      confirmProps: { color: "blossom.5", autoContrast: true },
      onConfirm: () => runAction(LIVE_ACTION.END),
    });

  const isRunning = isLiveRunning(live);
  const active = isLiveActive(live);
  const ended = isLiveEnded(live);
  const savedAt =
    lastSavedAt ?? (live?.startedAt ? new Date(live.startedAt).getTime() : now);
  // Only the current live can be followed by a new one.
  const isCurrentLive = !fromHistory || currentLive?.id === live?.id;

  return {
    live,
    isLoading,
    notFound: isError,
    noCurrentLive,
    started,
    ended,
    active,
    isRunning,
    isPending: liveAction.isPending,
    subtitle: getSubtitle(t, live),
    // Live duration, shown next to the title once the live has started.
    clock: started && live ? formatClock(getLiveElapsedMs(live, now)) : null,
    // An ended live opened from the history only shows it after an edit in this visit.
    savedLabel: active || lastSavedAt ? getSavedLabel(t, savedAt, now) : "",
    fromHistory,
    canPrepareNext: ended && isCurrentLive,
    goBack: () => navigate({ to: "/lives" }),
    onStart: () => runAction(LIVE_ACTION.START),
    onToggleRun: () =>
      runAction(isRunning ? LIVE_ACTION.PAUSE : LIVE_ACTION.RESUME),
    onEnd: confirmEnd,
    prepareOpened,
    openPrepare,
    closePrepare,
  };
};
