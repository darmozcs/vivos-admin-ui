import type { DataTableColumn } from "@/libs/ui/table";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { SellerRowActions } from "../components";
import type { SellerRow } from "../hooks";

interface SellersTableActions {
  onEdit: (sellerId: string) => void;
  onDelete: (seller: SellerRow) => void;
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

export const getSellersTableColumns = (
  t: TFunction,
  actions: SellersTableActions,
): DataTableColumn<SellerRow>[] => [
  { accessor: "fullName", title: t("columns.fullName"), width: 200 },
  { accessor: "account", title: t("columns.account"), width: 150 },
  { accessor: "phone", title: t("columns.phone"), width: 130 },
  {
    accessor: "address",
    title: t("columns.address"),
    width: 260,
    render: (seller) =>
      seller.address ? (
        <Text size="sm" lineClamp={2}>
          {seller.address}
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
    render: (seller) => renderOptional(t, seller.department && t(`common:department.${seller.department}`)),
  },
  {
    accessor: "deliveryType",
    title: t("columns.deliveryType"),
    width: 130,
    render: (seller) =>
      renderOptional(t, seller.deliveryType && t(`common:deliveryType.${seller.deliveryType}`)),
  },
  {
    accessor: "actions",
    title: "",
    width: 96,
    textAlign: "center",
    render: (seller) => (
      <SellerRowActions
        fullName={seller.fullName}
        canDelete={seller.canDelete}
        onEdit={() => actions.onEdit(seller.id)}
        onDelete={() => actions.onDelete(seller)}
      />
    ),
  },
];
