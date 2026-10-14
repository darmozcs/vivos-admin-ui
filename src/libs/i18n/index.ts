import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const DEFAULT_NAMESPACE = "common";
export const SUPPORTED_LANGUAGES = ["es", "en"] as const;

/** Resolves once the initial namespaces are loaded. */
export const i18nReady = i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: DEFAULT_NAMESPACE,
    ns: [
      DEFAULT_NAMESPACE,
      "auth",
      "settings",
      "lives",
      "liveHistory",
      "clients",
      "sellers",
      "trades",
      "sales",
      "stores",
    ],
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
