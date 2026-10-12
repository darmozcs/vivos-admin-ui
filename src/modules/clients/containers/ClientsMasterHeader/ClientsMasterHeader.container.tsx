import { PageHeader } from "@/modules/common/components";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ClientFormModal } from "../../components";
import { useClientsMasterHeader } from "../../hooks";

export const ClientsMasterHeaderContainer = () => {
  const { t } = useTranslation("clients");
  const { createOpened, openCreate, closeCreate, createForm } = useClientsMasterHeader();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")}>
        <Button leftSection={<IconPlus size={18} stroke={2.4} />} onClick={openCreate}>
          {t("create.button")}
        </Button>
      </PageHeader>
      <ClientFormModal
        opened={createOpened}
        title={t("create.title")}
        submitLabel={t("create.submit")}
        onClose={closeCreate}
        form={createForm.form}
        onSubmit={createForm.onSubmit}
        isLoading={createForm.isLoading}
      />
    </>
  );
};
