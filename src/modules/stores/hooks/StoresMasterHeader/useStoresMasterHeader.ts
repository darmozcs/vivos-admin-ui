import { useDisclosure } from "@mantine/hooks";
import { useCreateStoreForm } from "../CreateStoreForm/useCreateStoreForm";

export const useStoresMasterHeader = () => {
  const [createOpened, { open, close }] = useDisclosure();
  const createForm = useCreateStoreForm({ onDone: close });

  return {
    createOpened,
    openCreate: open,
    closeCreate: createForm.close,
    createForm,
  };
};
