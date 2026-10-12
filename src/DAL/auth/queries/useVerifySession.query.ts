import { AUTH_SESSION_DETAIL } from "@/DAL/const";
import { tokenStorage } from "@/libs/http";
import { useApiQuery } from "@/libs/query";
import type { VerifyResponse } from "@/models";
import { verifyService } from "../services/auth.service";

/** Validates the stored access token with darmoz-auth; only runs with a token. */
export const useVerifySessionQuery = () => {
  return useApiQuery<VerifyResponse>({
    queryKey: [AUTH_SESSION_DETAIL],
    queryFn: async () => (await verifyService()).data,
    enabled: !!tokenStorage.getAccess(),
    staleTime: Infinity,
  });
};
