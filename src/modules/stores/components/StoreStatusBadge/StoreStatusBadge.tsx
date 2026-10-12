import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { STORE_STATUS_BADGE } from "../../const/stores.const";

interface StoreStatusBadgeProps {
  active: boolean;
}

export const StoreStatusBadge = ({ active }: StoreStatusBadgeProps) => {
  const { t } = useTranslation("stores");
  const badge = active ? STORE_STATUS_BADGE.ACTIVE : STORE_STATUS_BADGE.INACTIVE;

  return (
    <Badge size="md" color={badge.color} autoContrast tt="none">
      {t(badge.labelKey)}
    </Badge>
  );
};
