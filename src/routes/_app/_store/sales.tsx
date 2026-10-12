import { buildPageHead } from "@/libs/i18n/pageHead";
import { Sales } from "@/pages/Sales.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/sales")({
  head: () => buildPageHead("common:meta.sales.title", "common:meta.sales.description"),
  component: Sales,
});
