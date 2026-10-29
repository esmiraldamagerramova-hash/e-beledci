import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, PlayCircle, FolderOpen, X } from 'lucide-react';
import { categories, services, getCategory } from '../data/services.js';
import { Breadcrumbs, EmptyState, Icon, PageHeader, SearchBar, ServiceCard } from '../components/ui.jsx';

const norm = (s) => s.toLocaleLowerCase('az').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/ə/g, 'e');

export default function Services() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('kateqoriya') || '';
  const withVideo = params.get('video') === '1';
  const withFiles = params.get('fayl') === '1';

  const set = (key, val) => {
    const p = new URLSearchParams(params);
    if (val) p.set(key, val); else p.delete(key);
    setParams(p, { replace: true });
  };

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return services.filter((s) => {
      if (cat && s.categoryId !== cat) return false;
      if (withVideo && !s.video) return false;
      if (withFiles && !(s.slides || s.materials)) return false;
      if (!nq) return true;
      const c = getCategory(s.categoryId);
      return norm([s.name, s.brief, s.about.join(' '), s.domain?.label || '', c?.name || ''].join(' ')).includes(nq);
    });
  }, [q, cat, withVideo, withFiles]);

  const chip = (active) => `chip cursor-pointer border py-1.5 text-sm transition-colors ${active ? 'border-unec-800 bg-unec-800 text-white' : 'border-unec-200 bg-white text-slate-700 hover:border-unec-400'}`;
  const filtered = q || cat || withVideo || withFiles;

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Elektron xidmətlər' }]} />
      <PageHeader title="Elektron xidmətlər" subtitle="Universitetin elektron xidmətləri: adı, domeni, qısa təsviri və ətraflı məlumat." icon={LayoutGrid} />

      <div className="card mb-6 space-y-4 p-4 sm:p-5">
        <SearchBar value={q} onSearch={(v) => set('q', v)} />
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(!cat)} onClick={() => set('kateqoriya', '')}>Hamısı</button>
          {categories.map((c) => (
            <button key={c.id} type="button" className={chip(cat === c.id)} onClick={() => set('kateqoriya', cat === c.id ? '' : c.id)}>
              <Icon name={c.icon} size={15} /> {c.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-unec-100 pt-4">
          <span className="mr-1 text-sm font-semibold text-slate-600">Filtr:</span>
          <button type="button" className={chip(withVideo)} onClick={() => set('video', withVideo ? '' : '1')}><PlayCircle size={15} /> Video var</button>
          <button type="button" className={chip(withFiles)} onClick={() => set('fayl', withFiles ? '' : '1')}><FolderOpen size={15} /> Fayllar var</button>
          {filtered && (
            <button type="button" className="btn-ghost ml-auto px-3 py-1.5" onClick={() => setParams({}, { replace: true })}><X size={15} /> Sıfırla</button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-500" aria-live="polite">{list.length} xidmət tapıldı</p>
      {list.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => <ServiceCard key={s.id} service={s} category={getCategory(s.categoryId)} />)}
        </div>
      ) : (
        <EmptyState title="Heç nə tapılmadı" text="Axtarış sözünü dəyişin və ya filtrləri sıfırlayın.">
          <button className="btn-primary" onClick={() => setParams({}, { replace: true })}>Filtrləri sıfırla</button>
        </EmptyState>
      )}
    </div>
  );
}
