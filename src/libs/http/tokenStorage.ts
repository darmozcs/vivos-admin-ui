const ACCESS_TOKEN_KEY = "tienda-admin:access-token";
const REFRESH_TOKEN_KEY = "tienda-admin:refresh-token";

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Storage access can throw (private mode, blocked site data): treat it as "no session".
export const tokenStorage = {
  getAccess: () => read(ACCESS_TOKEN_KEY),
  getRefresh: () => read(REFRESH_TOKEN_KEY),
  setTokens: (access: string, refresh: string) => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    } catch {
      // The session simply won't survive a reload.
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch {
      // Nothing stored to clear.
    }
  },
};
