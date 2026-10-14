import {
  SellersFiltersContainer,
  SellersMasterHeaderContainer,
  SellersTableContainer,
} from "@/modules/sellers/containers";
import { Stack } from "@mantine/core";

export const Sellers = () => {
  return (
    <Stack gap="lg">
      <SellersMasterHeaderContainer />
      <SellersFiltersContainer />
      <SellersTableContainer />
    </Stack>
  );
};
