import { SimpleGrid } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { StatCard } from "@/modules/common/components";
import { STAT_TONE } from "@/modules/common/const";

interface LiveStatsProps {
  buyers: number;
  units: number;
  grandTotal: string;
  /** Total of the paid sales; null hides the card. */
  collected: string | null;
}

export const LiveStats = ({ buyers, units, grandTotal, collected }: LiveStatsProps) => {
  const { t } = useTranslation("lives");

  return (
    <SimpleGrid
      component="section"
      aria-label={t("stats.ariaLabel")}
      cols={{ base: 1, xs: collected === null ? 3 : 2, lg: collected === null ? 3 : 4 }}
      spacing="md"
    >
      <StatCard label={t("stats.buyers")} value={buyers} tone={STAT_TONE.OUTLINE} />
      <StatCard label={t("stats.units")} value={units} tone={STAT_TONE.OUTLINE} />
      <StatCard label={t("stats.total")} value={grandTotal} tone={STAT_TONE.ACCENT} />
      {collected !== null && (
        <StatCard label={t("stats.collected")} value={collected} tone={STAT_TONE.DARK} />
      )}
    </SimpleGrid>
  );
};
