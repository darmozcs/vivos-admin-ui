import { PageHeader } from "@/modules/common/components";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TradeFormModal } from "../../components";
import { useTradesMasterHeader } from "../../hooks";

export const TradesMasterHeaderContainer = () => {
  const { t } = useTranslation("trades");
  const { createOpened, openCreate, closeCreate, createForm } = useTradesMasterHeader();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")}>
        <Button leftSection={<IconPlus size={18} stroke={2.4} />} onClick={openCreate}>
          {t("create.button")}
        </Button>
      </PageHeader>
      <TradeFormModal
        {...createForm}
        opened={createOpened}
        title={t("create.title")}
        submitLabel={t("create.submit")}
        onClose={closeCreate}
      />
    </>
  );
};
