import { buildPageHead } from "@/libs/i18n/pageHead";
import { Trades } from "@/pages/Trades.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/movimientos")({
  head: () => buildPageHead("common:meta.trades.title", "common:meta.trades.description"),
  component: Trades,
});
