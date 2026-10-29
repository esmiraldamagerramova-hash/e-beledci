import { createContext, useContext, useEffect, useState } from 'react';

/**
 * İstifadəçi tərcihləri: şrift ölçüsü (yaşlı müəllimlər üçün oxunaqlılıq)
 * və rəng rejimi (açıq / tünd).
 */
const PrefsContext = createContext(null);
const KEY = 'unec_prefs';
const SIZES = [17, 19, 21];

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

export function PrefsProvider({ children }) {
  const saved = load();
  const [fontIdx, setFontIdx] = useState(saved.fontIdx ?? 0);
  const [theme, setTheme] = useState(saved.theme ?? 'light');

  useEffect(() => {
    document.documentElement.style.fontSize = `${SIZES[fontIdx]}px`;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, JSON.stringify({ fontIdx, theme })); } catch { /* ignore */ }
  }, [fontIdx, theme]);

  const value = {
    fontIdx,
    canGrow: fontIdx < SIZES.length - 1,
    canShrink: fontIdx > 0,
    grow: () => setFontIdx((i) => Math.min(i + 1, SIZES.length - 1)),
    shrink: () => setFontIdx((i) => Math.max(i - 1, 0)),
    theme,
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  };
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export const usePrefs = () => useContext(PrefsContext);
