import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, ClipboardCheck, Video, UserCog, Library, Landmark, Search, ChevronDown, ChevronRight,
  FileText, Presentation, File, Download, ExternalLink, Globe, Home, PlayCircle, FolderOpen, Folder,
} from 'lucide-react';

const ICONS = { GraduationCap, ClipboardCheck, Video, UserCog, Library, Landmark };

export function Icon({ name, ...props }) {
  const C = ICONS[name] || FileText;
  return <C {...props} />;
}

export function CategoryBadge({ category, className = '' }) {
  if (!category) return null;
  return (
    <span className={`chip bg-unec-100 text-unec-700 ${className}`}>
      <Icon name={category.icon} size={14} /> {category.name}
    </span>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Naviqasiya yolu" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-500">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-unec-700"><Home size={15} /> Ana səhifə</Link>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          <ChevronRight size={14} className="text-slate-400" />
          {it.to ? <Link to={it.to} className="hover:text-unec-700">{it.label}</Link> : <span className="font-medium text-unec-900">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ title, subtitle, icon: I, children }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        {I && <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-unec-800 text-white"><I size={24} /></span>}
        <div>
          <h1 className="text-2xl sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 max-w-2xl text-slate-600">{subtitle}</p>}
        </div>
      </div>
      {children}
    </header>
  );
}

export function SearchBar({ value, large = false, onSearch }) {
  const [inner, setInner] = useState('');
  const q = value ?? inner;
  const setQ = value === undefined ? setInner : () => {};
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
    else navigate(`/xidmetler${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
  };
  return (
    <form onSubmit={submit} role="search" className="relative flex w-full">
      <Search size={large ? 22 : 18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value); }}
        placeholder="Xidmət axtarın: məsələn, «tapşırıq», «Zoom», «parol»"
        aria-label="Xidmət axtar"
        className={`input pr-28 ${large ? 'h-14 pl-12 text-base' : 'h-11 pl-10'}`}
      />
      {!onSearch && (
        <button type="submit" className={`btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 ${large ? 'h-11 px-6' : 'h-8 px-3 text-xs'}`}>Axtar</button>
      )}
    </form>
  );
}

export function Domain({ domain, className = '' }) {
  if (!domain) {
    return <span className={`inline-flex items-center gap-1.5 text-sm text-slate-400 ${className}`}><Globe size={15} /> Rəsmi domen əlavə olunacaq</span>;
  }
  return (
    <a href={domain.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-sm font-medium text-unec-600 hover:text-unec-800 hover:underline ${className}`}>
      <Globe size={15} /> {domain.label} <ExternalLink size={13} />
    </a>
  );
}

export function ServiceCard({ service, category }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-shadow hover:shadow-lift">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-unec-100 text-unec-700">
          <Icon name={category?.icon} size={22} />
        </span>
        <div className="flex gap-1.5">
          {service.video && <span title="Video var" className="grid h-7 w-7 place-items-center rounded-full bg-unec-50 text-unec-600"><PlayCircle size={15} /></span>}
          {(service.slides || service.materials) && <span title="Fayllar var" className="grid h-7 w-7 place-items-center rounded-full bg-unec-50 text-unec-600"><FolderOpen size={15} /></span>}
        </div>
      </div>
      <h3 className="text-lg leading-snug">{service.name}</h3>
      <Domain domain={service.domain} className="mt-1" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{service.brief}</p>
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-unec-100 pt-4">
        <CategoryBadge category={category} className="truncate" />
        <Link to={`/xidmetler/${service.id}`} className="btn-outline shrink-0 px-3 py-2">Ətraflı bax <ChevronRight size={16} /></Link>
      </div>
    </article>
  );
}

export function Accordion({ title, meta, icon: I = Folder, openIcon: OI = FolderOpen, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const Ic = open ? OI : I;
  return (
    <div className="overflow-hidden rounded-xl border border-unec-100 bg-white">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-unec-50">
        <ChevronDown size={18} className={`shrink-0 text-unec-600 transition-transform ${open ? '' : '-rotate-90'}`} />
        <Ic size={20} className="shrink-0 text-unec-600" />
        <span className="flex-1 font-semibold text-unec-900">{title}</span>
        {meta && <span className="text-xs font-medium text-slate-500">{meta}</span>}
      </button>
      {open && <div className="border-t border-unec-100 bg-unec-50/50 px-2 py-2 sm:px-4">{children}</div>}
    </div>
  );
}

const FILE_TYPES = {
  pdf: { label: 'PDF', icon: FileText, cls: 'bg-red-50 text-red-700' },
  pptx: { label: 'PPTX', icon: Presentation, cls: 'bg-orange-50 text-orange-700' },
  ppt: { label: 'PPT', icon: Presentation, cls: 'bg-orange-50 text-orange-700' },
  docx: { label: 'DOCX', icon: FileText, cls: 'bg-blue-50 text-blue-700' },
  doc: { label: 'DOC', icon: FileText, cls: 'bg-blue-50 text-blue-700' },
};

export function FileItem({ file }) {
  const t = FILE_TYPES[file.type] || { label: file.type.toUpperCase(), icon: File, cls: 'bg-slate-100 text-slate-600' };
  const I = t.icon;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-white sm:flex-nowrap">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${t.cls}`}><I size={20} /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-800">{file.name}</p>
        <p className="text-xs text-slate-500">{t.label}{file.size && ` · ${file.size}`}</p>
      </div>
      <div className="flex gap-2">
        {file.type === 'pdf' && (
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="btn-ghost px-3 py-1.5"><ExternalLink size={15} /> Aç</a>
        )}
        <a href={file.url} download className="btn-outline px-3 py-1.5"><Download size={15} /> Yüklə</a>
      </div>
    </div>
  );
}

export function FileList({ files }) {
  return <div className="divide-y divide-unec-100">{files.map((f) => <FileItem key={f.url + f.name} file={f} />)}</div>;
}

const isEmbeddable = (src) => /^https:\/\/(www\.)?(youtube\.com\/embed|youtube-nocookie\.com\/embed|player\.vimeo\.com\/video)\//.test(src);

export function VideoPlayer({ video }) {
  if (!video?.src) return null;
  if (video.type === 'embed' || isEmbeddable(video.src)) {
    if (!isEmbeddable(video.src)) return null;
    return (
      <div className="aspect-video overflow-hidden rounded-xl bg-unec-950">
        <iframe src={video.src} title={video.title || 'Video'} className="h-full w-full" allowFullScreen
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" loading="lazy" />
      </div>
    );
  }
  return (
    <video controls preload="metadata" className="aspect-video w-full rounded-xl bg-unec-950">
      <source src={video.src} type="video/mp4" />
      Brauzeriniz video formatını dəstəkləmir.
    </video>
  );
}

export function ProgressBar({ value, className = '' }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-unec-100" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-unec-600 transition-all" style={{ width: `${v}%` }} />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-unec-700">{v}%</span>
    </div>
  );
}

export function EmptyState({ icon: I = Search, title, text, children }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-unec-100 text-unec-600"><I size={26} /></span>
      <h3 className="text-lg">{title}</h3>
      {text && <p className="mt-1 max-w-md text-sm text-slate-600">{text}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function SectionCard({ title, icon: I, children, action, id }) {
  return (
    <section id={id} className="card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-lg">{I && <I size={20} className="text-unec-600" />}{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
