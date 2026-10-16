import { useMutation } from "@tanstack/react-query";
import { updateTagService } from "../services/tag.service";
import { useInvalidateTags } from "./useInvalidateTags";

export const useUpdateTagMutation = () => {
  const invalidateTags = useInvalidateTags();

  return useMutation({
    mutationFn: async (variables: Parameters<typeof updateTagService>[0]) =>
      (await updateTagService(variables)).data,
    onSuccess: invalidateTags,
  });
};
