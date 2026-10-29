import { Link } from 'react-router-dom';
import { LayoutGrid, BookOpen, ListChecks, UserRound, ChevronRight, ArrowRight } from 'lucide-react';
import { categories, services, getCategory } from '../data/services.js';
import { courses } from '../data/courses.js';
import { quizzes } from '../data/quizzes.js';
import { Icon, SearchBar, ServiceCard } from '../components/ui.jsx';
import CourseCard from '../components/CourseCard.jsx';

const QUICK = [
  { to: '/xidmetler', title: 'Elektron xidmətlər', text: 'Bütün xidmətlərin siyahısı və təlimatları', icon: LayoutGrid },
  { to: '/telimler', title: 'Təlimlər', text: 'Addım-addım öyrədici modullar', icon: BookOpen },
  { to: '/testler', title: 'Testlər', text: 'Biliklərinizi yoxlayın', icon: ListChecks },
  { to: '/profil', title: 'Profil', text: 'Tamamlanan dərslər və irəliləyiş', icon: UserRound },
];

function SectionHead({ title, text, to }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="section-title">{title}</h2>
        {text && <p className="mt-1 text-sm text-slate-600">{text}</p>}
      </div>
      {to && <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-unec-600 hover:text-unec-800">Hamısına bax <ArrowRight size={16} /></Link>}
    </div>
  );
}

export default function Home() {
  const featured = services.filter((s) => s.featured);
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-unec-800 text-white">
        <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-unec-200">Azərbaycan Dövlət İqtisad Universiteti</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Elektron Xidmətlər Haqqında<br className="hidden sm:block" /> Elektron Bələdçi
            </h1>
            <p className="mt-4 max-w-2xl text-unec-100">
              Xoş gəlmisiniz! Universitetin elektron xidmətlərindən necə istifadə etməyi buradan öyrənin: hər xidmətin adı, domeni, qısa təsviri, ətraflı izahı, video və fayllar.
            </p>
            <div className="mt-6 max-w-2xl"><SearchBar large /></div>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[[services.length, 'xidmət'], [categories.length, 'kateqoriya'], [courses.length, 'təlim'], [quizzes.length, 'test']].map(([n, l]) => (
                <div key={l} className="flex items-baseline gap-1.5"><dt className="text-2xl font-extrabold">{n}</dt><dd className="text-unec-200">{l}</dd></div>
              ))}
            </dl>
          </div>
          <img src="/unec-logo.jpg" alt="UNEC loqosu" className="hidden h-56 w-56 rounded-full ring-8 ring-white/10 lg:block" />
        </div>
      </section>

      <section aria-label="Sürətli keçid" className="grid gap-4 sm:grid-cols-2">
        {QUICK.map(({ to, title, text, icon: I }) => (
          <Link key={to} to={to} className="card group flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-unec-100 text-unec-700 group-hover:bg-unec-800 group-hover:text-white"><I size={24} /></span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-unec-900">{title}</span>
              <span className="block text-sm text-slate-500">{text}</span>
            </span>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-unec-600" />
          </Link>
        ))}
      </section>

      <section>
        <SectionHead title="Xidmət kateqoriyaları" text="Xidmətlər istifadə sahəsinə görə qruplaşdırılıb" to="/xidmetler" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((c) => {
            const n = services.filter((s) => s.categoryId === c.id).length;
            return (
              <Link key={c.id} to={`/xidmetler?kateqoriya=${c.id}`} className="card group flex items-start gap-4 p-5 transition-shadow hover:shadow-lift">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-unec-800 text-white"><Icon name={c.icon} size={24} /></span>
                <span className="min-w-0">
                  <span className="block font-bold text-unec-900 group-hover:text-unec-600">{c.name}</span>
                  <span className="mt-0.5 block text-sm text-slate-500">{c.description}</span>
                  <span className="mt-2 block text-xs font-semibold text-unec-600">{n} xidmət</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHead title="Seçilmiş xidmətlər" text="Ən çox müraciət olunan elektron xidmətlər" to="/xidmetler" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((s) => <ServiceCard key={s.id} service={s} category={getCategory(s.categoryId)} />)}
        </div>
      </section>

      <section>
        <SectionHead title="Tədris materialları" text="Xidmətlərdən istifadəni öyrədən təlim modulları" to="/telimler" />
        <div className="grid gap-5 md:grid-cols-2">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
    </div>
  );
}
