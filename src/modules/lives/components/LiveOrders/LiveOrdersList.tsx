import { EmptyState } from "@/modules/common/components";
import type { OrderStatus, PackageStatus } from "@/types";
import { ScrollArea, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LiveOrderCard } from "./LiveOrderCard";

interface LiveOrdersListEntry {
  clientId: string;
  clientName: string;
  total: string;
  summary: string;
  status: OrderStatus;
  packageStatus: PackageStatus;
  cancelled: boolean;
  selected: boolean;
}

interface LiveOrdersListProps {
  orders: LiveOrdersListEntry[];
  onEdit: (clientId: string) => void;
}

const LIST_MAX_HEIGHT = 600;

export const LiveOrdersList = ({ orders, onEdit }: LiveOrdersListProps) => {
  const { t } = useTranslation("lives");

  if (orders.length === 0) {
    return <EmptyState py="lg" message={t("orders.empty")} />;
  }

  return (
    <ScrollArea.Autosize mah={LIST_MAX_HEIGHT} type="auto" offsetScrollbars>
      <Stack gap="xs">
        {orders.map((order) => (
          <LiveOrderCard
            key={order.clientId}
            {...order}
            onEdit={() => onEdit(order.clientId)}
          />
        ))}
      </Stack>
    </ScrollArea.Autosize>
  );
};
