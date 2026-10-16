import { useTagsQuery } from "@/DAL";
import type { Tag } from "@/models";
import { useMemo } from "react";
import type { SelectOption } from "../../utils/selectOptions.utils";

/** Store tags as select options, plus a lookup from ids to tags (kept in name order). */
export const useTagOptions = () => {
  const { data: tags = [] } = useTagsQuery();

  return useMemo(() => {
    const options: SelectOption[] = tags.map(({ id, name }) => ({ value: id, label: name }));
    // Ids of deleted tags are ignored.
    const tagsOf = (tagIds: string[]): Tag[] => tags.filter((tag) => tagIds.includes(tag.id));
    return { options, tagsOf };
  }, [tags]);
};
