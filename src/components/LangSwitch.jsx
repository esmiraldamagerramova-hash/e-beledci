import { useLang } from '../i18n/LangContext.jsx';

/** AZ | EN | RU — hər səhifədə dil seçimi */
export default function LangSwitch({ tone = 'dark' }) {
  const { lang, setLang, langs, t } = useLang();
  return (
    <div className={`langs langs--${tone}`} role="group" aria-label={t('language')}>
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className={lang === l.code ? 'is-active' : ''}
          aria-pressed={lang === l.code}
          title={l.label}
          onClick={() => setLang(l.code)}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
