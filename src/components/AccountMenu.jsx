import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretDown, UserCircle, SignOut, ClockCounterClockwise, CourseIc, BrushIc } from './icons.jsx';
import { useAuth, initials } from '../context/AuthContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const role = user?.role === 'teacher' ? t('teacher') : t('student');

  return (
    <div className="acct" ref={ref}>
      <button className="acct__btn" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu">
        <span className="avatar">{initials(user)}</span>
        <span className="acct__name">
          {user?.fullName}
          <small>{role}</small>
        </span>
        <CaretDown size={14} weight="bold" className={`acct__chev ${open ? 'flip' : ''}`} />
      </button>
      {open && (
        <div className="acct__menu" role="menu">
          <div className="acct__head">
            <span className="avatar avatar--lg">{initials(user)}</span>
            <div>
              <strong>{user?.fullName}</strong>
              <span>{role} · {user?.email}</span>
            </div>
          </div>
          <Link to="/hesabim" role="menuitem" onClick={() => setOpen(false)}>
            <UserCircle size={20} weight="duotone" /> {t('myAccount')}
          </Link>
          <Link to="/hesabim#kurslar" role="menuitem" onClick={() => setOpen(false)}>
            <CourseIc size={20} /> {t('myCourses')}
          </Link>
          <Link to="/hesabim#dizayn" role="menuitem" onClick={() => setOpen(false)}>
            <BrushIc size={20} /> {t('designTitle')}
          </Link>
          <Link to="/hesabim#tarixce" role="menuitem" onClick={() => setOpen(false)}>
            <ClockCounterClockwise size={20} weight="duotone" /> {t('recent')}
          </Link>
          <button role="menuitem" onClick={logout} className="acct__logout">
            <SignOut size={20} weight="duotone" /> {t('logout')}
          </button>
        </div>
      )}
    </div>
  );
}
