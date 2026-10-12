import {
  StoresMasterHeaderContainer,
  StoresTableContainer,
} from "@/modules/stores/containers";
import { Stack } from "@mantine/core";

export const Stores = () => {
  return (
    <Stack gap="lg">
      <StoresMasterHeaderContainer />
      <StoresTableContainer />
    </Stack>
  );
};
