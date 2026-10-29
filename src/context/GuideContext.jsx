import { createContext, useContext, useEffect, useState } from 'react';
import { getCategories } from '../api/client.js';
import { useLang } from '../i18n/LangContext.jsx';

const GuideContext = createContext(null);

export function GuideProvider({ children }) {
  const { lang } = useLang();
  const [state, setState] = useState({ categories: [], loading: true, error: null });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: s.categories.length === 0 }));
    getCategories(lang)
      .then((categories) => alive && setState({ categories, loading: false, error: null }))
      .catch((error) => alive && setState({ categories: [], loading: false, error }));
    return () => { alive = false; };
  }, [lang]);

  return <GuideContext.Provider value={state}>{children}</GuideContext.Provider>;
}

export const useGuide = () => useContext(GuideContext);
