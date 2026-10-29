import { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight, ArrowsOut, DownloadSimple } from '@phosphor-icons/react';
import { useLang } from '../i18n/LangContext.jsx';

/**
 * Slayd göstərici. Formatlar:
 *  - inline: [{ title, text }]
 *  - images: [{ src, title? }]
 *  - pdf:    url
 */
export default function SlideViewer({ slides }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const items = slides.items || [];
  const total = items.length;

  useEffect(() => setI(0), [slides]);

  const prev = useCallback(() => setI((x) => Math.max(0, x - 1)), []);
  const next = useCallback(() => setI((x) => Math.min(total - 1, x + 1)), [total]);

  if (slides.type === 'pdf') {
    return (
      <div className="slides">
        <div className="slides__pdf"><iframe src={slides.url} title={slides.title || 'PDF'} /></div>
        <a className="btn btn--outline" href={slides.url} target="_blank" rel="noreferrer"><DownloadSimple size={18} /> {t('pdfDownload')}</a>
      </div>
    );
  }

  const cur = items[i] || {};
  return (
    <div
      className="slides"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
      aria-roledescription="slideshow"
    >
      <div className="slides__stage" ref={ref}>
        {slides.type === 'images' ? (
          <img src={cur.src} alt={cur.title || `${i + 1}`} />
        ) : (
          <div className="slide" key={i}>
            <div className="slide__band">
              <img src="/unec-logo-256.jpg" alt="" width="34" height="34" />
              <span>UNEC</span>
              <em>{slides.title}</em>
            </div>
            <div className="slide__body">
              <span className="slide__step">{i + 1}</span>
              <div>
                <h3>{cur.title}</h3>
                <p>{cur.text}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="slides__bar">
        <button className="btn btn--outline btn--sm" onClick={prev} disabled={i === 0}>
          <CaretLeft size={16} weight="bold" /> <span className="hide-sm">{t('prev')}</span>
        </button>
        <div className="slides__dots">
          {items.map((_, k) => (
            <button key={k} className={k === i ? 'is-active' : ''} onClick={() => setI(k)} aria-label={`${k + 1}`} />
          ))}
          <span className="slides__count">{i + 1} / {total}</span>
        </div>
        <button className="btn btn--outline btn--sm" onClick={next} disabled={i === total - 1}>
          <span className="hide-sm">{t('next')}</span> <CaretRight size={16} weight="bold" />
        </button>
        <button className="btn btn--outline btn--sm btn--icon" onClick={() => ref.current?.requestFullscreen?.()} title={t('fullscreen')} aria-label={t('fullscreen')}>
          <ArrowsOut size={18} />
        </button>
      </div>
    </div>
  );
}
