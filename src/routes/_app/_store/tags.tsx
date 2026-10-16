import { buildPageHead } from "@/libs/i18n/pageHead";
import { Tags } from "@/pages/Tags.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/tags")({
  head: () => buildPageHead("common:meta.tags.title", "common:meta.tags.description"),
  component: Tags,
});
