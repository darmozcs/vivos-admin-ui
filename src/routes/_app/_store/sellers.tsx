import { buildPageHead } from "@/libs/i18n/pageHead";
import { Sellers } from "@/pages/Sellers.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/sellers")({
  head: () => buildPageHead("common:meta.sellers.title", "common:meta.sellers.description"),
  component: Sellers,
});
