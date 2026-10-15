import { PageHeader } from "@/modules/common/components";
import { useTranslation } from "react-i18next";

export const BalanceHeaderContainer = () => {
  const { t } = useTranslation("balance");

  return <PageHeader title={t("title")} description={t("description")} />;
};
