import { EmptyState } from "@/modules/common/components";
import { Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const NoClientSelected = () => {
  const { t } = useTranslation("lives");

  return (
    <Stack gap="md">
      <Title order={2}>{t("editor.emptyTitle")}</Title>
      <EmptyState py={48} message={t("editor.emptyMessage")} />
    </Stack>
  );
};
