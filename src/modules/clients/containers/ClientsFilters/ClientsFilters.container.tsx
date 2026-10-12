import { ClientsFiltersBar } from "../../components";
import { useClientsFilters } from "../../hooks";

export const ClientsFiltersContainer = () => {
  const filtersBar = useClientsFilters();

  return <ClientsFiltersBar {...filtersBar} />;
};
