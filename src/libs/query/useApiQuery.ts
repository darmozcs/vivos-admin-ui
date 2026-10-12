import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useApiQuery = <TData, TError = unknown>(options: UseQueryOptions<TData, TError>) =>
  useQuery({ retry: false, ...options });
