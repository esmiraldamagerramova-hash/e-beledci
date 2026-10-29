import { createContext, useContext, useEffect, useState } from 'react';

/**
 * İstifadəçi tərcihləri (brauzerdə yadda saxlanılır):
 *  - Görünüş / inkluzivlik: mətn ölçüsü, rəng rejimi, keçidlərin vurğulanması, animasiyanın azaldılması
 *  - Kabinetin dizaynı: əsas rəng (accent) və səhifə sıxlığı
 *  - Mövzu panelinin (sol kataloq) gizlədilməsi
 */
const PrefsContext = createContext(null);
const KEY = 'unec_prefs';
const SIZES = [17, 19, 21];
export const FONT_SIZES = SIZES;

export const COLOR_MODES = ['standard', 'dark', 'contrast', 'colorblind', 'grayscale'];
// Standart rəng — UNEC mavisi; yaşıl yalnız seçim kimi
export const ACCENTS = ['unec', 'green'];
const PREFS_VERSION = 3;
export const DENSITIES = ['standard', 'compact'];

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

export function PrefsProvider({ children }) {
  const saved = load();
  const [fontIdx, setFontIdx] = useState(saved.fontIdx ?? 0);
  const [mode, setMode] = useState(COLOR_MODES.includes(saved.mode) ? saved.mode : saved.theme === 'dark' ? 'dark' : 'standard');
  const [underline, setUnderline] = useState(!!saved.underline);
  const [calm, setCalm] = useState(!!saved.calm);
  // köhnə versiyada yadda qalmış rəng sıfırlanır → standart mavi
  const [accent, setAccent] = useState(saved.v === PREFS_VERSION && ACCENTS.includes(saved.accent) ? saved.accent : 'unec');
  const [density, setDensity] = useState(DENSITIES.includes(saved.density) ? saved.density : 'standard');
  const [hideTopics, setHideTopics] = useState(!!saved.hideTopics);

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${SIZES[fontIdx]}px`;
    html.dataset.theme = mode === 'standard' ? 'light' : mode;
    html.classList.toggle('a11y-underline', underline);
    html.classList.toggle('a11y-calm', calm);
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: PREFS_VERSION, fontIdx, mode, underline, calm, accent, density, hideTopics }));
    } catch { /* ignore */ }
  }, [fontIdx, mode, underline, calm, accent, density, hideTopics]);

  const value = {
    fontIdx,
    canGrow: fontIdx < SIZES.length - 1,
    canShrink: fontIdx > 0,
    grow: () => setFontIdx((i) => Math.min(i + 1, SIZES.length - 1)),
    shrink: () => setFontIdx((i) => Math.max(i - 1, 0)),
    mode, setMode,
    // köhnə kodla uyğunluq üçün
    theme: mode === 'dark' ? 'dark' : 'light',
    isDark: mode === 'dark',
    toggleTheme: () => setMode((m) => (m === 'dark' ? 'standard' : 'dark')),
    underline, setUnderline,
    calm, setCalm,
    accent, setAccent,
    density, setDensity,
    hideTopics, setHideTopics,
    resetDisplay: () => { setFontIdx(0); setMode('standard'); setUnderline(false); setCalm(false); },
  };
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export const usePrefs = () => useContext(PrefsContext);
