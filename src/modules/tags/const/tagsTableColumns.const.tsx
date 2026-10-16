import type { DataTableColumn } from "@/libs/ui/table";
import type { Tag } from "@/models";
import { TagBadges } from "@/modules/common/components";
import { Text } from "@mantine/core";
import type { TFunction } from "i18next";
import { TagRowActions } from "../components";

interface TagsTableActions {
  onEdit: (tagId: string) => void;
  onDelete: (tag: Tag) => void;
}

export const getTagsTableColumns = (t: TFunction, actions: TagsTableActions): DataTableColumn<Tag>[] => [
  { accessor: "name", title: t("columns.name"), width: 240 },
  {
    accessor: "preview",
    title: t("columns.preview"),
    width: 200,
    render: (tag) => <TagBadges tags={[tag]} />,
  },
  {
    accessor: "color",
    title: t("columns.color"),
    width: 120,
    render: (tag) => (
      <Text size="sm" ff="monospace">
        {tag.color}
      </Text>
    ),
  },
  {
    accessor: "actions",
    title: "",
    width: 96,
    textAlign: "center",
    render: (tag) => (
      <TagRowActions name={tag.name} onEdit={() => actions.onEdit(tag.id)} onDelete={() => actions.onDelete(tag)} />
    ),
  },
];
