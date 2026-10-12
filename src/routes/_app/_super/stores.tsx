import { buildPageHead } from "@/libs/i18n/pageHead";
import { Stores } from "@/pages/Stores.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_super/stores")({
  head: () => buildPageHead("common:meta.stores.title", "common:meta.stores.description"),
  component: Stores,
});
