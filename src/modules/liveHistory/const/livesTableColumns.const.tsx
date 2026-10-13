import type { DataTableColumn } from "@/libs/ui/table";
import { LiveStatusBadge } from "@/modules/common/components";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { LiveRowActions } from "../components";
import type { LiveRow } from "../hooks";

interface LivesTableActions {
  onDelete: (live: LiveRow) => void;
}

export const getLivesTableColumns = (
  t: TFunction,
  actions: LivesTableActions,
): DataTableColumn<LiveRow>[] => [
  {
    accessor: "title",
    title: t("columns.title"),
    width: 240,
    render: (live) => (
      <Text size="sm" fw={700}>
        {live.title}
      </Text>
    ),
  },
  {
    accessor: "status",
    title: t("columns.status"),
    width: 170,
    render: (live) => <LiveStatusBadge status={live.status} size="md" />,
  },
  { accessor: "date", title: t("columns.date"), width: 120 },
  { accessor: "duration", title: t("columns.duration"), width: 110 },
  { accessor: "buyers", title: t("columns.buyers"), width: 110, textAlign: "right" },
  { accessor: "units", title: t("columns.units"), width: 100, textAlign: "right" },
  { accessor: "total", title: t("columns.total"), width: 130, textAlign: "right" },
  {
    accessor: "actions",
    title: "",
    width: 64,
    textAlign: "center",
    render: (live) => (
      <LiveRowActions
        title={live.title}
        canDelete={live.canDelete}
        onDelete={() => actions.onDelete(live)}
      />
    ),
  },
];
