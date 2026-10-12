import { LivesSummary } from "../../components";
import { useLivesSummary } from "../../hooks";

export const LivesSummaryContainer = () => {
  const summary = useLivesSummary();

  return <LivesSummary {...summary} />;
};
