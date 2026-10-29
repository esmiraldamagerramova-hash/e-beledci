import { Link } from 'react-router-dom';
import { ListChecks, ChevronRight, HelpCircle, Trophy } from 'lucide-react';
import { quizzes } from '../data/quizzes.js';
import { useProgress } from '../hooks/useProgress.js';
import { Breadcrumbs, PageHeader } from '../components/ui.jsx';

export default function Tests() {
  const { results } = useProgress();
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Testlər' }]} />
      <PageHeader title="Testlər" subtitle="Çoxseçimli testlərlə elektron xidmətlər üzrə biliklərinizi yoxlayın." icon={ListChecks} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {quizzes.map((q) => {
          const mine = results.filter((r) => r.quizId === q.id);
          const best = mine.length ? Math.max(...mine.map((r) => r.percent)) : null;
          return (
            <article key={q.id} className="card flex flex-col p-5">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-unec-100 text-unec-700"><ListChecks size={22} /></span>
              <h3 className="text-lg">{q.title}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-600">{q.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="chip bg-unec-50 text-unec-700"><HelpCircle size={14} /> {q.questions.length} sual</span>
                {best !== null && <span className="chip bg-emerald-50 text-emerald-700"><Trophy size={14} /> Ən yaxşı: {best}%</span>}
              </div>
              <Link to={`/testler/${q.id}`} className="btn-primary mt-5">{mine.length ? 'Yenidən keç' : 'Testə başla'} <ChevronRight size={16} /></Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
