import {
  TradesFiltersContainer,
  TradesMasterHeaderContainer,
  TradesSummaryContainer,
  TradesTableContainer,
} from "@/modules/trades/containers";
import { Stack } from "@mantine/core";

export const Trades = () => {
  return (
    <Stack gap="lg">
      <TradesMasterHeaderContainer />
      <TradesSummaryContainer />
      <TradesFiltersContainer />
      <TradesTableContainer />
    </Stack>
  );
};
