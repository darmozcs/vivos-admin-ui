import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { EMAIL_VERIFIED_BADGE } from "../../const/stores.const";

interface EmailVerifiedBadgeProps {
  verified: boolean;
}

export const EmailVerifiedBadge = ({ verified }: EmailVerifiedBadgeProps) => {
  const { t } = useTranslation("stores");
  const badge = verified ? EMAIL_VERIFIED_BADGE.VERIFIED : EMAIL_VERIFIED_BADGE.PENDING;

  return (
    <Badge size="md" color={badge.color} autoContrast tt="none">
      {t(badge.labelKey)}
    </Badge>
  );
};
