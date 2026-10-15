import { buildPageHead } from "@/libs/i18n/pageHead";
import { Balance } from "@/pages/Balance.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/balance")({
  head: () => buildPageHead("common:meta.balance.title", "common:meta.balance.description"),
  component: Balance,
});
