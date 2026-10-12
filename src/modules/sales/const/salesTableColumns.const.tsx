import type { DataTableColumn } from "@/libs/ui/table";
import {
  ORDER_STATUS_CHIP_COLORS,
  ORDER_STATUS_LABEL_KEYS,
  ORDER_STATUS_OPTIONS,
  PACKAGE_STATUS_CHIP_COLORS,
  PACKAGE_STATUS_LABEL_KEYS,
  PACKAGE_STATUS_OPTIONS,
} from "@/modules/common/const";
import type { OrderStatus, PackageStatus } from "@/types";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { StatusSelect } from "../components";
import type { SaleRow } from "../hooks";

interface SalesTableActions {
  updatingId?: string;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onPackageStatusChange: (id: string, status: PackageStatus) => void;
}

export const getSalesTableColumns = (
  t: TFunction,
  actions: SalesTableActions,
): DataTableColumn<SaleRow>[] => {
  const statusOptions = ORDER_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: t(ORDER_STATUS_LABEL_KEYS[status]),
    color: ORDER_STATUS_CHIP_COLORS[status],
  }));
  const packageOptions = PACKAGE_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: t(PACKAGE_STATUS_LABEL_KEYS[status]),
    color: PACKAGE_STATUS_CHIP_COLORS[status],
  }));

  return [
    {
      accessor: "saleNumber",
      title: t("columns.saleNumber"),
      width: 80,
      render: (sale) => (
        <Text size="sm" fw={700}>
          {sale.saleNumber}
        </Text>
      ),
    },
    { accessor: "createdAt", title: t("columns.createdAt"), width: 140 },
    { accessor: "updatedAt", title: t("columns.updatedAt"), width: 140 },
    { accessor: "liveTitle", title: t("columns.live"), width: 150 },
    { accessor: "clientName", title: t("columns.client"), width: 150 },
    { accessor: "units", title: t("columns.units"), width: 80, textAlign: "right" },
    { accessor: "total", title: t("columns.total"), width: 90, textAlign: "right" },
    {
      accessor: "status",
      title: t("columns.status"),
      width: 140,
      render: (sale) => (
        <StatusSelect
          value={sale.status}
          options={statusOptions}
          ariaLabel={t("columns.statusAria", { sale: sale.saleNumber })}
          disabled={actions.updatingId === sale.id}
          onChange={(value) => actions.onStatusChange(sale.id, value as OrderStatus)}
        />
      ),
    },
    {
      accessor: "packageStatus",
      title: t("columns.packageStatus"),
      width: 140,
      render: (sale) => (
        <StatusSelect
          value={sale.packageStatus}
          options={packageOptions}
          ariaLabel={t("columns.packageStatusAria", { sale: sale.saleNumber })}
          disabled={actions.updatingId === sale.id}
          onChange={(value) =>
            actions.onPackageStatusChange(sale.id, value as PackageStatus)
          }
        />
      ),
    },
  ];
};
