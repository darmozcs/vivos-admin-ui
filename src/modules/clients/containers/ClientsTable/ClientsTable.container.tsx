import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ClientFormModal } from "../../components";
import { getClientsTableColumns } from "../../const/clientsTableColumns.const";
import { useClientsTable, useEditClientForm } from "../../hooks";

const TABLE_MIN_HEIGHT = 200;

export const ClientsTableContainer = () => {
  const { t } = useTranslation("clients");
  const {
    records,
    isLoading,
    hasActiveFilters,
    editingClient,
    openEdit,
    closeEdit,
    requestDelete,
  } = useClientsTable();
  const editForm = useEditClientForm({ client: editingClient, onDone: closeEdit });

  return (
    <>
      <Paper withBorder p={0}>
        <DataTable
          minHeight={TABLE_MIN_HEIGHT}
          records={records}
          columns={getClientsTableColumns(t, { onEdit: openEdit, onDelete: requestDelete })}
          fetching={isLoading}
          highlightOnHover
          onRowClick={({ record }) => openEdit(record.id)}
          noRecordsText={hasActiveFilters ? t("filters.noResults") : t("common:table.empty")}
        />
      </Paper>
      <ClientFormModal
        opened={!!editingClient}
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
