import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { getLivesTableColumns } from "../../const/livesTableColumns.const";
import { useLiveTagsEditor, useLivesTable } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const LivesTableContainer = () => {
  const { t } = useTranslation("liveHistory");
  const { records, isLoading, hasActiveFilters, openLive, requestDelete } = useLivesTable();
  const { cellProps } = useLiveTagsEditor();

  return (
    <Paper withBorder p={0}>
      <DataTable
        minHeight={TABLE_MIN_HEIGHT}
        records={records}
        columns={getLivesTableColumns(t, { onDelete: requestDelete, tagsCellProps: cellProps })}
        fetching={isLoading}
        highlightOnHover
        onRowClick={({ record }) => openLive(record.id)}
        noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
      />
    </Paper>
  );
};
