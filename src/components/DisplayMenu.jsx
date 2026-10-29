import { useEffect, useRef, useState } from 'react';
import { A11y, CaretDown, Check } from './icons.jsx';
import { usePrefs, COLOR_MODES } from '../context/PrefsContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

/** "Görünüş" menyusu — inkluzivlik: rəng rejimi, mətn ölçüsü, keçidlər, animasiya */
export default function DisplayMenu() {
  const prefs = usePrefs();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div className="dmenu" ref={ref}>
      <button className="tool tool--link" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="dialog">
        <A11y size={18} /> <span>{t('display')}</span> <CaretDown size={12} className={open ? 'flip' : ''} />
      </button>
      {open && (
        <div className="dmenu__panel" role="dialog" aria-label={t('display')}>
          <p className="dmenu__title">{t('colorMode')}</p>
          <div className="dmenu__modes">
            {COLOR_MODES.map((m) => (
              <button key={m} className={`swatch swatch--${m} ${prefs.mode === m ? 'is-active' : ''}`}
                aria-pressed={prefs.mode === m} onClick={() => prefs.setMode(m)}>
                <span className="swatch__chip" aria-hidden="true"><i /><i /><i /></span>
                <span className="swatch__label">{t(`mode_${m}`)}</span>
                {prefs.mode === m && <Check size={16} className="swatch__check" />}
              </button>
            ))}
          </div>

          <p className="dmenu__title">{t('textSize')}</p>
          <div className="dmenu__size">
            <button onClick={prefs.shrink} disabled={!prefs.canShrink}>A−</button>
            <span>{[100, 112, 124][prefs.fontIdx]}%</span>
            <button onClick={prefs.grow} disabled={!prefs.canGrow}>A+</button>
          </div>

          <label className="dmenu__check">
            <input type="checkbox" checked={prefs.underline} onChange={(e) => prefs.setUnderline(e.target.checked)} />
            <span>{t('underlineLinks')}</span>
          </label>
          <label className="dmenu__check">
            <input type="checkbox" checked={prefs.calm} onChange={(e) => prefs.setCalm(e.target.checked)} />
            <span>{t('reduceMotion')}</span>
          </label>

          <button className="dmenu__reset" onClick={prefs.resetDisplay}>{t('resetDisplay')}</button>
        </div>
      )}
    </div>
  );
}
