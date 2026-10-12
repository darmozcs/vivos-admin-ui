import { buildPageHead } from "@/libs/i18n/pageHead";
import { LiveWorkspace } from "@/pages/LiveWorkspace.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/live")({
  head: () => buildPageHead("common:meta.live.title", "common:meta.live.description"),
  component: LiveWorkspace,
});
