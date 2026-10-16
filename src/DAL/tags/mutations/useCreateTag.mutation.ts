import { useMutation } from "@tanstack/react-query";
import { createTagService } from "../services/tag.service";
import { useInvalidateTags } from "./useInvalidateTags";

export const useCreateTagMutation = () => {
  const invalidateTags = useInvalidateTags();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof createTagService>[0]) =>
      (await createTagService(variables)).data,
    onSuccess: invalidateTags,
  });
};
