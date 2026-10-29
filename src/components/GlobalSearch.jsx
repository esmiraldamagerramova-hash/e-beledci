import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, ArrowRight, FileText } from './icons.jsx';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import { allServices, normalize } from '../utils.js';

export default function GlobalSearch({ big = false, autoFocus = false, withButton = false }) {
  const { categories } = useGuide();
  const { t } = useLang();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const results = useMemo(() => {
    const nq = normalize(q);
    if (nq.length < 2) return [];
    return allServices(categories)
      .filter((s) => normalize(`${s.name} ${s.brief} ${s.category.title}`).includes(nq))
      .slice(0, 8);
  }, [q, categories]);

  useEffect(() => {
    const onDoc = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const go = (s) => { navigate(`/bolmeler/${s.category.id}/${s.id}`); setQ(''); setOpen(false); };

  const onKey = (e) => {
    if (e.key === 'Escape') return setOpen(false);
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
  };

  return (
    <form
      className={`search ${big ? 'search--big' : ''}`}
      ref={boxRef}
      role="search"
      onSubmit={(e) => { e.preventDefault(); if (results[active]) go(results[active]); else setOpen(true); }}
    >
      <MagnifyingGlass size={big ? 24 : 18} weight="bold" className="search__ic" />
      <input
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder={big ? t('searchBig') : t('search')}
        aria-label={t('search')}
      />
      {withButton && <button type="submit" className="search__btn">{t('searchBtn')}</button>}
      {open && q.length >= 2 && (
        <ul className="search__results" role="listbox">
          {results.length === 0 && <li className="search__empty">{t('noResults')}</li>}
          {results.map((s, i) => (
            <li key={`${s.category.id}-${s.id}`} role="option" aria-selected={i === active}>
              <button type="button" className={i === active ? 'is-active' : ''} onMouseEnter={() => setActive(i)} onClick={() => go(s)}>
                <FileText size={22} weight="duotone" className="search__file" />
                <span>
                  <strong>{s.name}</strong>
                  <small>{s.category.title}</small>
                </span>
                <ArrowRight size={16} weight="bold" className="search__go" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
