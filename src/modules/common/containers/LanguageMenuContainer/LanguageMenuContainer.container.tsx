import { LanguageMenu } from "@/modules/common/components";
import { useLanguageMenu } from "@/modules/common/hooks";

export const LanguageMenuContainer = () => {
  const { data, currentLanguageLabel, currentLanguageCode, handleChange } =
    useLanguageMenu();

  return (
    <LanguageMenu
      data={data}
      currentLanguageLabel={currentLanguageLabel}
      currentLanguageCode={currentLanguageCode}
      onChange={handleChange}
    />
  );
};
