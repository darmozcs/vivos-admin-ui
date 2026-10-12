import { create } from "zustand";

interface LiveWorkspaceState {
  /** Client whose order is being edited in the live workspace. */
  selectedClientId: string | null;
  /** Timestamp (ms) of the last successful save in the live workspace. */
  lastSavedAt: number | null;
  selectClient: (clientId: string | null) => void;
  markSaved: () => void;
  reset: () => void;
}

const INITIAL_STATE = {
  selectedClientId: null,
  lastSavedAt: null,
};

export const useLiveWorkspaceStore = create<LiveWorkspaceState>((set) => ({
  ...INITIAL_STATE,
  selectClient: (selectedClientId) => set({ selectedClientId }),
  markSaved: () => set({ lastSavedAt: Date.now() }),
  reset: () => set(INITIAL_STATE),
}));
