import { SellersFiltersBar } from "../../components";
import { useSellersFilters } from "../../hooks";

export const SellersFiltersContainer = () => {
  const filtersBar = useSellersFilters();

  return <SellersFiltersBar {...filtersBar} />;
};
