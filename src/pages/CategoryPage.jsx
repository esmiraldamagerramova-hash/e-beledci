import { Link, useParams } from 'react-router-dom';
import { FileText, CaretRight, PlayCircle, Presentation, Globe } from '@phosphor-icons/react';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';
import NotFound from './NotFound.jsx';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { categories, loading } = useGuide();
  const { t } = useLang();
  const cat = categories.find((c) => c.id === categoryId);

  if (loading) return <div className="skeleton" style={{ height: 260 }} />;
  if (!cat) return <NotFound inline />;

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: cat.title }]} />

      <header className="page-head">
        <span className="page-head__icon"><CategoryIcon name={cat.icon} size={36} /></span>
        <div>
          <span className="eyebrow">
            {t('section')} {cat.number}{cat.subtitle && <> · <span lang="en">{cat.subtitle}</span></>}
          </span>
          <h1>{cat.title}</h1>
          <p>{cat.description}</p>
        </div>
      </header>

      <ul className="svc-list">
        {cat.services.map((s) => (
          <li key={s.id}>
            <Link to={`/beledci/${cat.id}/${s.id}`} className="svc-row">
              <FileText size={30} weight="duotone" className="svc-row__icon" />
              <span className="svc-row__main">
                <strong>{s.name}</strong>
                <span>{s.brief}</span>
                <small><Globe size={14} /> {s.domain}</small>
              </span>
              <span className="svc-row__media">
                {s.video && <span className="badge badge--video"><PlayCircle size={16} weight="fill" /> {t('video')}</span>}
                {s.slides && <span className="badge badge--slides"><Presentation size={16} weight="fill" /> {t('slides')}</span>}
              </span>
              <CaretRight size={20} weight="bold" className="svc-row__go" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
