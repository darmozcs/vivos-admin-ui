import { buildPageHead } from "@/libs/i18n/pageHead";
import { LiveWorkspace } from "@/pages/LiveWorkspace.page";
import { createFileRoute } from "@tanstack/react-router";

const LiveDetailRoute = () => {
  const { liveId } = Route.useParams();
  return <LiveWorkspace liveId={liveId} />;
};

export const Route = createFileRoute("/_app/_store/lives/$liveId")({
  head: () =>
    buildPageHead("common:meta.liveDetail.title", "common:meta.liveDetail.description"),
  component: LiveDetailRoute,
});
