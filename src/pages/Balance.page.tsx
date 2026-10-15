import {
  BalanceFiltersContainer,
  BalanceHeaderContainer,
  BalanceSummaryContainer,
  BalanceTableContainer,
} from "@/modules/balance/containers";
import { Stack } from "@mantine/core";

export const Balance = () => {
  return (
    <Stack gap="lg">
      <BalanceHeaderContainer />
      <BalanceSummaryContainer />
      <BalanceFiltersContainer />
      <BalanceTableContainer />
    </Stack>
  );
};
