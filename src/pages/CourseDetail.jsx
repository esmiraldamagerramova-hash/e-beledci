import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpenText, PlayCircle, FileText, CheckCircle2, Circle, ChevronDown, ListChecks, BookOpen, FolderOpen } from 'lucide-react';
import { getCourse } from '../data/courses.js';
import { useProgress } from '../hooks/useProgress.js';
import { Accordion, Breadcrumbs, FileItem, Icon, ProgressBar, VideoPlayer } from '../components/ui.jsx';
import { courseProgress } from '../components/CourseCard.jsx';
import NotFound from './NotFound.jsx';

const TYPE = {
  oxu: { icon: BookOpenText, label: 'Oxu materialı' },
  video: { icon: PlayCircle, label: 'Video' },
  fayl: { icon: FileText, label: 'Fayl' },
};

function Lesson({ lesson }) {
  const { isDone, toggle } = useProgress();
  const [open, setOpen] = useState(false);
  const done = isDone(lesson.id);
  const T = TYPE[lesson.type];
  return (
    <li className="rounded-lg bg-white">
      <div className="flex items-center gap-3 px-2 py-2.5">
        <button type="button" onClick={() => toggle(lesson.id)} aria-pressed={done}
          title={done ? 'Tamamlanmış kimi qeyd edilib' : 'Tamamlandı kimi qeyd et'}
          className={`shrink-0 rounded-full ${done ? 'text-emerald-600' : 'text-slate-300 hover:text-unec-500'}`}>
          {done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <T.icon size={18} className="shrink-0 text-unec-600" />
          <span className="min-w-0 flex-1">
            <span className={`block font-medium ${done ? 'text-slate-500' : 'text-slate-800'}`}>{lesson.title}</span>
            <span className="block text-xs text-slate-500">{T.label} · {lesson.duration}</span>
          </span>
          <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="space-y-4 border-t border-unec-100 px-3 py-4 sm:pl-12">
          {lesson.content && <p className="leading-relaxed text-slate-700">{lesson.content}</p>}
          {lesson.video && <VideoPlayer video={{ src: lesson.video, type: 'mp4' }} />}
          {lesson.file && <FileItem file={lesson.file} />}
          <button type="button" onClick={() => toggle(lesson.id)} className={done ? 'btn-outline' : 'btn-primary'}>
            <CheckCircle2 size={17} /> {done ? 'Tamamlanmadı kimi qeyd et' : 'Tamamlandı kimi qeyd et'}
          </button>
        </div>
      )}
    </li>
  );
}

export default function CourseDetail() {
  const { id } = useParams();
  const { isDone } = useProgress();
  const course = getCourse(id);
  if (!course) return <NotFound />;
  const p = courseProgress(course, isDone);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: 'Təlimlər', to: '/telimler' }, { label: course.title }]} />
        <header className="card overflow-hidden">
          <div className="flex flex-col gap-4 bg-unec-800 p-5 text-white sm:flex-row sm:items-center sm:p-7">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/10"><Icon name={course.icon} size={28} /></span>
            <div>
              <span className="chip bg-white/15 text-white">{course.level}</span>
              <h1 className="mt-2 text-2xl text-white sm:text-3xl">{course.title}</h1>
              <p className="mt-1 text-unec-100">{course.description}</p>
            </div>
          </div>
          <div className="p-5 sm:px-7">
            <div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-unec-900">İrəliləyiş</span><span className="text-slate-500">{p.done} / {p.total} dərs</span></div>
            <ProgressBar value={p.pct} />
          </div>
        </header>
      </div>

      <div className="space-y-3">
        {course.sections.map((s, i) => {
          const done = s.lessons.filter((l) => isDone(l.id)).length;
          return (
            <Accordion key={s.title} title={s.title} meta={`${done}/${s.lessons.length}`} icon={BookOpen} openIcon={FolderOpen} defaultOpen={i === 0}>
              <ul className="space-y-1.5 py-1">{s.lessons.map((l) => <Lesson key={l.id} lesson={l} />)}</ul>
            </Accordion>
          );
        })}
      </div>

      {p.done === p.total && (
        <div className="card flex flex-col items-start gap-4 border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center">
          <CheckCircle2 size={28} className="text-emerald-600" />
          <p className="flex-1 font-semibold text-emerald-900">Təbriklər! Bu təlimin bütün dərslərini tamamladınız.</p>
          <Link to="/testler" className="btn-primary"><ListChecks size={17} /> Testə keç</Link>
        </div>
      )}
    </div>
  );
}
