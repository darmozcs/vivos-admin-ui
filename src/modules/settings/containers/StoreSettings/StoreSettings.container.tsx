import { StoreSettingsForm } from "../../components";
import { useStoreSettingsForm } from "../../hooks";

export const StoreSettingsContainer = () => {
  const { form, onSubmit, isLoading, isDirty } = useStoreSettingsForm();

  return (
    <StoreSettingsForm form={form} onSubmit={onSubmit} isLoading={isLoading} isDirty={isDirty} />
  );
};
