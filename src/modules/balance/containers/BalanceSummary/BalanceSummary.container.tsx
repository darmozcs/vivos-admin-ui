import { BalanceSummaryCards } from "../../components";
import { useBalanceSummary } from "../../hooks";

export const BalanceSummaryContainer = () => {
  const summary = useBalanceSummary();

  return <BalanceSummaryCards {...summary} />;
};
