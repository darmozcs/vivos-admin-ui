import { StatCard } from "@/modules/common/components";
import { STAT_TONE } from "@/modules/common/const";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface LivesSummaryProps {
  isLoading: boolean;
  lives: number;
  buyers: number;
  units: number;
  total: string;
}

const SUMMARY_CARDS = 4;
const SKELETON_HEIGHT = 96;

export const LivesSummary = ({ isLoading, lives, buyers, units, total }: LivesSummaryProps) => {
  const { t } = useTranslation("liveHistory");

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, lg: SUMMARY_CARDS }} spacing="md" aria-busy={isLoading}>
      {isLoading ? (
        Array.from({ length: SUMMARY_CARDS }, (_, index) => (
          <Skeleton key={index} height={SKELETON_HEIGHT} radius="lg" />
        ))
      ) : (
        <>
          <StatCard label={t("summary.lives")} value={lives} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.buyers")} value={buyers} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.units")} value={units} tone={STAT_TONE.OUTLINE} tabularNumbers />
          <StatCard label={t("summary.total")} value={total} tone={STAT_TONE.DARK} tabularNumbers />
        </>
      )}
    </SimpleGrid>
  );
};
