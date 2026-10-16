import { useDisclosure } from "@mantine/hooks";
import { useTagForm } from "../TagForm/useTagForm";

export const useTagsMasterHeader = () => {
  const [createOpened, { open, close }] = useDisclosure();
  const { close: closeCreate, ...createForm } = useTagForm({ tag: null, onDone: close });

  return { createOpened, openCreate: open, closeCreate, createForm };
};
