import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ListChecks, RotateCcw, GraduationCap } from 'lucide-react';
import { student } from '../data/profile.js';
import { courses, allLessons } from '../data/courses.js';
import { useProgress } from '../hooks/useProgress.js';
import { Breadcrumbs, EmptyState, ProgressBar, SectionCard } from '../components/ui.jsx';
import { courseProgress } from '../components/CourseCard.jsx';

const fmt = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};

export default function Profile() {
  const { done, isDone, results, reset } = useProgress();
  const lessons = courses.flatMap((c) => allLessons(c).map((l) => ({ ...l, course: c })));
  const completed = lessons.filter((l) => done[l.id]).sort((a, b) => done[b.id].localeCompare(done[a.id]));
  const overall = lessons.length ? (completed.length / lessons.length) * 100 : 0;
  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.percent, 0) / results.length) : 0;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Profil' }]} />
      <header className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-unec-800 text-2xl font-extrabold text-white ring-4 ring-unec-100">{student.initials}</span>
        <div className="flex-1">
          <span className="chip bg-amber-50 text-amber-700">Nümunə profil</span>
          <h1 className="mt-2 text-2xl sm:text-3xl">{student.name}</h1>
          <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><GraduationCap size={16} /> {student.faculty}</span>
            <span>{student.group}</span><span>{student.course}</span>
          </p>
        </div>
        <button onClick={() => window.confirm('Bütün irəliləyiş və test nəticələri silinsin?') && reset()} className="btn-outline"><RotateCcw size={16} /> Sıfırla</button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {[[completed.length, 'tamamlanmış dərs', CheckCircle2], [`${Math.round(overall)}%`, 'ümumi irəliləyiş', BookOpen], [results.length ? `${avg}%` : '—', `orta test nəticəsi`, ListChecks]].map(([v, l, I]) => (
          <div key={l} className="card flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-unec-100 text-unec-700"><I size={24} /></span>
            <div><p className="text-2xl font-extrabold text-unec-900">{v}</p><p className="text-sm text-slate-500">{l}</p></div>
          </div>
        ))}
      </div>

      <SectionCard title="Təlimlər üzrə irəliləyiş" icon={BookOpen} action={<Link to="/telimler" className="text-sm font-semibold text-unec-600 hover:underline">Təlimlər</Link>}>
        <ul className="space-y-4">
          {courses.map((c) => {
            const p = courseProgress(c, isDone);
            return (
              <li key={c.id}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <Link to={`/telimler/${c.id}`} className="font-semibold text-unec-900 hover:text-unec-600">{c.title}</Link>
                  <span className="shrink-0 text-slate-500">{p.done}/{p.total}</span>
                </div>
                <ProgressBar value={p.pct} />
              </li>
            );
          })}
        </ul>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Tamamlanmış dərslər" icon={CheckCircle2}>
          {completed.length ? (
            <ul className="divide-y divide-unec-100">
              {completed.map((l) => (
                <li key={l.id} className="flex items-start gap-3 py-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800">{l.title}</p>
                    <p className="text-xs text-slate-500">{l.course.title} · {fmt(done[l.id])}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={BookOpen} title="Hələ dərs tamamlanmayıb" text="Təlimlər bölməsində dərsləri tamamladıqca burada görünəcək." />}
        </SectionCard>

        <SectionCard title="Test nəticələri" icon={ListChecks}>
          {results.length ? (
            <ul className="divide-y divide-unec-100">
              {results.map((r, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <span className={`grid h-11 w-14 shrink-0 place-items-center rounded-lg text-sm font-bold ${r.percent >= 80 ? 'bg-emerald-50 text-emerald-700' : r.percent >= 50 ? 'bg-unec-100 text-unec-700' : 'bg-amber-50 text-amber-700'}`}>{r.percent}%</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-500">{r.score}/{r.total} düzgün · {fmt(r.date)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={ListChecks} title="Hələ test keçilməyib" text="Testlər bölməsindən biliklərinizi yoxlayın." />}
        </SectionCard>
      </div>
    </div>
  );
}
