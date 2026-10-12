import { Button, Group, Modal, Stack } from "@mantine/core";
import type { FormEventHandler, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface StoreFormModalProps {
  opened: boolean;
  title: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  /** Fields of the form: the create modal adds the admin account fields. */
  children: ReactNode;
}

/** Frame shared by the create and edit store modals. */
export const StoreFormModal = ({
  opened,
  title,
  submitLabel,
  onClose,
  onSubmit,
  isLoading,
  children,
}: StoreFormModalProps) => {
  const { t } = useTranslation("stores");

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} noValidate>
        <Stack>
          {children}
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={onClose}>
              {t("form.cancel")}
            </Button>
            <Button type="submit" loading={isLoading}>
              {submitLabel}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
