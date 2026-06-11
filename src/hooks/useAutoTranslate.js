import { useEffect, useState } from "react";
import { translateText } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";

export function useAutoTranslate(text) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let active = true;

    async function translate() {
      const result = await translateText(text, language);
      if (active) setTranslated(result);
    }

    translate();
    return () => (active = false);
  }, [text, language]);

  return translated;
}
