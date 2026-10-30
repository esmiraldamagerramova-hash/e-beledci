import { useState } from 'react';
import { ChevronDown, ExternalLink, FileText, PlayCircle, Presentation } from 'lucide-react';
import { systems } from './data/systems.js';
import { Markdown, SlidesSlot, TreeNode, VideoSlot } from './components/ui.jsx';

function SystemRow({ system }) {
  const [open, setOpen] = useState(false);
  const { name, domain, description, docs, video, slides } = system;
  return (
    <li className="card overflow-hidden">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-4 text-left hover:bg-unec-50 sm:grid-cols-[10rem_14rem_1fr_auto] sm:px-6">
        <span className="text-lg font-extrabold text-unec-900">{name}</span>
        <ChevronDown size={22} className={`row-span-3 shrink-0 text-unec-600 transition-transform sm:order-last sm:row-span-1 ${open ? 'rotate-180' : ''}`} />
        <span className="truncate text-sm font-medium text-unec-600">{domain || 'Ünvan əlavə olunacaq'}</span>
        <span className="text-sm text-slate-600">{description}</span>
      </button>

      {open && (
        <div className="border-t border-unec-100 px-3 py-3 sm:px-5">
          {domain && (
            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer"
              className="mb-2 ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-unec-600 hover:underline">
              {domain} saytına keç <ExternalLink size={14} />
            </a>
          )}
          <ul>
            {docs.map((d, i) => (
              <TreeNode key={d.title} title={d.title} icon={FileText} defaultOpen={i === 0}>
                <Markdown source={d.md} />
              </TreeNode>
            ))}
            <TreeNode title="Video" icon={PlayCircle}><VideoSlot video={video} /></TreeNode>
            <TreeNode title="Slaydlar (PPTX)" icon={Presentation}><SlidesSlot slides={slides} /></TreeNode>
          </ul>
        </div>
      )}
    </li>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-unec-800 shadow-md">
        <div className="container-page flex h-16 items-center gap-3">
          <img src="/unec-logo-192.jpg" alt="UNEC loqosu" width="44" height="44" className="h-11 w-11 shrink-0 rounded-full ring-2 ring-white/30" />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-wide text-white">UNECGuide</span>
            <span className="block text-xs font-medium text-unec-200">Elektron Bələdçi</span>
          </span>
        </div>
      </header>

      <main className="container-page flex-1 py-8">
        <h1 className="text-2xl sm:text-3xl">Elektron xidmətlər haqqında elektron bələdçi</h1>
        <p className="mt-1 text-slate-600">Sistemin adına basın — haqqında məlumat, əməliyyatlar, video və slaydlar açılacaq.</p>
        <ul className="mt-6 space-y-3">
          {systems.map((s) => <SystemRow key={s.id} system={s} />)}
        </ul>
      </main>

      <footer className="bg-unec-900">
        <p className="container-page py-4 text-xs text-unec-200/70">© {new Date().getFullYear()} UNECGuide · UNEC Elektron Bələdçi</p>
      </footer>
    </div>
  );
}
