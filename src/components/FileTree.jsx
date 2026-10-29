import { useEffect, useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CaretRight, Folder, FolderOpen, FileText, PlayCircle, Presentation, MagnifyingGlass, X } from '@phosphor-icons/react';
import { useGuide } from '../context/GuideContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import { normalize } from '../utils.js';

/** Sol paneldəki "fayl sistemi" kimi açılan kataloq. */
export default function FileTree() {
  const { categories, loading } = useGuide();
  const { t } = useLang();
  const { categoryId } = useParams();
  const [open, setOpen] = useState(() => new Set(categoryId ? [categoryId] : []));
  const [q, setQ] = useState('');

  useEffect(() => {
    if (categoryId) setOpen((prev) => new Set(prev).add(categoryId));
  }, [categoryId]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return categories;
    return categories
      .map((c) => ({ ...c, services: c.services.filter((s) => normalize(`${s.name} ${s.brief}`).includes(nq)) }))
      .filter((c) => c.services.length || normalize(c.title).includes(nq));
  }, [categories, q]);

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allOpen = filtered.length > 0 && filtered.every((c) => open.has(c.id));

  return (
    <nav className="tree">
      <div className="tree__top">
        <span className="tree__title">{t('catalog')}</span>
        <button className="tree__all" onClick={() => setOpen(allOpen ? new Set() : new Set(filtered.map((c) => c.id)))}>
          {allOpen ? t('collapseAll') : t('expandAll')}
        </button>
      </div>

      <label className="tree__search">
        <MagnifyingGlass size={16} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('filter')} aria-label={t('filter')} />
        {q && <button type="button" onClick={() => setQ('')} aria-label={t('close')}><X size={14} /></button>}
      </label>

      {loading && <div className="tree__skeleton" />}

      <ul className="tree__root" role="tree">
        {filtered.map((c) => {
          const isOpen = open.has(c.id) || !!q;
          const FolderIc = isOpen ? FolderOpen : Folder;
          return (
            <li key={c.id} role="treeitem" aria-expanded={isOpen}>
              <div className={`tree__folder ${categoryId === c.id ? 'is-current' : ''}`}>
                <button className="tree__chevron" onClick={() => toggle(c.id)} aria-label={c.title}>
                  <CaretRight size={13} weight="bold" className={isOpen ? 'rot' : ''} />
                </button>
                <NavLink to={`/beledci/${c.id}`} end className="tree__folder-link" onClick={() => setOpen((p) => new Set(p).add(c.id))}>
                  <FolderIc size={20} weight="duotone" className="ic-folder" />
                  <span className="tree__label">{c.title}</span>
                  <span className="tree__count">{c.services.length}</span>
                </NavLink>
              </div>

              <div className={`tree__children ${isOpen ? 'is-open' : ''}`}>
                <ul role="group">
                  {c.services.map((s) => (
                    <li key={s.id} role="treeitem">
                      <NavLink to={`/beledci/${c.id}/${s.id}`} className="tree__file">
                        <FileText size={17} weight="duotone" className="ic-file" />
                        <span className="tree__label">{s.name}</span>
                        <span className="tree__marks">
                          {s.video && <PlayCircle size={16} weight="fill" className="ic-video" aria-label={t('video')} />}
                          {s.slides && <Presentation size={16} weight="fill" className="ic-slides" aria-label={t('slides')} />}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      {!loading && filtered.length === 0 && <p className="tree__empty">{t('nothing')}</p>}
    </nav>
  );
}
