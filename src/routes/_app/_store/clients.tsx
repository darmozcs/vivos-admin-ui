import { buildPageHead } from "@/libs/i18n/pageHead";
import { Clients } from "@/pages/Clients.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/clients")({
  head: () => buildPageHead("common:meta.clients.title", "common:meta.clients.description"),
  component: Clients,
});
