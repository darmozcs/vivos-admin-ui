import { SalesSummary } from "../../components";
import { useSalesSummary } from "../../hooks";

export const SalesSummaryContainer = () => {
  const summary = useSalesSummary();

  return <SalesSummary {...summary} />;
};
