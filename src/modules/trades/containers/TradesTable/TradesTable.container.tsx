import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TradeFormModal } from "../../components";
import { getTradesTableColumns } from "../../const/tradesTableColumns.const";
import { useEditTradeForm, useTradesTable } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const TradesTableContainer = () => {
  const { t } = useTranslation("trades");
  const { records, totals, isLoading, hasActiveFilters, editingTrade, openEdit, closeEdit, requestDelete } =
    useTradesTable();
  const editForm = useEditTradeForm({ trade: editingTrade, onDone: closeEdit });

  return (
    <>
      <Paper withBorder p={0}>
        <DataTable
          minHeight={TABLE_MIN_HEIGHT}
          records={records}
          columns={getTradesTableColumns(t, totals, { onEdit: openEdit, onDelete: requestDelete })}
          fetching={isLoading}
          highlightOnHover
          onRowClick={({ record }) => openEdit(record.id)}
          noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
        />
      </Paper>
      <TradeFormModal
        {...editForm}
        opened={!!editingTrade}
        title={t("edit.title")}
        submitLabel={t("edit.submit")}
        onClose={closeEdit}
      />
    </>
  );
};
