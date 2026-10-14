import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { SellerFormModal } from "../../components";
import { getSellersTableColumns } from "../../const/sellersTableColumns.const";
import { useSellersTable, useEditSellerForm } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const SellersTableContainer = () => {
  const { t } = useTranslation("sellers");
  const {
    records,
    isLoading,
    hasActiveFilters,
    editingSeller,
    openEdit,
    closeEdit,
    requestDelete,
  } = useSellersTable();
  const editForm = useEditSellerForm({ seller: editingSeller, onDone: closeEdit });

  return (
    <>
      <Paper withBorder p={0}>
        <DataTable
          minHeight={TABLE_MIN_HEIGHT}
          records={records}
          columns={getSellersTableColumns(t, { onEdit: openEdit, onDelete: requestDelete })}
          fetching={isLoading}
          highlightOnHover
          onRowClick={({ record }) => openEdit(record.id)}
          noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
        />
      </Paper>
      <SellerFormModal
        opened={!!editingSeller}
        title={t("edit.title")}
        submitLabel={t("edit.submit")}
        onClose={closeEdit}
        form={editForm.form}
        onSubmit={editForm.onSubmit}
        isLoading={editForm.isLoading}
      />
    </>
  );
};
