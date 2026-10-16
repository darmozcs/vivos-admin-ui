import { useTagsQuery } from "@/DAL";
import { useState } from "react";
import { useTagDelete } from "./useTagDelete";

export const useTagsTable = () => {
  const { data: tags = [], isLoading } = useTagsQuery();
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const { requestDelete } = useTagDelete();

  return {
    records: tags,
    isLoading,
    editingTag: tags.find((tag) => tag.id === editingTagId) ?? null,
    openEdit: setEditingTagId,
    closeEdit: () => setEditingTagId(null),
    requestDelete,
  };
};
