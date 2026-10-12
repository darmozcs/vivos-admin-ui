import { Stack } from "@mantine/core";
import { LiveEndedBanner, LiveStats } from "../../components";
import { useLiveStats } from "../../hooks";

export const LiveStatsContainer = () => {
  const { clock, buyers, units, grandTotal, ended, endSummary } = useLiveStats();

  return (
    <Stack gap="md">
      <LiveStats clock={clock} buyers={buyers} grandTotal={grandTotal} units={units} />
      {ended && <LiveEndedBanner summary={endSummary} />}
    </Stack>
  );
};
