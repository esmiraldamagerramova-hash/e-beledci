import { Fragment, useState } from 'react';
import { ChevronDown, Download, ExternalLink, FileText, Presentation, PlayCircle } from 'lucide-react';

// Ağac düyünü: başlığa basanda altındakı məzmun açılır/bağlanır
export function TreeNode({ title, icon: I, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-unec-900 hover:bg-unec-50">
        <ChevronDown size={16} className={`shrink-0 text-unec-600 transition-transform ${open ? '' : '-rotate-90'}`} />
        {I && <I size={17} className="shrink-0 text-unec-600" />}
        {title}
      </button>
      {open && <div className="mb-2 ml-[15px] border-l-2 border-unec-100 pb-1 pl-4 pt-1">{children}</div>}
    </li>
  );
}

// Sadə markdown: başlıqlar, siyahılar, sitat, paraqraf, **qalın**, `kod`, [link](url)
function inline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('`')) return <code key={i} className="rounded bg-unec-100 px-1 text-[0.9em]">{p.slice(1, -1)}</code>;
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-unec-600 underline">{link[1]}</a>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export function Markdown({ source }) {
  const blocks = [];
  let list = null;
  const flush = () => { if (list) { blocks.push(list); list = null; } };
  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trim();
    const ul = line.match(/^[-*]\s+(.*)/);
    const ol = line.match(/^\d+\.\s+(.*)/);
    if (ul || ol) {
      const kind = ul ? 'ul' : 'ol';
      if (list?.kind !== kind) { flush(); list = { kind, items: [] }; }
      list.items.push((ul || ol)[1]);
      continue;
    }
    flush();
    if (!line) continue;
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) blocks.push({ kind: `h${h[1].length}`, text: h[2] });
    else if (line.startsWith('>')) blocks.push({ kind: 'quote', text: line.replace(/^>\s*/, '') });
    else blocks.push({ kind: 'p', text: line });
  }
  flush();

  return (
    <div className="space-y-3 text-sm leading-relaxed text-slate-700">
      {blocks.map((b, i) => {
        if (b.kind === 'h1') return <h3 key={i} className="text-lg">{inline(b.text)}</h3>;
        if (b.kind === 'h2') return <h4 key={i} className="pt-2 text-base">{inline(b.text)}</h4>;
        if (b.kind === 'h3') return <h5 key={i} className="font-bold text-unec-900">{inline(b.text)}</h5>;
        if (b.kind === 'quote') return <p key={i} className="rounded-lg border-l-4 border-amber-300 bg-amber-50 px-3 py-2 text-amber-900">{inline(b.text)}</p>;
        if (b.kind === 'ul') return <ul key={i} className="list-disc space-y-1 pl-5">{b.items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>;
        if (b.kind === 'ol') return <ol key={i} className="list-decimal space-y-1 pl-5">{b.items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ol>;
        return <p key={i}>{inline(b.text)}</p>;
      })}
    </div>
  );
}

function EmptySlot({ icon: I, text }) {
  return (
    <div className="grid place-items-center gap-2 rounded-xl border-2 border-dashed border-unec-200 bg-unec-50/60 px-4 py-10 text-center text-sm text-slate-500">
      <I size={28} className="text-unec-400" />
      {text}
    </div>
  );
}

const isEmbed = (src) => /^https:\/\/(www\.)?(youtube\.com\/embed|youtube-nocookie\.com\/embed|player\.vimeo\.com\/video)\//.test(src);

export function VideoSlot({ video }) {
  if (!video?.src) return <EmptySlot icon={PlayCircle} text="Video yeri — video əlavə olunacaq" />;
  if (isEmbed(video.src)) {
    return (
      <div className="aspect-video max-w-2xl overflow-hidden rounded-xl bg-unec-950">
        <iframe src={video.src} title={video.title || 'Video'} className="h-full w-full" allowFullScreen loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
      </div>
    );
  }
  return (
    <video controls preload="metadata" className="aspect-video w-full max-w-2xl rounded-xl bg-unec-950">
      <source src={video.src} type="video/mp4" />
      Brauzeriniz video formatını dəstəkləmir.
    </video>
  );
}

export function SlidesSlot({ slides }) {
  if (!slides?.length) return <EmptySlot icon={Presentation} text="Slayd yeri — PPTX təqdimat əlavə olunacaq" />;
  return (
    <ul className="space-y-2">
      {slides.map((f) => {
        const I = f.type === 'pdf' ? FileText : Presentation;
        return (
          <li key={f.url} className="flex flex-wrap items-center gap-3 rounded-xl border border-unec-100 bg-white p-3 sm:flex-nowrap">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-700"><I size={20} /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-800">{f.name}</p>
              <p className="text-xs text-slate-500">{f.type.toUpperCase()}{f.size && ` · ${f.size}`}</p>
            </div>
            <div className="flex gap-2">
              {f.type === 'pdf' && <a href={f.url} target="_blank" rel="noopener noreferrer" className="btn-ghost px-3 py-1.5"><ExternalLink size={15} /> Aç</a>}
              <a href={f.url} download className="btn-outline px-3 py-1.5"><Download size={15} /> Yüklə</a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
