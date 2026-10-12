import { SalesFiltersBar } from "../../components";
import { useSalesFilters } from "../../hooks";

export const SalesFiltersContainer = () => {
  const filtersBar = useSalesFilters();

  return <SalesFiltersBar {...filtersBar} />;
};
