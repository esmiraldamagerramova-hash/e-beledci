import { CaretRight } from '@phosphor-icons/react';

/**
 * Fayl sistemi sətri: başlığa klik etdikdə məzmun aşağı doğru açılır.
 */
export default function FsRow({ id, icon: IconC, tone = 'navy', name, meta, open, onToggle, children }) {
  return (
    <section className={`fsrow ${open ? 'is-open' : ''}`} id={id}>
      <button className="fsrow__head" onClick={onToggle} aria-expanded={open} aria-controls={`${id}-body`}>
        <CaretRight size={16} weight="bold" className="fsrow__chev" />
        <span className={`fsrow__icon tone-${tone}`}><IconC size={24} weight="duotone" /></span>
        <span className="fsrow__name">{name}</span>
        {meta && <span className="fsrow__meta">{meta}</span>}
      </button>
      <div className="fsrow__body" id={`${id}-body`} role="region" aria-label={name}>
        <div className="fsrow__inner">
          <div className="fsrow__pad">{children}</div>
        </div>
      </div>
    </section>
  );
}
