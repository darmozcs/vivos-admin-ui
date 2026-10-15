import { StatCard } from "@/modules/common/components";
import { STAT_TONE } from "@/modules/common/const";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface BalanceSummaryCardsProps {
  isLoading: boolean;
  salesTotal: string;
  purchasesTotal: string;
  balance: string;
  quantity: string;
}

const SUMMARY_CARDS = 4;
const SKELETON_HEIGHT = 96;

export const BalanceSummaryCards = ({
  isLoading,
  salesTotal,
  purchasesTotal,
  balance,
  quantity,
}: BalanceSummaryCardsProps) => {
  const { t } = useTranslation("balance");

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, lg: SUMMARY_CARDS }} spacing="md" aria-busy={isLoading}>
      {isLoading ? (
        Array.from({ length: SUMMARY_CARDS }, (_, index) => (
          <Skeleton key={index} height={SKELETON_HEIGHT} radius="lg" />
        ))
      ) : (
        <>
          <StatCard label={t("summary.sales")} value={salesTotal} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.purchases")} value={purchasesTotal} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.quantity")} value={quantity} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.balance")} value={balance} tone={STAT_TONE.DARK} tabularNumbers />
        </>
      )}
    </SimpleGrid>
  );
};
