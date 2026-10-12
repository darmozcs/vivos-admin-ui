import {
  ClientsFiltersContainer,
  ClientsMasterHeaderContainer,
  ClientsTableContainer,
} from "@/modules/clients/containers";
import { Stack } from "@mantine/core";

export const Clients = () => {
  return (
    <Stack gap="lg">
      <ClientsMasterHeaderContainer />
      <ClientsFiltersContainer />
      <ClientsTableContainer />
    </Stack>
  );
};
