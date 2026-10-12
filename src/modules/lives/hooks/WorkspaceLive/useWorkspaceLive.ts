import { useCurrentLiveQuery, useLiveQuery } from "@/DAL";
import { getErrorStatus, HTTP_STATUS } from "@/libs/http";
import type { Live } from "@/models";
import { useLiveWorkspaceContext } from "../../contexts/liveWorkspace.context";

/**
 * Live shown in the workspace: the one opened from the history, or the
 * current live when the workspace is opened from "Comenzar vivo".
 */
export const useWorkspaceLive = () => {
  const { liveId } = useLiveWorkspaceContext();
  const current = useCurrentLiveQuery({ enabled: !liveId });
  const selected = useLiveQuery(liveId);
  const query = liveId ? selected : current;
  // vivos-be answers 404 on /lives/current while the store has no lives yet.
  const noCurrentLive =
    !liveId && getErrorStatus(current.error) === HTTP_STATUS.NOT_FOUND;

  return {
    data: query.data as Live | undefined,
    isLoading: query.isLoading,
    isError: query.isError && !noCurrentLive,
    noCurrentLive,
    /** True when the workspace was opened from the lives history. */
    fromHistory: !!liveId,
  };
};
