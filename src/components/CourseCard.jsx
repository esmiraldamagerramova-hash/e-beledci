import { Link } from 'react-router-dom';
import { ChevronRight, Layers } from 'lucide-react';
import { allLessons } from '../data/courses.js';
import { useProgress } from '../hooks/useProgress.js';
import { Icon, ProgressBar } from './ui.jsx';

export function courseProgress(course, isDone) {
  const lessons = allLessons(course);
  const done = lessons.filter((l) => isDone(l.id)).length;
  return { done, total: lessons.length, pct: lessons.length ? (done / lessons.length) * 100 : 0 };
}

export default function CourseCard({ course }) {
  const { isDone } = useProgress();
  const p = courseProgress(course, isDone);
  return (
    <Link to={`/telimler/${course.id}`} className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
      <div className="flex items-center gap-3 bg-unec-800 px-5 py-4 text-white">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10"><Icon name={course.icon} size={22} /></span>
        <span className="chip bg-white/15 text-white">{course.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug group-hover:text-unec-600">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{course.description}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Layers size={14} /> {course.sections.length} mövzu · {p.total} dərs · {p.done} tamamlanıb
        </p>
        <ProgressBar value={p.pct} className="mt-2" />
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-unec-600">
          {p.done ? 'Davam et' : 'Başla'} <ChevronRight size={16} />
        </span>
      </div>
    </Link>
  );
}
