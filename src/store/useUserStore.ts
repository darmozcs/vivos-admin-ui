import { create } from "zustand";

interface UserState {
  userId: string | null;
  email: string | null;
  roles: string[];
  setUser: (data: Pick<UserState, "userId" | "email" | "roles">) => void;
  clearUser: () => void;
}

const INITIAL_STATE = {
  userId: null,
  email: null,
  roles: [],
};

/** Signed-in user, filled from the login / verify responses. */
export const useUserStore = create<UserState>((set) => ({
  ...INITIAL_STATE,
  setUser: (data) => set(data),
  clearUser: () => set(INITIAL_STATE),
}));
