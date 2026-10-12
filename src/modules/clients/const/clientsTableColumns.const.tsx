import type { DataTableColumn } from "@/libs/ui/table";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { ClientRowActions } from "../components";
import type { ClientRow } from "../hooks";

interface ClientsTableActions {
  onEdit: (clientId: string) => void;
  onDelete: (client: ClientRow) => void;
}

/** Optional values (department, delivery type) show a dimmed placeholder when missing. */
const renderOptional = (t: TFunction, value: string | null) =>
  value ? (
    <Text size="sm">{value}</Text>
  ) : (
    <Text size="sm" c="dimmed">
      {t("columns.notSet")}
    </Text>
  );

export const getClientsTableColumns = (
  t: TFunction,
  actions: ClientsTableActions,
): DataTableColumn<ClientRow>[] => [
  { accessor: "fullName", title: t("columns.fullName"), width: 200 },
  { accessor: "account", title: t("columns.account"), width: 150 },
  { accessor: "phone", title: t("columns.phone"), width: 130 },
  {
    accessor: "address",
    title: t("columns.address"),
    width: 260,
    render: (client) =>
      client.address ? (
        <Text size="sm" lineClamp={2}>
          {client.address}
        </Text>
      ) : (
        <Text size="sm" c="dimmed">
          {t("columns.noAddress")}
        </Text>
      ),
  },
  {
    accessor: "department",
    title: t("columns.department"),
    width: 150,
    render: (client) => renderOptional(t, client.department && t(`common:department.${client.department}`)),
  },
  {
    accessor: "deliveryType",
    title: t("columns.deliveryType"),
    width: 130,
    render: (client) =>
      renderOptional(t, client.deliveryType && t(`common:deliveryType.${client.deliveryType}`)),
  },
  {
    accessor: "actions",
    title: "",
    width: 96,
    textAlign: "center",
    render: (client) => (
      <ClientRowActions
        fullName={client.fullName}
        canDelete={client.canDelete}
        onEdit={() => actions.onEdit(client.id)}
        onDelete={() => actions.onDelete(client)}
      />
    ),
  },
];
