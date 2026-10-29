import { useEffect, useState } from 'react';
import { PanelHide, PanelShow, ArrowsOut, X } from './icons.jsx';
import { usePrefs } from '../context/PrefsContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

/**
 * Dərs/material baxışı üçün alətlər:
 *  - soldakı mövzular panelini gizlət / göstər
 *  - tam ekran (PowerPoint təqdimatı kimi)
 */
export default function LessonToolbar() {
  const { hideTopics, setHideTopics } = usePrefs();
  const { t } = useLang();
  const [isFull, setIsFull] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const on = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.getElementById('lesson')?.requestFullscreen?.();
  };

  return (
    <div className="ltools" role="toolbar" aria-label={t('lessonTools')}>
      {!isFull && (
        <button className="ltools__btn" onClick={() => setHideTopics(!hideTopics)} aria-pressed={hideTopics}>
          {hideTopics ? <PanelShow size={18} /> : <PanelHide size={18} />}
          <span>{hideTopics ? t('showTopics') : t('hideTopics')}</span>
        </button>
      )}
      <button className="ltools__btn ltools__btn--primary" onClick={toggleFull}>
        {isFull ? <X size={18} /> : <ArrowsOut size={18} />}
        <span>{isFull ? t('exitFullscreen') : t('fullscreen')}</span>
      </button>
    </div>
  );
}
