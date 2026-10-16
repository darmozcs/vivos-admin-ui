import { useMutation } from "@tanstack/react-query";
import { deleteTagService } from "../services/tag.service";
import { useInvalidateTags } from "./useInvalidateTags";

export const useDeleteTagMutation = () => {
  const invalidateTags = useInvalidateTags();

  return useMutation({
    mutationFn: deleteTagService,
    onSuccess: invalidateTags,
  });
};
