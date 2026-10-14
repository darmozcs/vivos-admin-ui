import { TradesSummaryCards } from "../../components";
import { useTradesSummary } from "../../hooks";

export const TradesSummaryContainer = () => {
  const summary = useTradesSummary();

  return <TradesSummaryCards {...summary} />;
};
