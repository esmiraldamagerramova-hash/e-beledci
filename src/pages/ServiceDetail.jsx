import { Link, useParams } from 'react-router-dom';
import { Info, PlayCircle, FolderOpen, ListOrdered, Tag, Globe, AlignLeft, Presentation, BookOpen } from 'lucide-react';
import { services, getService, getCategory } from '../data/services.js';
import { Accordion, Breadcrumbs, CategoryBadge, Domain, FileList, Icon, SectionCard, ServiceCard, VideoPlayer } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

function Row({ icon: I, label, children }) {
  return (
    <div className="grid gap-1 border-b border-unec-100 py-3.5 last:border-0 sm:grid-cols-[160px_1fr] sm:gap-4">
      <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500"><I size={16} className="text-unec-500" /> {label}</dt>
      <dd className="text-slate-800">{children}</dd>
    </div>
  );
}

export default function ServiceDetail() {
  const { id } = useParams();
  const s = getService(id);
  if (!s) return <NotFound />;
  const cat = getCategory(s.categoryId);
  const related = services.filter((x) => x.categoryId === s.categoryId && x.id !== s.id).slice(0, 3);
  const hasFiles = s.slides?.length || s.materials?.length;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: 'Elektron xidmətlər', to: '/xidmetler' }, { label: s.name }]} />
        <header className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-7">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-unec-800 text-white"><Icon name={cat?.icon} size={32} /></span>
          <div className="min-w-0 flex-1">
            <CategoryBadge category={cat} />
            <h1 className="mt-2 text-2xl sm:text-3xl">{s.name}</h1>
            <p className="mt-2 text-slate-600">{s.brief}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {s.domain && <a href={s.domain.url} target="_blank" rel="noopener noreferrer" className="btn-primary"><Globe size={17} /> Sayta keç</a>}
              {s.video && <a href="#video" className="btn-outline"><PlayCircle size={17} /> Video</a>}
              {hasFiles && <a href="#fayllar" className="btn-outline"><FolderOpen size={17} /> Fayllar</a>}
            </div>
          </div>
        </header>
      </div>

      <SectionCard title="Xidmət haqqında" icon={Info}>
        <dl>
          <Row icon={Tag} label="Adı">{s.name}</Row>
          <Row icon={Globe} label="Domain"><Domain domain={s.domain} /></Row>
          <Row icon={AlignLeft} label="Brief">{s.brief}</Row>
          <Row icon={Info} label="Haqqında"><div className="prose-az">{s.about.map((p, i) => <p key={i}>{p}</p>)}</div></Row>
        </dl>
      </SectionCard>

      {s.video && (
        <SectionCard id="video" title="Video təlimat" icon={PlayCircle}>
          <VideoPlayer video={s.video} />
          {s.video.title && <p className="mt-3 text-sm text-slate-500">{s.video.title}</p>}
        </SectionCard>
      )}

      {hasFiles ? (
        <SectionCard id="fayllar" title="Slaydlar və fayllar" icon={FolderOpen}>
          <div className="space-y-3">
            {s.slides?.length > 0 && (
              <Accordion title="Slaydlar" meta={`${s.slides.length} fayl`} defaultOpen><FileList files={s.slides} /></Accordion>
            )}
            {s.materials?.length > 0 && (
              <Accordion title="Əlavə tədris materialları" meta={`${s.materials.length} fayl`}><FileList files={s.materials} /></Accordion>
            )}
          </div>
        </SectionCard>
      ) : null}

      {s.steps?.length > 0 && (
        <SectionCard title="İstifadə qaydası" icon={ListOrdered}>
          <ol className="space-y-3">
            {s.steps.map((st, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-unec-100 text-sm font-bold text-unec-700">{i + 1}</span>
                <span className="pt-0.5 text-slate-700">{st}</span>
              </li>
            ))}
          </ol>
        </SectionCard>
      )}

      <div className="card flex flex-col items-start gap-4 bg-unec-100/60 p-5 sm:flex-row sm:items-center">
        <BookOpen size={28} className="shrink-0 text-unec-700" />
        <p className="flex-1 text-sm text-unec-900">Bu mövzu üzrə təlim modulları və testlərlə biliklərinizi möhkəmləndirin.</p>
        <div className="flex gap-2">
          <Link to="/telimler" className="btn-outline"><Presentation size={16} /> Təlimlər</Link>
          <Link to="/testler" className="btn-primary">Testlər</Link>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="section-title mb-4">Oxşar xidmətlər</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((x) => <ServiceCard key={x.id} service={x} category={cat} />)}
          </div>
        </section>
      )}
    </div>
  );
}
