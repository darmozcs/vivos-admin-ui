import { Stack } from "@mantine/core";
import { LiveEndedBanner, LiveStats } from "../../components";
import { useLiveStats } from "../../hooks";

export const LiveStatsContainer = () => {
  const { buyers, units, grandTotal, collected, ended, endSummary } = useLiveStats();

  return (
    <Stack gap="md">
      <LiveStats buyers={buyers} units={units} grandTotal={grandTotal} collected={collected} />
      {ended && <LiveEndedBanner summary={endSummary} />}
    </Stack>
  );
};
