import { PageHeader } from "@/modules/common/components";
import {
  SalesFiltersContainer,
  SalesSummaryContainer,
  SalesTableContainer,
} from "@/modules/sales/containers";
import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Sales = () => {
  const { t } = useTranslation("sales");

  return (
    <Stack gap="lg">
      <PageHeader title={t("title")} description={t("description")} />
      <SalesFiltersContainer />
      <SalesSummaryContainer />
      <SalesTableContainer />
    </Stack>
  );
};
