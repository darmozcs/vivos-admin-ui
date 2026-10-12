import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { getSalesTableColumns } from "../../const/salesTableColumns.const";
import { useSalesTable } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const SalesTableContainer = () => {
  const { t } = useTranslation("sales");
  const {
    records,
    isLoading,
    hasActiveFilters,
    updatingId,
    onStatusChange,
    onPackageStatusChange,
  } = useSalesTable();

  return (
    <Paper withBorder p={0}>
      <DataTable
        minHeight={TABLE_MIN_HEIGHT}
        records={records}
        columns={getSalesTableColumns(t, {
          updatingId,
          onStatusChange,
          onPackageStatusChange,
        })}
        fetching={isLoading}
        noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
      />
    </Paper>
  );
};
