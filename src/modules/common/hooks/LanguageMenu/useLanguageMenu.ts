import { SUPPORTED_LANGUAGES } from "@/libs/i18n";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useLanguageMenu = () => {
  const { i18n, t } = useTranslation("common");

  const currentLanguageLabel = t(`languages.${i18n.language}`);
  const currentLanguageCode = i18n.language.toUpperCase();

  const data = useMemo(
    () =>
      SUPPORTED_LANGUAGES.filter((lang) => lang !== i18n.language).map(
        (lang) => ({ value: lang, label: t(`languages.${lang}`) }),
      ),
    [i18n.language, t],
  );

  const handleChange = useCallback(
    (value: string) => {
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(value)) {
        void i18n.changeLanguage(value);
      }
    },
    [i18n],
  );

  return { data, currentLanguageLabel, currentLanguageCode, handleChange };
};
