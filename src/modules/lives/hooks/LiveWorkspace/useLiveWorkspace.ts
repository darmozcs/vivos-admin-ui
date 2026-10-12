import { useLiveWorkspaceStore } from "@/store";
import { useEffect } from "react";

interface UseLiveWorkspaceProps {
  liveId?: string;
}

/** Logic of the workspace provider: start clean every time another live is opened. */
export const useLiveWorkspace = ({ liveId }: UseLiveWorkspaceProps) => {
  const resetWorkspace = useLiveWorkspaceStore((state) => state.reset);

  useEffect(() => {
    resetWorkspace();
  }, [liveId, resetWorkspace]);

  return { liveId };
};
