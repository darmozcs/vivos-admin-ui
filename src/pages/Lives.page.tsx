import { PageHeader } from "@/modules/common/components";
import {
  LivesFiltersContainer,
  LivesSummaryContainer,
  LivesTableContainer,
} from "@/modules/liveHistory/containers";
import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Lives = () => {
  const { t } = useTranslation("liveHistory");

  return (
    <Stack gap="lg">
      <PageHeader title={t("title")} description={t("description")} />
      <LivesFiltersContainer />
      <LivesSummaryContainer />
      <LivesTableContainer />
    </Stack>
  );
};
