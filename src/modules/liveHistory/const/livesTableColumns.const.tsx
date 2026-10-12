import type { DataTableColumn } from "@/libs/ui/table";
import { LiveStatusBadge } from "@/modules/common/components";
import { Stack, Text } from "@mantine/core";
import type { TFunction } from "i18next";
import type { LiveRow } from "../hooks";

export const getLivesTableColumns = (t: TFunction): DataTableColumn<LiveRow>[] => [
  {
    accessor: "title",
    title: t("columns.title"),
    width: 240,
    render: (live) => (
      <Stack gap={0}>
        <Text size="sm" fw={700}>
          {live.title}
        </Text>
        <Text size="xs" c="dimmed">
          {live.platform}
        </Text>
      </Stack>
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
];
