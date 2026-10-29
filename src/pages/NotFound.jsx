import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext.jsx';
import { MagnifyingGlassMinus } from '@phosphor-icons/react';

export default function NotFound({ inline = false }) {
  const { t } = useLang();
  return (
    <div className={inline ? 'page' : 'nf-wrap'}>
      <div className="empty">
        <MagnifyingGlassMinus size={72} weight="duotone" className="empty__icon" />
        <span className="empty__code">404</span>
        <h1>{t('notFound')}</h1>
        <p>{t('notFoundText')}</p>
        <Link to="/beledci" className="btn btn--primary">{t('backToGuide')}</Link>
      </div>
    </div>
  );
}
