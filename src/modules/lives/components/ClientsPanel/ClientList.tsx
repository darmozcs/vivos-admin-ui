import { EmptyState } from "@/modules/common/components";
import { Button, ScrollArea, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ClientListItem } from "./ClientListItem";

interface ClientListEntry {
  id: string;
  fullName: string;
  account: string;
  initials: string;
  total: string;
  selected: boolean;
}

interface ClientListProps {
  items: ClientListEntry[];
  search: string;
  showNoResults: boolean;
  onSelect: (clientId: string) => void;
  onCreateFromSearch: () => void;
}

const LIST_MAX_HEIGHT = 520;

export const ClientList = ({
  items,
  search,
  showNoResults,
  onSelect,
  onCreateFromSearch,
}: ClientListProps) => {
  const { t } = useTranslation("lives");

  return (
    <ScrollArea.Autosize mah={LIST_MAX_HEIGHT} type="auto" offsetScrollbars>
      <Stack gap={4}>
        {items.map((item) => (
          <ClientListItem
            key={item.id}
            {...item}
            onSelect={() => onSelect(item.id)}
          />
        ))}
        {showNoResults && (
          <EmptyState
            message={t("clients.noResults", { search })}
            action={
              <Button color="blossom.5" autoContrast onClick={onCreateFromSearch}>
                {t("clients.createFromSearch", { search })}
              </Button>
            }
          />
        )}
      </Stack>
    </ScrollArea.Autosize>
  );
};
