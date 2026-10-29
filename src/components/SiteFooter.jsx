import { Link } from 'react-router-dom';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

export default function SiteFooter() {
  const { categories } = useGuide();
  const { t } = useLang();
  const half = Math.ceil(categories.length / 2);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <div className="footer__brand">
            <img src="/unec-logo-256.jpg" alt="UNEC" width="56" height="56" />
            <div>
              <strong>UNEC</strong>
              <span>{t('uni')}</span>
            </div>
          </div>
          <p>{t('footAbout')}</p>
        </div>

        <nav aria-label={t('footSections')}>
          <h3>{t('footSections')}</h3>
          <ul>
            {categories.slice(0, half).map((c) => <li key={c.id}><Link to={`/bolmeler/${c.id}`}>{c.title}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label={t('footSections')}>
          <h3 aria-hidden="true">&nbsp;</h3>
          <ul>
            {categories.slice(half).map((c) => <li key={c.id}><Link to={`/bolmeler/${c.id}`}>{c.title}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label={t('footUseful')}>
          <h3>{t('footUseful')}</h3>
          <ul>
            <li><Link to="/esas-sehife">{t('navHome')}</Link></li>
            <li><Link to="/video-telimatlar">{t('navVideos')}</Link></li>
            <li><Link to="/hesabim">{t('navAccount')}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} UNEC · {t('product')}. {t('footRights')}
        </div>
      </div>
    </footer>
  );
}
