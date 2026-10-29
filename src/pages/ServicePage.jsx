import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Tag, Globe, TextAlignLeft, BookOpenText, FilmStrip, Presentation, Copy, Check, ArrowSquareOut,
  CaretLeft, CaretRight, FolderOpen, CaretDoubleDown, CaretDoubleUp,
} from '@phosphor-icons/react';
import { useGuide } from '../context/GuideContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import { getService } from '../api/client.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import FsRow from '../components/FsRow.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import SlideViewer from '../components/SlideViewer.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';
import NotFound from './NotFound.jsx';

const ALL_OPEN = { name: true, domain: true, brief: true, about: true, video: true, slides: true };

export default function ServicePage() {
  const { categoryId, serviceId } = useParams();
  const { categories } = useGuide();
  const { pushRecent } = useAuth();
  const { t, lang } = useLang();
  const cat = categories.find((c) => c.id === categoryId);

  const [svc, setSvc] = useState(null);
  const [status, setStatus] = useState('loading');
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(ALL_OPEN);

  useEffect(() => {
    let alive = true;
    setStatus((s) => (svc?.id === serviceId ? s : 'loading'));
    getService(serviceId, lang)
      .then((d) => { if (alive) { setSvc(d); setStatus('ok'); } })
      .catch(() => alive && setStatus('error'));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, lang]);

  useEffect(() => { setOpen(ALL_OPEN); }, [serviceId]);
  useEffect(() => { if (status === 'ok') pushRecent(categoryId, serviceId); }, [status, categoryId, serviceId, pushRecent]);

  // #video / #slides keçidləri üçün
  useEffect(() => {
    if (status !== 'ok' || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, [status]);

  if (status === 'error') return <NotFound inline />;
  if (status === 'loading' || !svc) return <div className="skeleton" style={{ height: 380 }} />;

  const list = cat?.services || [];
  const idx = list.findIndex((s) => s.id === svc.id);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  const url = svc.domain.startsWith('http') ? svc.domain : `https://${svc.domain}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };

  const keys = ['name', 'domain', 'brief', 'about', svc.video && 'video', svc.slides && 'slides'].filter(Boolean);
  const allOpen = keys.every((k) => open[k]);
  const setAll = (v) => setOpen(Object.fromEntries(keys.map((k) => [k, v])));
  const tog = (k) => () => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="page">
      <Breadcrumbs items={[cat && { label: cat.title, to: `/beledci/${cat.id}` }, { label: svc.name }].filter(Boolean)} />

      <header className="svc-head">
        <div className="svc-head__main">
          {cat && (
            <Link to={`/beledci/${cat.id}`} className="eyebrow eyebrow--link">
              <CategoryIcon name={cat.icon} size={18} /> {cat.number}. {cat.title}
            </Link>
          )}
          <h1>{svc.name}</h1>
          <p className="lead">{svc.brief}</p>
        </div>
        <a className="btn btn--primary btn--lg" href={url} target="_blank" rel="noreferrer">
          {t('goService')} <ArrowSquareOut size={20} weight="bold" />
        </a>
      </header>

      <div className="fs">
        <div className="fs__bar">
          <span className="fs__path">
            <FolderOpen size={20} weight="duotone" className="ic-folder" />
            <span>{t('guide')}</span><i>/</i><span>{cat?.title}</span><i>/</i><strong>{svc.name}</strong>
          </span>
          <button className="btn btn--outline btn--sm" onClick={() => setAll(!allOpen)}>
            {allOpen ? <CaretDoubleUp size={16} weight="bold" /> : <CaretDoubleDown size={16} weight="bold" />}
            {allOpen ? t('collapseAll') : t('expandAll')}
          </button>
        </div>

        <FsRow id="name" icon={Tag} name={t('fName')} open={open.name} onToggle={tog('name')}>
          <p className="fs__value">{svc.name}</p>
        </FsRow>

        <FsRow id="domain" icon={Globe} tone="teal" name={t('fDomain')} open={open.domain} onToggle={tog('domain')}>
          <div className="domain">
            <code>{svc.domain}</code>
            <button className="btn btn--outline btn--sm" onClick={copy}>
              {copied ? <><Check size={16} weight="bold" /> {t('copied')}</> : <><Copy size={16} /> {t('copy')}</>}
            </button>
            <a className="btn btn--outline btn--sm" href={url} target="_blank" rel="noreferrer">
              <ArrowSquareOut size={16} /> {t('open')}
            </a>
          </div>
        </FsRow>

        <FsRow id="brief" icon={TextAlignLeft} tone="indigo" name={t('fBrief')} open={open.brief} onToggle={tog('brief')}>
          <p className="fs__value">{svc.brief}</p>
        </FsRow>

        <FsRow id="about" icon={BookOpenText} name={t('fAbout')} open={open.about} onToggle={tog('about')}>
          <div className="prose">
            {String(svc.about).split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </FsRow>

        {svc.video && (
          <FsRow id="video" icon={FilmStrip} tone="red" name={t('fVideo')} meta={svc.video.duration}
            open={open.video} onToggle={tog('video')}>
            {open.video && <VideoPlayer video={svc.video} />}
          </FsRow>
        )}

        {svc.slides && (
          <FsRow id="slides" icon={Presentation} tone="gold" name={t('fSlides')}
            meta={svc.slides.items ? `${t('slideOf')}: ${svc.slides.items.length}` : null}
            open={open.slides} onToggle={tog('slides')}>
            <SlideViewer slides={svc.slides} />
          </FsRow>
        )}

        {!svc.video && !svc.slides && <p className="fs__note">{t('noMedia')}</p>}
      </div>

      <nav className="pager">
        {prev ? (
          <Link to={`/beledci/${cat.id}/${prev.id}`} className="pager__link">
            <CaretLeft size={22} weight="bold" />
            <span><small>{t('prev')}</small>{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/beledci/${cat.id}/${next.id}`} className="pager__link pager__link--next">
            <span><small>{t('next')}</small>{next.name}</span>
            <CaretRight size={22} weight="bold" />
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
