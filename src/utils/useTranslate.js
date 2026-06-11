import { useLanguage } from "../context/LanguageContext";
import { translations } from "./i18n";

export const useTranslate = () => {
  const { language } = useLanguage();
  return (key) => translations[language]?.[key] || key;
};
