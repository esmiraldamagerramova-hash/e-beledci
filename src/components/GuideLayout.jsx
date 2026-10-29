import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import FileTree from './FileTree.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { usePrefs } from '../context/PrefsContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

/**
 * Ana səhifə, videolar, sınaq və hesab — tam enli.
 * Bölmə və xidmət səhifələri — solda mövzular (fayl sistemi kimi kataloq) ilə.
 * Kabinetin dizaynı (əsas rəng, sıxlıq) yalnız giriş etdikdən sonra tətbiq olunur.
 */
export default function GuideLayout() {
  const { t } = useLang();
  const { error } = useGuide();
  const { accent, density, hideTopics } = usePrefs();
  const { pathname, hash } = useLocation();
  const { categoryId } = useParams();
  const withTree = !!categoryId;

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="app" data-accent={accent} data-density={density}>
      <SiteHeader />
      <main
        id="main"
        className={withTree ? `container layout-tree ${hideTopics ? 'topics-hidden' : ''}` : 'layout-full'}
      >
        {withTree && !hideTopics && (
          <aside className="sidebar" aria-label={t('catalog')}>
            <FileTree />
          </aside>
        )}
        <div className="layout-main" id="lesson">
          {error && <div className="container"><div className="notice notice--error">{t('loadError')}: {error.message}</div></div>}
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
