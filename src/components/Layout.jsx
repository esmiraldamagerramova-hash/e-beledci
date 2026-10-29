import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, BookOpen, ListChecks, UserRound, Menu, X, Mail, MapPin, ExternalLink } from 'lucide-react';
import { categories } from '../data/services.js';
import { student } from '../data/profile.js';
import { Icon, SearchBar } from './ui.jsx';

export const NAV = [
  { to: '/', label: 'Ana səhifə', icon: Home, end: true },
  { to: '/xidmetler', label: 'Elektron xidmətlər', icon: LayoutGrid },
  { to: '/telimler', label: 'Təlimlər', icon: BookOpen },
  { to: '/testler', label: 'Testlər', icon: ListChecks },
  { to: '/profil', label: 'Profil', icon: UserRound },
];

function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <img src="/unec-logo-192.jpg" alt="UNEC loqosu" width="44" height="44" className="h-11 w-11 shrink-0 rounded-full ring-2 ring-white/30" />
      <span className="min-w-0 leading-tight">
        <span className="block text-lg font-extrabold tracking-wide text-white">UNEC</span>
        <span className="block truncate text-xs font-medium text-unec-200">
          {compact && <span className="sm:hidden">Elektron Bələdçi</span>}
          <span className={compact ? 'hidden sm:inline' : ''}>Elektron Xidmətlər Haqqında Elektron Bələdçi</span>
        </span>
      </span>
    </Link>
  );
}

function SideNav({ onNavigate }) {
  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive ? 'bg-unec-800 text-white' : 'text-slate-700 hover:bg-unec-100 hover:text-unec-800'}`;
  return (
    <nav aria-label="Əsas menyu" className="flex flex-col gap-6">
      <ul className="flex flex-col gap-1">
        {NAV.map(({ to, label, icon: I, end }) => (
          <li key={to}><NavLink to={to} end={end} className={linkCls} onClick={onNavigate}><I size={19} /> {label}</NavLink></li>
        ))}
      </ul>
      <div>
        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Kateqoriyalar</p>
        <ul className="flex flex-col gap-0.5">
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={`/xidmetler?kateqoriya=${c.id}`} onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-unec-100 hover:text-unec-800">
                <Icon name={c.icon} size={17} className="text-unec-500" /> {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">Məzmuna keç</a>

      <header className="sticky top-0 z-40 bg-unec-800 shadow-md">
        <div className="container-page flex h-16 items-center gap-4">
          <button className="-ml-2 grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" onClick={() => setOpen(true)} aria-label="Menyunu aç">
            <Menu size={24} />
          </button>
          <Logo compact />
          <div className="ml-auto hidden w-full max-w-sm md:block"><SearchBar /></div>
          <Link to="/profil" className="ml-auto hidden items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-white hover:bg-white/10 sm:flex md:ml-0">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-unec-800">{student.initials}</span>
            <span className="hidden text-sm font-semibold xl:block">{student.name}</span>
          </Link>
        </div>
      </header>

      {/* Mobil menyu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-unec-950/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <aside className={`absolute inset-y-0 left-0 flex w-[min(320px,86vw)] flex-col bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between bg-unec-800 px-4 py-3">
            <Logo compact />
            <button onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white hover:bg-white/10" aria-label="Menyunu bağla"><X size={22} /></button>
          </div>
          <div className="border-b border-unec-100 p-4 md:hidden"><SearchBar /></div>
          <div className="flex-1 overflow-y-auto p-3"><SideNav onNavigate={() => setOpen(false)} /></div>
        </aside>
      </div>

      <div className="container-page flex flex-1 gap-8 py-6 lg:py-8">
        <aside className="sticky top-24 hidden h-fit w-60 shrink-0 lg:block">
          <div className="card p-3"><SideNav /></div>
        </aside>
        <main id="main" className="min-w-0 flex-1"><Outlet /></main>
      </div>

      <footer className="mt-8 bg-unec-900 text-unec-200">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/unec-logo-192.jpg" alt="" className="h-12 w-12 rounded-full ring-2 ring-white/20" />
              <div>
                <p className="font-extrabold text-white">Azərbaycan Dövlət İqtisad Universiteti</p>
                <p className="text-sm">Elektron Xidmətlər Haqqında Elektron Bələdçi</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-unec-200/80">
              Universitetin elektron xidmətlərindən istifadə üzrə təlimatlar, təlimlər və özünüyoxlama testləri.
            </p>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Bölmələr</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Əlaqə</p>
            <ul className="space-y-2 text-sm">
              <li><a href="https://unec.edu.az" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><ExternalLink size={15} /> unec.edu.az</a></li>
              <li className="flex items-center gap-2"><Mail size={15} /> Fakültənin İT dəstək xidməti</li>
              <li className="flex items-center gap-2"><MapPin size={15} /> Bakı, Azərbaycan</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="container-page py-4 text-xs text-unec-200/70">© {new Date().getFullYear()} UNEC · Elektron Bələdçi. Nümunə məlumatlarla hazırlanmış prototip.</p>
        </div>
      </footer>
    </div>
  );
}
