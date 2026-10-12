import { PageHeader } from "@/modules/common/components";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { StoreAdminFields, StoreFormModal, StoreNameField } from "../../components";
import { useStoresMasterHeader } from "../../hooks";

export const StoresMasterHeaderContainer = () => {
  const { t } = useTranslation("stores");
  const { createOpened, openCreate, closeCreate, createForm } = useStoresMasterHeader();
  const { form } = createForm;

  return (
    <>
      <PageHeader title={t("title")} description={t("description")}>
        <Button leftSection={<IconPlus size={18} stroke={2.4} />} onClick={openCreate}>
          {t("create.button")}
        </Button>
      </PageHeader>
      <StoreFormModal
        opened={createOpened}
        title={t("create.title")}
        submitLabel={t("create.submit")}
        onClose={closeCreate}
        onSubmit={createForm.onSubmit}
        isLoading={createForm.isLoading}
      >
        <StoreNameField
          registration={form.register("name")}
          error={form.formState.errors.name?.message}
        />
        <StoreAdminFields form={form} />
      </StoreFormModal>
    </>
  );
};
