import { BookOpen } from 'lucide-react';
import { courses, allLessons } from '../data/courses.js';
import { useProgress } from '../hooks/useProgress.js';
import { Breadcrumbs, PageHeader, ProgressBar } from '../components/ui.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Trainings() {
  const { isDone } = useProgress();
  const lessons = courses.flatMap(allLessons);
  const done = lessons.filter((l) => isDone(l.id)).length;
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Təlimlər' }]} />
      <PageHeader title="Təlimlər" subtitle="Elektron xidmətlərdən istifadəni addım-addım öyrədən modullar. İrəliləyişiniz bu brauzerdə yadda saxlanılır." icon={BookOpen} />
      <div className="card mb-6 p-5">
        <div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-unec-900">Ümumi irəliləyiş</span><span className="text-slate-500">{done} / {lessons.length} dərs</span></div>
        <ProgressBar value={lessons.length ? (done / lessons.length) * 100 : 0} />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  );
}
