import { i18n } from "@/libs/i18n";
import { queryClient } from "@/libs/query";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
// English is built into dayjs; the other supported languages are loaded here.
import "dayjs/locale/es";

interface AppProvidersProps {
  children: React.ReactNode;
}

const ModalsProviderWithLabels = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("common");

  return (
    <ModalsProvider
      labels={{
        confirm: t("modals.labels.confirm", "Confirm"),
        cancel: t("modals.labels.cancel", "Cancel"),
      }}
      modalProps={{ centered: true }}
    >
      {children}
    </ModalsProvider>
  );
};

/** Date pickers follow the active i18n language (month and weekday names). */
const DatesProviderWithLocale = ({ children }: PropsWithChildren) => {
  const { i18n: activeI18n } = useTranslation();

  return (
    <DatesProvider settings={{ locale: activeI18n.resolvedLanguage ?? activeI18n.language }}>
      {children}
    </DatesProvider>
  );
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <I18nextProvider i18n={i18n}>
          <DatesProviderWithLocale>
            <ModalsProviderWithLabels>
              <Notifications position="top-right" />
              {children}
            </ModalsProviderWithLabels>
          </DatesProviderWithLocale>
        </I18nextProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
