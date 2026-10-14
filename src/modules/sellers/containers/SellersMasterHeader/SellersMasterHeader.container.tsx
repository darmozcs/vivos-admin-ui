import { PageHeader } from "@/modules/common/components";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { SellerFormModal } from "../../components";
import { useSellersMasterHeader } from "../../hooks";

export const SellersMasterHeaderContainer = () => {
  const { t } = useTranslation("sellers");
  const { createOpened, openCreate, closeCreate, createForm } = useSellersMasterHeader();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")}>
        <Button leftSection={<IconPlus size={18} stroke={2.4} />} onClick={openCreate}>
          {t("create.button")}
        </Button>
      </PageHeader>
      <SellerFormModal
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
