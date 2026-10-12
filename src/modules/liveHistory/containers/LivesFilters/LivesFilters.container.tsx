import { LivesFiltersBar } from "../../components";
import { useLivesFilters } from "../../hooks";

export const LivesFiltersContainer = () => {
  const filtersBar = useLivesFilters();

  return <LivesFiltersBar {...filtersBar} />;
};
