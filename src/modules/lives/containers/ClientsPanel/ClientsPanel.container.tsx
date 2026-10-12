import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import {
  ClientList,
  ClientSearchInput,
  LivePanel,
  NewClientForm,
} from "../../components";
import { useClientsPanel } from "../../hooks";

export const ClientsPanelContainer = () => {
  const { t } = useTranslation("lives");
  const panel = useClientsPanel();

  return (
    <LivePanel
      title={t("clients.title")}
      headerAside={
        <Button
          size="sm"
          leftSection={<IconPlus size={16} stroke={2.4} />}
          onClick={panel.openNew}
        >
          {t("clients.new")}
        </Button>
      }
    >
      <ClientSearchInput value={panel.search} onChange={panel.setSearch} />
      {panel.newOpened && (
        <NewClientForm
          form={panel.newClientForm.form}
          onSubmit={panel.newClientForm.onSubmit}
          onCancel={panel.closeNew}
          isLoading={panel.newClientForm.isLoading}
        />
      )}
      <ClientList
        items={panel.items}
        search={panel.search.trim()}
        showNoResults={panel.showNoResults}
        onSelect={panel.onSelect}
        onCreateFromSearch={panel.openNewFromSearch}
      />
    </LivePanel>
  );
};
