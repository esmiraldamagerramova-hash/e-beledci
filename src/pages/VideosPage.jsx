import { useState } from 'react';
import { PlayCircle, Presentation, SquaresFour } from '../components/icons.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { TutorialCard } from './GuideHome.jsx';
import { allServices } from '../utils.js';

export default function VideosPage() {
  const { categories } = useGuide();
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const list = allServices(categories)
    .filter((s) => s.video || s.slides)
    .filter((s) => filter === 'all' || (filter === 'video' ? s.video : s.slides));

  const FILTERS = [
    ['all', t('all'), SquaresFour],
    ['video', t('withVideo'), PlayCircle],
    ['slides', t('withSlides'), Presentation],
  ];

  return (
    <div className="container page-pad">
      <Breadcrumbs items={[{ label: t('navVideos') }]} />
      <header className="page-head">
        <span className="page-head__icon"><PlayCircle size={36} weight="duotone" /></span>
        <div>
          <h1>{t('videosTitle')}</h1>
          <p>{t('videosLead')}</p>
        </div>
      </header>

      <div className="chips" role="group">
        {FILTERS.map(([key, label, Ic]) => (
          <button key={key} className={filter === key ? 'is-active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            <Ic size={18} weight={filter === key ? 'fill' : 'duotone'} /> {label}
          </button>
        ))}
      </div>

      <div className="tuts">
        {list.map((s) => <TutorialCard key={s.id} s={s} t={t} />)}
      </div>
    </div>
  );
}
