import { useDisclosure } from "@mantine/hooks";
import { useCreateClientForm } from "../CreateClientForm/useCreateClientForm";

export const useClientsMasterHeader = () => {
  const [createOpened, { open, close }] = useDisclosure();
  const createForm = useCreateClientForm({ onDone: close });

  return {
    createOpened,
    openCreate: open,
    closeCreate: createForm.close,
    createForm,
  };
};
