import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { STRINGS, LANGS } from './strings.js';
import { EXTRA } from './strings.extra.js';

const LangContext = createContext(null);
const KEY = 'unec_lang';

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch { /* ignore */ }
  return 'az';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const setLang = useCallback((l) => STRINGS[l] && setLangState(l), []);
  const t = useCallback(
    (k) => EXTRA[lang]?.[k] ?? STRINGS[lang][k] ?? EXTRA.az[k] ?? STRINGS.az[k] ?? k,
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t, langs: LANGS }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Günün vaxtına görə salamlama */
export function greetingKey(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 18) return 'afternoon';
  return 'evening';
}
