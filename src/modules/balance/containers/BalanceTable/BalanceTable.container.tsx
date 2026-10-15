import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { getBalanceTableColumns } from "../../const/balanceTableColumns.const";
import { useBalanceTable } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const BalanceTableContainer = () => {
  const { t } = useTranslation("balance");
  const { records, totals, isLoading, hasActiveFilters } = useBalanceTable();

  return (
    <Paper withBorder p={0}>
      <DataTable
        minHeight={TABLE_MIN_HEIGHT}
        records={records}
        columns={getBalanceTableColumns(t, totals)}
        fetching={isLoading}
        noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
      />
    </Paper>
  );
};
