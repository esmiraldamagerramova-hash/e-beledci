import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, initials } from '../context/AuthContext.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { usePrefs, ACCENTS, DENSITIES } from '../context/PrefsContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import {
  ArrowRight, IdentificationBadge, HistoryColor, Trash, FileText, EnvelopeSimple, Buildings,
  CourseIc, JoinIc, Check, ClockIc, BrushIc, QuizBig, Trophy,
} from '../components/icons.jsx';
import { allServices } from '../utils.js';
import { MY_COURSES, OPEN_PROGRAMS } from '../data/programs.js';
import { readUserData, writeUserData } from '../storage.js';

export default function AccountPage() {
  const { user, updateProfile, recent, clearRecent } = useAuth();
  const { categories } = useGuide();
  const prefs = usePrefs();
  const { t, lang, setLang, langs } = useLang();

  const [form, setForm] = useState({ fullName: '', email: '', faculty: '' });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [joinedIds, setJoinedIds] = useState(() => readUserData(user, 'programs', []));
  const quizHistory = readUserData(user, 'quiz', []);

  useEffect(() => {
    setForm({ fullName: user?.fullName || '', email: user?.email || '', faculty: user?.faculty || '' });
  }, [user]);

  const services = allServices(categories);
  const recentItems = recent
    .map((r) => ({ ...r, svc: services.find((s) => s.id === r.serviceId && s.category.id === r.categoryId) }))
    .filter((r) => r.svc);

  const pad = (n) => String(n).padStart(2, '0');
  const fmt = { format: (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}` };
  const L = (obj) => obj[lang] || obj.az;
  const isStudent = user?.role !== 'teacher';

  const toggleProgram = (id) => {
    const next = joinedIds.includes(id) ? joinedIds.filter((x) => x !== id) : [...joinedIds, id];
    setJoinedIds(next);
    writeUserData(user, 'programs', next);
  };

  async function onSave(e) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    try {
      await updateProfile({ ...form, lang });
      setSaved(true);
    } finally {
      setBusy(false);
    }
  }

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setSaved(false); };
  const topicName = (id) => categories.find((c) => c.id === id)?.title || id;

  return (
    <div className="container page-pad">
      <Breadcrumbs items={[{ label: t('accountTitle') }]} />

      <header className="profile-head">
        <span className="avatar avatar--xl">{initials(user)}</span>
        <div>
          <span className="eyebrow"><IdentificationBadge size={18} /> {isStudent ? t('student') : t('teacher')}</span>
          <h1>{user?.fullName}</h1>
          <p className="profile-head__meta">
            <span><EnvelopeSimple size={18} /> {user?.email}</span>
            {user?.faculty && <span><Buildings size={18} /> {user.faculty}</span>}
          </p>
        </div>
      </header>

      {/* ---------- Mənim kurslarım ---------- */}
      <section className="panel acc-block" id="kurslar">
        <h2 className="panel__title"><span><CourseIc size={26} /> {t('myCourses')}</span></h2>
        <p className="muted acc-sub">{t('myCoursesSub')}</p>
        <ul className="courses">
          {MY_COURSES.map((c) => (
            <li key={c.id} className="course">
              <span className="course__code">{c.code}</span>
              <strong>{L(c.title)}</strong>
              <small>{c.teacher}</small>
              <span className="tag">{t('assigned')}</span>
            </li>
          ))}
          {OPEN_PROGRAMS.filter((p) => joinedIds.includes(p.id)).map((p) => (
            <li key={p.id} className="course course--joined">
              <span className="course__code">{p.weeks} {t('weeksShort')}</span>
              <strong>{L(p.title)}</strong>
              <small>{L(p.text)}</small>
              <span className="tag tag--gold">{t('selfJoined')}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Açıq proqramlar ---------- */}
      <section className="panel acc-block" id="proqramlar">
        <h2 className="panel__title"><span><JoinIc size={26} /> {t('openPrograms')}</span></h2>
        <p className="muted acc-sub">{t('openProgramsSub')}</p>
        <ul className="programs">
          {OPEN_PROGRAMS.map((p) => {
            const on = joinedIds.includes(p.id);
            return (
              <li key={p.id} className={`program ${on ? 'is-on' : ''}`}>
                <div>
                  <strong>{L(p.title)}</strong>
                  <p>{L(p.text)}</p>
                  <small><ClockIc size={16} /> {p.weeks} {t('weeksShort')} · {p.hours} {t('hoursShort')}</small>
                </div>
                <button className={`btn btn--sm ${on ? 'btn--outline' : 'btn--primary'}`} onClick={() => toggleProgram(p.id)} aria-pressed={on}>
                  {on ? <><Check size={16} /> {t('leave')}</> : <><JoinIc size={16} /> {t('join')}</>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="account">
        {/* ---------- Profil ---------- */}
        <form className="panel" onSubmit={onSave}>
          <h2 className="panel__title"><span><IdentificationBadge size={26} /> {t('profile')}</span></h2>
          <div className="form-grid">
            <label className="field">
              <span className="field__label">{t('fullName')}</span>
              <input className="field__input" value={form.fullName} onChange={set('fullName')} required />
            </label>
            <label className="field">
              <span className="field__label">{t('email')}</span>
              <input className="field__input" type="email" value={form.email} onChange={set('email')} />
            </label>
            <label className="field">
              <span className="field__label">{t('faculty')}</span>
              <input className="field__input" value={form.faculty} onChange={set('faculty')} />
            </label>
            <label className="field">
              <span className="field__label">{t('prefLang')}</span>
              <select className="field__input" value={lang} onChange={(e) => setLang(e.target.value)}>
                {langs.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </label>
          </div>
          <dl className="meta-list">
            <div><dt>{t('usernameLbl')}</dt><dd><code>{user?.username}</code></dd></div>
            <div><dt>{t('role')}</dt><dd>{isStudent ? t('student') : t('teacher')}</dd></div>
          </dl>
          <div className="panel__actions">
            <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? t('saving') : t('save')}</button>
            {saved && <span className="ok-note" role="status">{t('saved')}</span>}
          </div>
        </form>

        {/* ---------- Dizayn ---------- */}
        <section className="panel" id="dizayn">
          <h2 className="panel__title"><span><BrushIc size={24} /> {t('designTitle')}</span></h2>
          <p className="muted acc-sub">{t('designSub')}</p>

          <span className="field__label">{t('accentColor')}</span>
          <div className="accents">
            {ACCENTS.map((a) => (
              <button key={a} className={`accent accent--${a} ${prefs.accent === a ? 'is-active' : ''}`}
                aria-pressed={prefs.accent === a} onClick={() => prefs.setAccent(a)}>
                <i aria-hidden="true">{prefs.accent === a && <Check size={16} />}</i>
                <span>{t(`accent_${a}`)}</span>
              </button>
            ))}
          </div>

          <span className="field__label">{t('densityLbl')}</span>
          <div className="chips">
            {DENSITIES.map((d) => (
              <button key={d} className={prefs.density === d ? 'is-active' : ''} aria-pressed={prefs.density === d}
                onClick={() => prefs.setDensity(d)}>{t(`density_${d}`)}</button>
            ))}
          </div>
          <p className="muted acc-note">{t('displayLink')}</p>
        </section>
      </div>

      <div className="account">
        {/* ---------- Sınaq nəticələri ---------- */}
        <section className="panel" id="sinaqlar">
          <h2 className="panel__title">
            <span><QuizBig size={26} /> {t('quizHistory')}</span>
            <Link to="/ozunu-yoxla" className="textlink">{t('navQuiz')} <ArrowRight size={16} /></Link>
          </h2>
          {quizHistory.length === 0 ? (
            <p className="muted">{t('noQuiz')}</p>
          ) : (
            <ul className="history">
              {quizHistory.map((h) => (
                <li key={h.at} className="qrow">
                  <Trophy size={24} className="history__icon" />
                  <span>
                    <strong>{h.score} / {h.total} · {Math.round((h.score / h.total) * 100)}%</strong>
                    <small>{h.topics.map(topicName).join(', ')} · {fmt.format(new Date(h.at))}</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ---------- Son baxılanlar ---------- */}
        <section className="panel" id="tarixce">
          <h2 className="panel__title">
            <span><HistoryColor size={26} /> {t('activity')}</span>
            <span className="panel__count">{recentItems.length} {t('viewedCount')}</span>
          </h2>
          {recentItems.length === 0 ? (
            <p className="muted">{t('noRecent')}</p>
          ) : (
            <>
              <ul className="history">
                {recentItems.map((r) => (
                  <li key={r.serviceId}>
                    <Link to={`/bolmeler/${r.categoryId}/${r.serviceId}`}>
                      <FileText size={26} className="history__icon" />
                      <span>
                        <strong>{r.svc.name}</strong>
                        <small>{r.svc.category.title} · {fmt.format(new Date(r.at))}</small>
                      </span>
                      <ArrowRight size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
              <button className="btn btn--outline btn--sm" onClick={clearRecent}><Trash size={16} /> {t('clearHistory')}</button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
