import { buildPageHead } from "@/libs/i18n/pageHead";
import { Lives } from "@/pages/Lives.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_store/lives/")({
  head: () => buildPageHead("common:meta.lives.title", "common:meta.lives.description"),
  component: Lives,
});
