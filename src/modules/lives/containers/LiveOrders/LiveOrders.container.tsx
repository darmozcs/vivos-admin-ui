import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LiveOrdersList, LivePanel } from "../../components";
import { useLiveOrders } from "../../hooks";

export const LiveOrdersContainer = () => {
  const { t } = useTranslation("lives");
  const { liveOrders, onEdit } = useLiveOrders();

  return (
    <LivePanel
      title={t("orders.title")}
      headerAside={
        <Text size="sm" c="dimmed">
          {t("orders.count", { count: liveOrders.length })}
        </Text>
      }
    >
      <LiveOrdersList orders={liveOrders} onEdit={onEdit} />
    </LivePanel>
  );
};
