import { Link } from 'react-router-dom';
import {
  ArrowRight, PlayCircle, Presentation, Stack, FileText, Lifebuoy, ClockCounterClockwise,
  ClipboardText, Exam, Gradebook, SignIn, DeviceMobile, VideoConference, ChatsCircle, CalendarDots,
  CourseIc, Quiz, FilmStrip, A11y,
} from '../components/icons.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { useAuth, firstName } from '../context/AuthContext.jsx';
import { useLang, greetingKey } from '../i18n/LangContext.jsx';
import { POPULAR } from '../i18n/strings.extra.js';
import GlobalSearch from '../components/GlobalSearch.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';
import { allServices } from '../utils.js';

const POPULAR_ICONS = {
  tapsiriq: ClipboardText,
  imtahan: Exam,
  jurnal: Gradebook,
  autentifikasiya: SignIn,
  'moodle-mobile': DeviceMobile,
  bbb: VideoConference,
  forum: ChatsCircle,
  kalendar: CalendarDots,
};

const ABOUT = [
  { key: 'about1', to: '/hesabim#kurslar', Ic: CourseIc },
  { key: 'about2', to: '/ozunu-yoxla', Ic: Quiz },
  { key: 'about3', to: '/video-telimatlar', Ic: FilmStrip },
  { key: 'about4', to: '/hesabim#dizayn', Ic: A11y },
];

export default function GuideHome() {
  const { categories, loading } = useGuide();
  const { user, recent } = useAuth();
  const { t } = useLang();
  const services = allServices(categories);
  const videos = services.filter((s) => s.video).length;
  const slides = services.filter((s) => s.slides).length;
  const popular = POPULAR.map((id) => services.find((s) => s.id === id)).filter(Boolean);
  const tutorials = services.filter((s) => s.video || s.slides).slice(0, 4);
  const recentItems = recent
    .map((r) => services.find((s) => s.id === r.serviceId && s.category.id === r.categoryId))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero__photo" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__hello">{t(greetingKey())}, {firstName(user)}!</p>
            <h1>{t('productTitle')}</h1>
            <p className="hero__sub">{t('heroSub')}</p>
            <GlobalSearch big withButton />
            <ul className="hero__stats">
              <li><Stack size={22} weight="duotone" /><strong>{categories.length}</strong> {t('sections')}</li>
              <li><FileText size={22} weight="duotone" /><strong>{services.length}</strong> {t('services')}</li>
              <li><PlayCircle size={22} weight="duotone" /><strong>{videos}</strong> {t('videos')}</li>
              <li><Presentation size={22} weight="duotone" /><strong>{slides}</strong> {t('slidesN')}</li>
            </ul>
          </div>

          {recentItems.length > 0 && (
            <aside className="hero__recent">
              <h2><ClockCounterClockwise size={20} weight="duotone" /> {t('continue')}</h2>
              <ul>
                {recentItems.map((s) => (
                  <li key={s.id}>
                    <Link to={`/bolmeler/${s.category.id}/${s.id}`}>
                      <span><strong>{s.name}</strong><small>{s.category.title}</small></span>
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
        <svg className="hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50 C 360 0, 760 90, 1440 20 L1440 80 L0 80 Z" />
        </svg>
      </section>

      {/* ---------------- ADAPTİV ÖYRƏNMƏ HAQQINDA ---------------- */}
      <section className="section about" id="haqqinda">
        <div className="container about__inner">
          <div className="about__text">
            <h2>{t('aboutTitle')}</h2>
            <p>{t('aboutText')}</p>
          </div>
          <ul className="about__list">
            {ABOUT.map(({ key, to, Ic }) => (
              <li key={key}>
                <Link to={to} className="about__item">
                  <Ic size={28} className="about__icon" />
                  <span>
                    <strong>{t(key)}</strong>
                    <small>{t(`${key}t`)}</small>
                  </span>
                  <ArrowRight size={18} className="about__go" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- POPULAR ---------------- */}
      <section className="section">
        <div className="container">
          <header className="sec-head">
            <div>
              <h2>{t('popular')}</h2>
              <p>{t('popularSub')}</p>
            </div>
          </header>
          <div className="quick">
            {popular.map((s) => {
              const Ic = POPULAR_ICONS[s.id] || FileText;
              return (
                <Link key={s.id} to={`/bolmeler/${s.category.id}/${s.id}`} className="quick__item">
                  <Ic size={40} weight="duotone" className="quick__icon" />
                  <strong>{s.name}</strong>
                  <small>{s.brief}</small>
                  <span className="quick__go"><ArrowRight size={18} weight="bold" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTIONS ---------------- */}
      <section className="section section--tint" id="bolmeler">
        <div className="container">
          <header className="sec-head">
            <div>
              <h2>{t('sectionsTitle')}</h2>
              <p>{t('sectionsSub')}</p>
            </div>
          </header>

          {loading ? (
            <div className="cats">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="cat skeleton" />)}</div>
          ) : (
            <div className="cats">
              {categories.map((c) => {
                const v = c.services.filter((s) => s.video).length;
                const sl = c.services.filter((s) => s.slides).length;
                return (
                  <Link key={c.id} to={`/bolmeler/${c.id}`} className="cat">
                    <div className="cat__top">
                      <span className="cat__icon"><CategoryIcon name={c.icon} size={30} /></span>
                      <span className="cat__num">{String(c.number).padStart(2, '0')}</span>
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                    <div className="cat__foot">
                      <span><FileText size={16} weight="duotone" /> {c.services.length}</span>
                      {v > 0 && <span><PlayCircle size={16} weight="duotone" /> {v}</span>}
                      {sl > 0 && <span><Presentation size={16} weight="duotone" /> {sl}</span>}
                      <span className="cat__more">{t('openSection')} <ArrowRight size={16} weight="bold" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- TUTORIALS ---------------- */}
      <section className="section">
        <div className="container">
          <header className="sec-head">
            <div>
              <h2>{t('tutorialsTitle')}</h2>
              <p>{t('tutorialsSub')}</p>
            </div>
            <Link to="/video-telimatlar" className="textlink">{t('seeAll')} <ArrowRight size={16} weight="bold" /></Link>
          </header>
          <div className="tuts">
            {tutorials.map((s) => <TutorialCard key={s.id} s={s} t={t} />)}
          </div>
        </div>
      </section>

      {/* ---------------- HELP ---------------- */}
      <section className="help">
        <div className="container help__inner">
          <Lifebuoy size={64} weight="duotone" className="help__icon" />
          <div className="help__text">
            <h2>{t('helpTitle')}</h2>
            <p>{t('helpText')}</p>
          </div>
          <div className="help__actions">
            <Link to="/video-telimatlar" className="btn btn--gold"><PlayCircle size={20} weight="fill" /> {t('helpBtn1')}</Link>
            <Link to="/ozunu-yoxla" className="btn btn--ghost-light">{t('navQuiz')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function TutorialCard({ s, t }) {
  return (
    <Link to={`/bolmeler/${s.category.id}/${s.id}#${s.video ? 'video' : 'slides'}`} className="tut">
      <span className="tut__thumb">
        <img src="/unec-logo-256.jpg" alt="" className="tut__logo" />
        {s.video ? <PlayCircle size={60} weight="fill" className="tut__play" /> : <Presentation size={56} weight="duotone" className="tut__play" />}
        <span className="tut__badges">
          {s.video && <span><PlayCircle size={14} weight="fill" /> {t('withVideo')}</span>}
          {s.slides && <span><Presentation size={14} weight="fill" /> {t('withSlides')}</span>}
        </span>
      </span>
      <span className="tut__body">
        <small>{s.category.title}</small>
        <strong>{s.name}</strong>
        <span className="tut__cta">{t('watch')} <ArrowRight size={16} weight="bold" /></span>
      </span>
    </Link>
  );
}
