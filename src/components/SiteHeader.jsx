import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, CaretDown, TextAa, Globe, ArrowRight, Moon, Sun } from './icons.jsx';
import DisplayMenu from './DisplayMenu.jsx';
import Brand from './Brand.jsx';
import LangSwitch from './LangSwitch.jsx';
import AccountMenu from './AccountMenu.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import FileTree from './FileTree.jsx';
import CategoryIcon from './CategoryIcon.jsx';
import { usePrefs } from '../context/PrefsContext.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

export default function SiteHeader() {
  const prefs = usePrefs();
  const { t, lang } = useLang();
  const { categories } = useGuide();
  const { pathname } = useLocation();
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const headerRef = useRef(null);
  const innerRef = useRef(null);
  const [fit, setFit] = useState(0);

  // Başlıq heç vaxt üfüqi daşmasın: yer çatmayanda əvvəl yığcam, sonra "burger" görünüşünə keçir
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return undefined;
    const header = el.closest('.header');
    const measure = () => {
      for (let lvl = 0; lvl <= 3; lvl += 1) {
        header.dataset.fit = String(lvl);
        if (el.scrollWidth <= el.clientWidth + 1) { setFit(lvl); return; }
      }
      setFit(3);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [lang, prefs.fontIdx]);

  // Səhifə dəyişəndə bütün açılan panelləri bağla
  useEffect(() => { setMega(false); setSearch(false); setDrawer(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMega(false); setSearch(false); setDrawer(false); } };
    const onDoc = (e) => { if (!headerRef.current?.contains(e.target)) { setMega(false); setSearch(false); } };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDoc); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
  }, [drawer]);

  const inSections = pathname.startsWith('/bolmeler/');

  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>

      {/* Yuxarı zolaq + başlıq birlikdə ekranın yuxarısında sabit qalır */}
      <div className="sticky-top" ref={headerRef}>
      {/* ------- Yuxarı xidmət zolağı ------- */}
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__uni">{t('uni')}</span>
          <div className="topbar__tools">
            <div className="tool" role="group" aria-label={t('textSize')}>
              <TextAa size={18} weight="duotone" aria-hidden="true" />
              <span className="hide-md">{t('textSize')}</span>
              <button onClick={prefs.shrink} disabled={!prefs.canShrink} aria-label={`${t('textSize')} −`}>A−</button>
              <button onClick={prefs.grow} disabled={!prefs.canGrow} aria-label={`${t('textSize')} +`}>A+</button>
            </div>
            <button type="button" className="tool tool--theme" onClick={prefs.toggleTheme}
              aria-pressed={prefs.isDark} title={prefs.isDark ? t('lightMode') : t('darkMode')}>
              {prefs.isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              <span className="hide-md">{prefs.isDark ? t('lightMode') : t('darkMode')}</span>
            </button>
            <DisplayMenu />
            <div className="tool">
              <Globe size={18} weight="duotone" aria-hidden="true" />
              <LangSwitch tone="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* ------- Əsas başlıq ------- */}
      <header className="header" data-fit={fit}>
        <div className="container header__inner" ref={innerRef}>
          <button className="header__burger" onClick={() => setDrawer(true)} aria-label={t('menu')}>
            <List size={26} />
          </button>
          <Brand />

          <nav className="mainnav" aria-label={t('menu')}>
            <NavLink to="/esas-sehife" end>{t('navHome')}</NavLink>
            <button
              className={`mainnav__btn ${mega || inSections ? 'is-active' : ''}`}
              aria-expanded={mega}
              onClick={() => { setMega((v) => !v); setSearch(false); }}
            >
              {t('navSections')} <CaretDown size={14} weight="bold" className={mega ? 'flip' : ''} />
            </button>
            <NavLink to="/video-telimatlar">{t('navVideos')}</NavLink>
            <NavLink to="/ozunu-yoxla">{t('navQuiz')}</NavLink>
          </nav>

          <button
            className={`header__search-btn ${search ? 'is-active' : ''}`}
            onClick={() => { setSearch((v) => !v); setMega(false); }}
            aria-expanded={search}
          >
            {search ? <X size={20} /> : <MagnifyingGlass size={20} weight="bold" />}
            <span className="hide-sm">{t('searchBtn')}</span>
          </button>
          <AccountMenu />
        </div>

        {/* Axtarış paneli */}
        {search && (
          <div className="dropband">
            <div className="container dropband__inner">
              <GlobalSearch big autoFocus />
            </div>
          </div>
        )}

        {/* Bölmələr menyusu (mega menu) */}
        {mega && (
          <div className="dropband mega">
            <div className="container">
              <div className="mega__grid">
                {categories.map((c) => (
                  <Link key={c.id} to={`/bolmeler/${c.id}`} className="mega__item">
                    <CategoryIcon name={c.icon} size={26} className="mega__icon" />
                    <span>
                      <strong>{c.title}</strong>
                      <small>{c.services.length} {t('servicesIn')}</small>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mega__foot">
                <Link to="/esas-sehife#bolmeler" className="textlink">{t('allSections')} <ArrowRight size={16} weight="bold" /></Link>
              </div>
            </div>
          </div>
        )}
      </header>
      </div>

      {/* ------- Mobil menyu ------- */}
      <div className={`drawer ${drawer ? 'is-open' : ''}`} aria-hidden={!drawer}>
        <div className="drawer__head">
          <Brand compact />
          <button className="drawer__close" onClick={() => setDrawer(false)} aria-label={t('close')}><X size={24} /></button>
        </div>
        <div className="drawer__search"><GlobalSearch /></div>
        <nav className="drawer__nav">
          <NavLink to="/esas-sehife" end>{t('navHome')}</NavLink>
          <NavLink to="/video-telimatlar">{t('navVideos')}</NavLink>
          <NavLink to="/ozunu-yoxla">{t('navQuiz')}</NavLink>
          <NavLink to="/hesabim">{t('navAccount')}</NavLink>
        </nav>
        <div className="drawer__tree"><FileTree /></div>
      </div>
      {drawer && <div className="scrim" onClick={() => setDrawer(false)} />}
    </>
  );
}
