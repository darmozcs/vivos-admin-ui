import type { OrderStatus } from "@/types";
import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  ORDER_STATUS_CHIP_COLORS,
  ORDER_STATUS_LABEL_KEYS,
} from "../../const/orderStatus.const";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge
      size="md"
      color={ORDER_STATUS_CHIP_COLORS[status]}
      autoContrast
      tt="none"
    >
      {t(ORDER_STATUS_LABEL_KEYS[status])}
    </Badge>
  );
};
