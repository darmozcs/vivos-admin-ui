import { BalanceFiltersBar } from "../../components";
import { useBalanceFilters } from "../../hooks";

export const BalanceFiltersContainer = () => {
  const filtersBar = useBalanceFilters();

  return <BalanceFiltersBar {...filtersBar} />;
};
