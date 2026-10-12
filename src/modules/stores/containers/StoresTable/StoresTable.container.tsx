import { DataTable } from "@/libs/ui/table";
import { Paper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ResetAdminPasswordModal, StoreFormModal, StoreNameField } from "../../components";
import { STORES_TABLE_MIN_HEIGHT } from "../../const/stores.const";
import { getStoresColumns } from "../../const/storesTableColumns.const";
import { useStoresTable } from "../../hooks";

export const StoresTableContainer = () => {
  const { t } = useTranslation("stores");
  const {
    records,
    isLoading,
    actions,
    editingStore,
    closeEdit,
    editForm,
    resettingStore,
    resetPasswordForm,
  } = useStoresTable();

  return (
    <>
      <Paper withBorder p={0}>
        <DataTable
          minHeight={STORES_TABLE_MIN_HEIGHT}
          records={records}
          columns={getStoresColumns(t, actions)}
          fetching={isLoading}
          highlightOnHover
          noRecordsText={t("empty")}
        />
      </Paper>
      <StoreFormModal
        opened={!!editingStore}
        title={t("edit.title")}
        submitLabel={t("edit.submit")}
        onClose={closeEdit}
        onSubmit={editForm.onSubmit}
        isLoading={editForm.isLoading}
      >
        <StoreNameField
          registration={editForm.form.register("name")}
          error={editForm.form.formState.errors.name?.message}
        />
      </StoreFormModal>
      <ResetAdminPasswordModal
        opened={!!resettingStore}
        adminEmail={resettingStore?.adminEmail ?? ""}
        onClose={resetPasswordForm.close}
        form={resetPasswordForm.form}
        onSubmit={resetPasswordForm.onSubmit}
        isLoading={resetPasswordForm.isLoading}
      />
    </>
  );
};
