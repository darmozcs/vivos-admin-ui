import { TAG_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs/query";
import type { Tag } from "@/models";
import { getTagsService } from "../services/tag.service";

export const useTagsQuery = () => {
  return useApiQuery<Tag[]>({
    queryKey: [TAG_LIST],
    queryFn: async () => (await getTagsService()).data,
  });
};
