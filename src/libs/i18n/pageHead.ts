import { i18n } from "./index";

/** Builds TanStack Router `head` metadata from translation keys. */
export const buildPageHead = (titleKey: string, descriptionKey: string) => ({
  meta: [
    { title: `${i18n.t(titleKey)} · ${i18n.t("common:app.title")}` },
    { name: "description", content: i18n.t(descriptionKey) },
  ],
});
