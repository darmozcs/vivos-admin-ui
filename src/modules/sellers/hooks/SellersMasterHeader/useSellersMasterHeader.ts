import { useDisclosure } from "@mantine/hooks";
import { useCreateSellerForm } from "../CreateSellerForm/useCreateSellerForm";

export const useSellersMasterHeader = () => {
  const [createOpened, { open, close }] = useDisclosure();
  const createForm = useCreateSellerForm({ onDone: close });

  return {
    createOpened,
    openCreate: open,
    closeCreate: createForm.close,
    createForm,
  };
};
