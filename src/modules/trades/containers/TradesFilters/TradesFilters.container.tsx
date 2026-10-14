import { TradesFiltersBar } from "../../components";
import { useTradesFilters } from "../../hooks";

export const TradesFiltersContainer = () => {
  const filtersBar = useTradesFilters();

  return <TradesFiltersBar {...filtersBar} />;
};
