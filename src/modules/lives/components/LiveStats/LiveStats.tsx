import { SimpleGrid } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { StatCard } from "@/modules/common/components";
import { STAT_TONE } from "@/modules/common/const";

interface LiveStatsProps {
  clock: string;
  buyers: number;
  grandTotal: string;
  units: number;
}

export const LiveStats = ({ clock, buyers, grandTotal, units }: LiveStatsProps) => {
  const { t } = useTranslation("lives");

  return (
    <SimpleGrid
      component="section"
      aria-label={t("stats.ariaLabel")}
      cols={{ base: 1, xs: 2, lg: 4 }}
      spacing="md"
    >
      <StatCard label={t("stats.duration")} value={clock} tone={STAT_TONE.DARK} tabularNumbers />
      <StatCard label={t("stats.buyers")} value={buyers} tone={STAT_TONE.OUTLINE} />
      <StatCard label={t("stats.total")} value={grandTotal} tone={STAT_TONE.ACCENT} />
      <StatCard label={t("stats.units")} value={units} tone={STAT_TONE.OUTLINE} />
    </SimpleGrid>
  );
};
