import type { Tag } from "@/models";
import { Badge, Group } from "@mantine/core";

interface TagBadgesProps {
  tags: Tag[];
}

/** Tags of a live or movement, each with its own color (autoContrast picks the text color). */
export const TagBadges = ({ tags }: TagBadgesProps) => {
  if (tags.length === 0) return null;

  return (
    <Group gap={4} wrap="wrap">
      {tags.map((tag) => (
        <Badge key={tag.id} size="sm" color={tag.color} autoContrast tt="none">
          {tag.name}
        </Badge>
      ))}
    </Group>
  );
};
