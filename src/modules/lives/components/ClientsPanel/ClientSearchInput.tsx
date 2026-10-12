import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface ClientSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientSearchInput = ({ value, onChange }: ClientSearchInputProps) => {
  const { t } = useTranslation("lives");

  return (
    <TextInput
      type="search"
      aria-label={t("clients.searchLabel")}
      placeholder={t("clients.searchPlaceholder")}
      leftSection={<IconSearch size={18} stroke={1.8} />}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
