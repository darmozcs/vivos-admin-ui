import { useDisclosure } from "@mantine/hooks";
import { useCreateTradeForm } from "../CreateTradeForm/useCreateTradeForm";

export const useTradesMasterHeader = () => {
  const [createOpened, { open, close }] = useDisclosure();
  const { close: closeCreate, ...createForm } = useCreateTradeForm({ onDone: close });

  return {
    createOpened,
    openCreate: open,
    closeCreate,
    createForm,
  };
};
