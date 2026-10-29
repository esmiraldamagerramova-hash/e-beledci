import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, initials } from '../context/AuthContext.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { ArrowRight, UserCircle, ClockCounterClockwise, Trash, FileText, IdentificationBadge, EnvelopeSimple, Buildings } from '@phosphor-icons/react';
import { allServices } from '../utils.js';

export default function AccountPage() {
  const { user, updateProfile, recent, clearRecent } = useAuth();
  const { categories } = useGuide();
  const { t, lang, setLang, langs } = useLang();

  const [form, setForm] = useState({ fullName: '', email: '', faculty: '' });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({ fullName: user?.fullName || '', email: user?.email || '', faculty: user?.faculty || '' });
  }, [user]);

  const services = allServices(categories);
  const recentItems = recent
    .map((r) => ({ ...r, svc: services.find((s) => s.id === r.serviceId && s.category.id === r.categoryId) }))
    .filter((r) => r.svc);

  const fmt = new Intl.DateTimeFormat(lang === 'az' ? 'az-Latn-AZ' : lang, { dateStyle: 'medium', timeStyle: 'short' });

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

  return (
    <div className="container page-pad">
      <Breadcrumbs items={[{ label: t('accountTitle') }]} />

      <header className="profile-head">
        <span className="avatar avatar--xl">{initials(user)}</span>
        <div>
          <span className="eyebrow"><IdentificationBadge size={18} weight="duotone" /> {user?.role === 'teacher' ? t('teacher') : t('student')}</span>
          <h1>{user?.fullName}</h1>
          <p className="profile-head__meta">
            <span><EnvelopeSimple size={18} weight="duotone" /> {user?.email}</span>
            {user?.faculty && <span><Buildings size={18} weight="duotone" /> {user.faculty}</span>}
          </p>
        </div>
      </header>

      <div className="account">
        <form className="panel" onSubmit={onSave}>
          <h2 className="panel__title"><span><UserCircle size={26} weight="duotone" /> {t('profile')}</span></h2>

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
            <div><dt>{t('role')}</dt><dd>{user?.role === 'teacher' ? t('teacher') : t('student')}</dd></div>
          </dl>

          <div className="panel__actions">
            <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? t('saving') : t('save')}</button>
            {saved && <span className="ok-note" role="status">{t('saved')}</span>}
          </div>
        </form>

        <section className="panel" id="tarixce">
          <h2 className="panel__title">
            <span><ClockCounterClockwise size={26} weight="duotone" /> {t('activity')}</span>
            <span className="panel__count">{recentItems.length} {t('viewedCount')}</span>
          </h2>
          {recentItems.length === 0 ? (
            <p className="muted">{t('noRecent')}</p>
          ) : (
            <>
              <ul className="history">
                {recentItems.map((r) => (
                  <li key={r.serviceId}>
                    <Link to={`/beledci/${r.categoryId}/${r.serviceId}`}>
                      <FileText size={26} weight="duotone" className="history__icon" />
                      <span>
                        <strong>{r.svc.name}</strong>
                        <small>{r.svc.category.title} · {fmt.format(new Date(r.at))}</small>
                      </span>
                      <ArrowRight size={18} weight="bold" />
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
