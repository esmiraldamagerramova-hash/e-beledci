import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext.jsx';

export default function Brand({ to = '/beledci', compact = false }) {
  const { t } = useLang();
  return (
    <Link to={to} className="brand" aria-label={`UNEC — ${t('product')}`}>
      <img src="/unec-logo-256.jpg" alt="" className="brand__logo" width="46" height="46" />
      {!compact && (
        <span className="brand__text">
          <strong>UNEC</strong>
          <small>{t('product')}</small>
        </span>
      )}
    </Link>
  );
}
