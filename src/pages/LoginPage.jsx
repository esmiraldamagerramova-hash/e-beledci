import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, User, LockKey, Eye, EyeSlash, ArrowRight, Globe, CaretDown, Info, Moon, Sun } from '../components/icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import { usePrefs, FONT_SIZES } from '../context/PrefsContext.jsx';
import '../styles/login.css';

/**
 * Giriş səhifəsi — dizayn maketinə uyğun (UNEC · Moodle Adaptiv Öyrənmə).
 * Səhifə həmişə brauzer pəncərəsinə sığır, scroll yaranmır.
 */
export default function LoginPage() {
  const { user, login } = useAuth();
  const { t, lang, setLang, langs } = useLang();
  const prefs = usePrefs();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const sideRef = useRef(null);
  const cardRef = useRef(null);
  const heroRef = useRef(null);

  // İstifadəçinin "A+" mətn ölçüsü giriş səhifəsinə təsir etmir
  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = '16px';
    return () => { html.style.fontSize = `${FONT_SIZES[prefs.fontIdx]}px`; };
  }, [prefs.mode, prefs.fontIdx]);

  // Məzmun pəncərəyə sığmırsa, avtomatik kiçildilir (scroll yaranmır)
  useLayoutEffect(() => {
    const fitOne = (box, el, origin) => {
      if (!box || !el) return;
      el.style.transform = '';
      const cs = getComputedStyle(box);
      const padTop = parseFloat(cs.paddingTop);
      const avail = box.clientHeight - padTop - parseFloat(cs.paddingBottom);
      const need = el.scrollHeight;
      if (need <= avail) return;
      const k = Math.max(0.5, avail / need);
      el.style.transformOrigin = origin;
      el.style.transform = `scale(${k})`;
      const r = el.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const target = origin === 'top left' ? b.top + padTop : b.top + padTop + (avail - r.height) / 2;
      el.style.transform = `translateY(${target - r.top}px) scale(${k})`;
    };
    const fit = () => {
      fitOne(sideRef.current, cardRef.current, 'top center');
      fitOne(heroRef.current?.parentElement, heroRef.current, 'top left');
    };
    fit();
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener('resize', fit);
  }, [t, error, info]);

  if (user) return <Navigate to="/esas-sehife" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(username, password);
      navigate(location.state?.from?.pathname || '/esas-sehife', { replace: true });
    } catch (err) {
      setError(err.code === 'EMPTY_CREDENTIALS' ? t('emptyCreds') : err.message);
    } finally {
      setBusy(false);
    }
  }

  const current = langs.find((l) => l.code === lang);

  return (
    <div className="lg">
      {/* ================= SOL PANEL ================= */}
      <aside className="lg__hero">
        <div className="lg__photo" aria-hidden="true" />
        <div className="lg__hero-inner" ref={heroRef}>
          <div className="lg__uni">
            <img src="/unec-logo-256.jpg" alt="UNEC" />
            <span className="lg__rule" />
            <div>
              <strong>UNEC</strong>
              <span>{t('uniLine1')}<br />{t('uniLine2')}</span>
            </div>
          </div>

          <div className="lg__title">
            <span className="lg__moodle"><GraduationCap className="lg__mcap" size={56} />Moodle</span>
            <h1>{t('adaptive')}</h1>
          </div>

          <p className="lg__slogan">
            {t('slogan1')}<br />{t('slogan2')}
            <svg viewBox="0 0 260 22" aria-hidden="true"><path d="M3 18 C 70 10, 150 4, 256 2" /></svg>
          </p>
        </div>

        {/* Aşağıdakı dalğalar */}
        <svg className="lg__waves" viewBox="0 0 720 260" preserveAspectRatio="none" aria-hidden="true">
          <path className="w1" d="M0 28 C 190 -6, 370 86, 540 160 C 620 196, 680 232, 720 260 L0 260 Z" />
          <path className="w2" d="M0 66 C 180 40, 340 118, 480 196 C 525 222, 565 246, 595 260 L0 260 Z" />
        </svg>
      </aside>

      {/* ================= SAĞ PANEL ================= */}
      <main className="lg__side" ref={sideRef}>
        <span className="lg__dots lg__dots--tr" aria-hidden="true" />
        <span className="lg__dots lg__dots--bl" aria-hidden="true" />
        <span className="lg__blob" aria-hidden="true" />
        <button type="button" className="lg__theme" onClick={prefs.toggleTheme} aria-pressed={prefs.isDark}
          title={prefs.isDark ? t('lightMode') : t('darkMode')} aria-label={prefs.isDark ? t('lightMode') : t('darkMode')}>
          {prefs.isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <form className="lg__card" ref={cardRef} onSubmit={onSubmit} noValidate>
          <header className="lg__head">
            <GraduationCap size={52} className="lg__cap" />
            <div>
              <h2>UNEC{' '}<br />{t('adaptive')}</h2>
              <p>{t('welcomeMoodle')}</p>
            </div>
          </header>

          <label className="lg__field">
            <span className="lg__label">{t('username')}</span>
            <span className="lg__control">
              <User size={20} />
              <input type="text" autoComplete="username" placeholder="teacher1"
                value={username} onChange={(e) => setUsername(e.target.value)} />
            </span>
          </label>

          <label className="lg__field">
            <span className="lg__label">{t('password')}</span>
            <span className="lg__control">
              <LockKey size={20} />
              <input type={showPw ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="lg__eye" onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? t('hidePw') : t('showPw')} title={showPw ? t('hidePw') : t('showPw')}>
                {showPw ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </span>
          </label>

          <button type="button" className="lg__forgot" onClick={() => setInfo(t('forgotMsg'))}>{t('forgot')}</button>

          {error && <div className="lg__msg lg__msg--err" role="alert">{error}</div>}
          {info && <div className="lg__msg"><Info size={18} /> {info}</div>}

          <button className="lg__submit" type="submit" disabled={busy}>
            {busy ? t('checking') : t('signIn')} {!busy && <ArrowRight size={20} />}
          </button>

          <label className="lg__lang">
            <Globe size={20} />
            <span>{current?.label} ({current?.code})</span>
            <CaretDown size={14} />
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label={t('language')}>
              {langs.map((l) => <option key={l.code} value={l.code}>{l.label} ({l.code})</option>)}
            </select>
          </label>

          <footer className="lg__foot">
            <GraduationCap size={18} /> <strong>UNEC Moodle</strong>
            <span className="lg__sep">|</span>
            <span>{t('footerNote')}</span>
          </footer>
        </form>
      </main>
    </div>
  );
}
