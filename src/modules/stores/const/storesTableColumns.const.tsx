import { formatDate } from "@/libs/format";
import type { DataTableColumn } from "@/libs/ui/table";
import type { Store } from "@/models";
import type { TFunction } from "i18next";
import { EmailVerifiedBadge, StoreRowActions, StoreStatusBadge } from "../components";

export interface StoresTableActions {
  onEdit: (storeId: string) => void;
  onToggleActive: (store: Store) => void;
  onResetPassword: (storeId: string) => void;
  onResendVerification: (store: Store) => void;
  resendingStoreId: string | undefined;
}

export const getStoresColumns = (
  t: TFunction,
  actions: StoresTableActions,
): DataTableColumn<Store>[] => [
  { accessor: "name", title: t("columns.name"), width: 220 },
  { accessor: "adminEmail", title: t("columns.adminEmail"), width: 240 },
  {
    accessor: "adminEmailVerified",
    title: t("columns.emailStatus"),
    width: 140,
    render: (store) => <EmailVerifiedBadge verified={store.adminEmailVerified} />,
  },
  {
    accessor: "active",
    title: t("columns.status"),
    width: 120,
    render: (store) => <StoreStatusBadge active={store.active} />,
  },
  {
    accessor: "createdAt",
    title: t("columns.createdAt"),
    width: 130,
    render: (store) => formatDate(store.createdAt),
  },
  {
    accessor: "actions",
    title: "",
    width: 190,
    textAlign: "center",
    render: (store) => (
      <StoreRowActions
        name={store.name}
        active={store.active}
        canResendVerification={!store.adminEmailVerified}
        isResending={actions.resendingStoreId === store.id}
        onEdit={() => actions.onEdit(store.id)}
        onToggleActive={() => actions.onToggleActive(store)}
        onResetPassword={() => actions.onResetPassword(store.id)}
        onResendVerification={() => actions.onResendVerification(store)}
      />
    ),
  },
];
