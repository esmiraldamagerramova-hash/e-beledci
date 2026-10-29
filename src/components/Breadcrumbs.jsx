import { Link } from 'react-router-dom';
import { House, CaretRight } from '@phosphor-icons/react';
import { useLang } from '../i18n/LangContext.jsx';

export default function Breadcrumbs({ items }) {
  const { t } = useLang();
  return (
    <nav className="crumbs" aria-label={t('youAreHere')}>
      <Link to="/beledci"><House size={17} weight="duotone" /> {t('guide')}</Link>
      {items.map((it, i) => (
        <span key={i} className="crumbs__item">
          <CaretRight size={12} weight="bold" className="crumbs__sep" aria-hidden="true" />
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
