import { PageHeader } from "@/modules/common/components";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TagFormModal } from "../../components";
import { useTagsMasterHeader } from "../../hooks";

export const TagsMasterHeaderContainer = () => {
  const { t } = useTranslation("tags");
  const { createOpened, openCreate, closeCreate, createForm } = useTagsMasterHeader();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")}>
        <Button leftSection={<IconPlus size={18} stroke={2.4} />} onClick={openCreate}>
          {t("create.button")}
        </Button>
      </PageHeader>
      <TagFormModal
        {...createForm}
        opened={createOpened}
        title={t("create.title")}
        submitLabel={t("create.submit")}
        onClose={closeCreate}
      />
    </>
  );
};
