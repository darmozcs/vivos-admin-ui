import type { PackageStatus } from "@/types";
import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  PACKAGE_STATUS_CHIP_COLORS,
  PACKAGE_STATUS_LABEL_KEYS,
} from "../../const/orderStatus.const";

interface PackageStatusBadgeProps {
  status: PackageStatus;
}

export const PackageStatusBadge = ({ status }: PackageStatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge size="md" color={PACKAGE_STATUS_CHIP_COLORS[status]} autoContrast tt="none">
      {t(PACKAGE_STATUS_LABEL_KEYS[status])}
    </Badge>
  );
};
