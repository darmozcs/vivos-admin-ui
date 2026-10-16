import { BALANCE_DETAIL, LIVE_LIST, TAG_LIST, TRADE_LIST } from "@/DAL/const";
import { useQueryClient } from "@tanstack/react-query";

/** Deleting a tag also removes it from lives and movements, so those lists are refreshed too. */
export const useInvalidateTags = () => {
  const queryClient = useQueryClient();

  return async () => {
    await Promise.all(
      [TAG_LIST, TRADE_LIST, LIVE_LIST, BALANCE_DETAIL].map((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      ),
    );
  };
};
