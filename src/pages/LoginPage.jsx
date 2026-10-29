import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap, User, LockKey, Eye, EyeSlash, ArrowRight, Globe, Monitor, ChartBar, UserCircle, Info,
} from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext.jsx';
import { IS_MOCK } from '../api/client.js';
import { useLang } from '../i18n/LangContext.jsx';
import LangSwitch from '../components/LangSwitch.jsx';

const DEMO = [
  { u: 'teacher1', name: 'Aygün Məmmədova', role: 'teacher' },
  { u: 'student1', name: 'Murad Əliyev', role: 'student' },
];

export default function LoginPage() {
  const { user, login } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  if (user) return <Navigate to="/beledci" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(username, password);
      navigate(location.state?.from?.pathname || '/beledci', { replace: true });
    } catch (err) {
      setError(err.code === 'EMPTY_CREDENTIALS' ? t('emptyCreds') : err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      {/* ---------- Sol panel ---------- */}
      <aside className="login__hero">
        <div className="login__photo" aria-hidden="true" />
        <div className="login__hero-inner">
          <div className="login__uni">
            <img src="/unec-logo-256.jpg" alt="UNEC" width="84" height="84" />
            <span className="login__uni-rule" />
            <div>
              <strong>UNEC</strong>
              <span>{t('uni')}</span>
            </div>
          </div>

          <div className="login__title">
            <span className="login__eyebrow"><GraduationCap size={30} weight="fill" /> e-Bələdçi</span>
            <h1>{t('productTitle')}</h1>
            <p>{t('tagline')}</p>
          </div>

          <ul className="login__features">
            <li><span><Monitor size={30} weight="duotone" /></span>{t('feat1')}</li>
            <li><span><ChartBar size={30} weight="duotone" /></span>{t('feat2')}</li>
            <li><span><UserCircle size={30} weight="duotone" /></span>{t('feat3')}</li>
          </ul>

          <p className="login__slogan">
            {t('slogan1')}<br />{t('slogan2')}
            <svg viewBox="0 0 240 16" aria-hidden="true"><path d="M2 12 C 80 3, 160 2, 238 5" /></svg>
          </p>
        </div>
        <svg className="login__wave" viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 110 C 220 30, 440 170, 800 50 L800 160 L0 160 Z" />
        </svg>
      </aside>

      {/* ---------- Sağ panel ---------- */}
      <main className="login__side">
        <span className="dots dots--tr" aria-hidden="true" />
        <span className="dots dots--bl" aria-hidden="true" />

        <form className="login__card" onSubmit={onSubmit} noValidate>
          <header className="login__card-head">
            <GraduationCap size={54} weight="fill" className="login__cap" />
            <div>
              <h2>UNEC<br />{t('product')}</h2>
              <p>{t('loginWelcome')}</p>
            </div>
          </header>

          <label className="field">
            <span className="field__label">{t('username')}</span>
            <span className="field__control">
              <User size={20} />
              <input type="text" autoComplete="username" placeholder="teacher1"
                value={username} onChange={(e) => setUsername(e.target.value)} />
            </span>
          </label>

          <label className="field">
            <span className="field__label">{t('password')}</span>
            <span className="field__control">
              <LockKey size={20} />
              <input type={showPw ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="field__eye" onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? t('hidePw') : t('showPw')} title={showPw ? t('hidePw') : t('showPw')}>
                {showPw ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </span>
          </label>

          <button type="button" className="login__forgot" onClick={() => setInfo(t('forgotMsg'))}>{t('forgot')}</button>

          {error && <div className="notice notice--error" role="alert">{error}</div>}
          {info && <div className="notice"><Info size={18} weight="fill" /> {info}</div>}

          <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={busy}>
            {busy ? t('checking') : t('submit')} {!busy && <ArrowRight size={20} weight="bold" />}
          </button>

          <div className="login__lang">
            <Globe size={20} weight="duotone" />
            <LangSwitch tone="light" />
          </div>

          {IS_MOCK && (
            <div className="demo">
              <div className="demo__head">{t('demoTitle')} <small>· {t('demoHint')}</small></div>
              {DEMO.map((d) => (
                <button key={d.u} type="button" className="demo__row"
                  onClick={() => { setUsername(d.u); setPassword('demo'); setError(''); }}>
                  <span className="avatar avatar--sm">{d.name.split(' ').map((p) => p[0]).join('')}</span>
                  <span><strong>{d.name}</strong><small>{d.u} · {d.role === 'teacher' ? t('teacher') : t('student')}</small></span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              ))}
            </div>
          )}

          <footer className="login__card-foot">
            <GraduationCap size={18} weight="fill" /> <strong>UNEC e-Bələdçi</strong>
            <span className="sep">|</span> <span>{t('footerNote')}</span>
          </footer>
        </form>
      </main>
    </div>
  );
}
