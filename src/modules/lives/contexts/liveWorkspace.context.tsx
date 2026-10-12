import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useLiveWorkspace } from "../hooks/LiveWorkspace/useLiveWorkspace";

interface LiveWorkspaceContextValue {
  /** Live opened from the history; undefined means the current live. */
  liveId?: string;
}

const LiveWorkspaceContext = createContext<LiveWorkspaceContextValue | undefined>(
  undefined,
);

export const LiveWorkspaceProvider = ({
  liveId,
  children,
}: {
  liveId?: string;
  children: ReactNode;
}) => {
  const value = useLiveWorkspace({ liveId });

  return (
    <LiveWorkspaceContext.Provider value={value}>
      {children}
    </LiveWorkspaceContext.Provider>
  );
};

export const useLiveWorkspaceContext = () => {
  const context = useContext(LiveWorkspaceContext);

  if (!context) {
    throw new Error(
      "useLiveWorkspaceContext must be used within LiveWorkspaceProvider",
    );
  }

  return context;
};
