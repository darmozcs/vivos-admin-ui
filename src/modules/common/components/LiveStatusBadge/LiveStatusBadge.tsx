import type { LiveStatus } from "@/types";
import { Badge, Box, type BadgeProps } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LIVE_STATUS_BADGE } from "../../const/live.const";

interface LiveStatusBadgeProps {
  status: LiveStatus;
  size?: BadgeProps["size"];
}

const DOT_SIZE = 10;
const LARGE_SIZE = "xl";

export const LiveStatusBadge = ({ status, size = LARGE_SIZE }: LiveStatusBadgeProps) => {
  const { t } = useTranslation();
  const config = LIVE_STATUS_BADGE[status];

  return (
    <Badge
      color={config.color}
      autoContrast
      size={size}
      fz={size === LARGE_SIZE ? "sm" : undefined}
      leftSection={
        <Box
          w={DOT_SIZE}
          h={DOT_SIZE}
          bdrs="50%"
          bg={config.dot.filled ? config.dot.color : undefined}
          bd={config.dot.filled ? undefined : `2px solid ${config.dot.color}`}
        />
      }
    >
      {t(config.labelKey)}
    </Badge>
  );
};
