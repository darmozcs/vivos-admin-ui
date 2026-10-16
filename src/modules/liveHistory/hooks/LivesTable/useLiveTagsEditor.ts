import { useUpdateLiveTagsMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { useTagOptions } from "@/modules/common/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/** One live at a time can have its tags popover open in the history table. */
export const useLiveTagsEditor = () => {
  const { t } = useTranslation("liveHistory");
  const updateTags = useUpdateLiveTagsMutation();
  const { options } = useTagOptions();
  const [editing, setEditing] = useState<{ liveId: string; tagIds: string[] } | null>(null);

  const close = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    updateTags.mutate(
      { id: editing.liveId, tagIds: editing.tagIds },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: t("common:notifications.successTitle"),
            message: t("tags.success"),
          });
          close();
        },
        onError: (error) =>
          notifications.show({
            color: "red",
            title: t("common:notifications.errorTitle"),
            message: extractErrorMessage(error, t("tags.error")),
          }),
      },
    );
  };

  /** Props of the tags cell of one row. */
  const cellProps = (liveId: string, tagIds: string[]) => ({
    opened: editing?.liveId === liveId,
    value: editing?.liveId === liveId ? editing.tagIds : tagIds,
    options,
    isSaving: updateTags.isPending,
    onOpen: () => setEditing({ liveId, tagIds }),
    onClose: close,
    onChange: (next: string[]) => setEditing({ liveId, tagIds: next }),
    onSave: save,
  });

  return { cellProps };
};
