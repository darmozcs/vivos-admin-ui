import { buildPageHead } from "@/libs/i18n/pageHead";
import { Settings } from "@/pages/Settings.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/settings")({
  head: () =>
    buildPageHead("common:meta.settings.title", "common:meta.settings.description"),
  component: Settings,
});
