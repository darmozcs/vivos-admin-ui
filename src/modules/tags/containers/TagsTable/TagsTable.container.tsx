import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TagFormModal } from "../../components";
import { getTagsTableColumns } from "../../const/tagsTableColumns.const";
import { useTagForm, useTagsTable } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const TagsTableContainer = () => {
  const { t } = useTranslation("tags");
  const { records, isLoading, editingTag, openEdit, closeEdit, requestDelete } = useTagsTable();
  const { close, ...editForm } = useTagForm({ tag: editingTag, onDone: closeEdit });

  return (
    <>
      <Paper withBorder p={0}>
        <DataTable
          minHeight={TABLE_MIN_HEIGHT}
          records={records}
          columns={getTagsTableColumns(t, { onEdit: openEdit, onDelete: requestDelete })}
          fetching={isLoading}
          highlightOnHover
          onRowClick={({ record }) => openEdit(record.id)}
          noRecordsText={t("empty")}
        />
      </Paper>
      <TagFormModal
        {...editForm}
        opened={!!editingTag}
        title={t("edit.title")}
        submitLabel={t("edit.submit")}
        onClose={close}
      />
    </>
  );
};
