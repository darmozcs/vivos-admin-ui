import { StatCard } from "@/modules/common/components";
import { STAT_TONE } from "@/modules/common/const";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SalesSummaryProps {
  isLoading: boolean;
  orders: number;
  units: number;
  total: string;
}

const SUMMARY_CARDS = 3;
const SKELETON_HEIGHT = 96;

export const SalesSummary = ({ isLoading, orders, units, total }: SalesSummaryProps) => {
  const { t } = useTranslation("sales");

  return (
    <SimpleGrid cols={{ base: 1, sm: SUMMARY_CARDS }} spacing="md" aria-busy={isLoading}>
      {isLoading ? (
        Array.from({ length: SUMMARY_CARDS }, (_, index) => (
          <Skeleton key={index} height={SKELETON_HEIGHT} radius="lg" />
        ))
      ) : (
        <>
          <StatCard label={t("summary.orders")} value={orders} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.units")} value={units} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.total")} value={total} tone={STAT_TONE.DARK} tabularNumbers />
        </>
      )}
    </SimpleGrid>
  );
};
