import { TagsMasterHeaderContainer, TagsTableContainer } from "@/modules/tags/containers";
import { Stack } from "@mantine/core";

export const Tags = () => {
  return (
    <Stack gap="lg">
      <TagsMasterHeaderContainer />
      <TagsTableContainer />
    </Stack>
  );
};
