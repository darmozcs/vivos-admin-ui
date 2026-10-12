import { PasswordForm } from "../../components";
import { usePasswordForm } from "../../hooks";

export const PasswordSettingsContainer = () => {
  const { form, onSubmit, isLoading } = usePasswordForm();

  return <PasswordForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
};
