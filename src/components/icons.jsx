/**
 * Saytın öz minimal ikon dəsti (xarici kitabxana yoxdur).
 * Nazik xətt, kvadrat uclar — sakit, rəsmi görünüş üçün.
 */
const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
  focusable: 'false',
});

const make = (paths) =>
  function Icon({ size = 18, className, ...rest }) {
    return <svg {...base(size)} className={className} {...rest}>{paths}</svg>;
  };

export const ISearch = make(<><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></>);
export const IChevronRight = make(<path d="M9 5l7 7-7 7" />);
export const IChevronLeft = make(<path d="M15 5l-7 7 7 7" />);
export const IChevronDown = make(<path d="M5 9l7 7 7-7" />);
export const IArrowRight = make(<path d="M4 12h15M13 6l6 6-6 6" />);
export const IArrowUpRight = make(<path d="M7 17L17 7M9 7h8v8" />);
export const IEye = make(<><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></>);
export const IEyeOff = make(<><path d="M3 3l18 18" /><path d="M10.6 5.6c.5-.1.9-.1 1.4-.1C18.4 5.5 22 12 22 12a17 17 0 01-3.2 3.9M6.4 7.1A16.6 16.6 0 002 12s3.6 6.5 10 6.5c1.6 0 3-.4 4.2-1" /></>);
export const IMenu = make(<path d="M3 6h18M3 12h18M3 18h12" />);
export const IClose = make(<path d="M5 5l14 14M19 5L5 19" />);
export const ICopy = make(<><rect x="8" y="8" width="12" height="12" /><path d="M16 8V4H4v12h4" /></>);
export const ICheck = make(<path d="M4 12.5l5 5L20 6.5" />);
export const ILogout = make(<><path d="M14 4H4v16h10" /><path d="M10 12h11M17 8l4 4-4 4" /></>);
export const IExpand = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />);
export const IDownload = make(<path d="M12 4v11M7 10l5 5 5-5M4 20h16" />);
export const IGlobe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.8 3.8 5.8 3.8 9s-1.2 6.2-3.8 9c-2.6-2.8-3.8-5.8-3.8-9S9.4 5.8 12 3z" /></>);

/* Fayl sistemi qlifləri — dolğun, klassik görünüş */
export function IFolder({ size = 18, open = false, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {open ? (
        <>
          <path d="M2.5 6.5h7l2 2h10v2.5H6.2L2.5 19z" fill="#d9a441" />
          <path d="M6.2 11h16.3l-3.7 8.5H2.5z" fill="#e8b85a" />
        </>
      ) : (
        <>
          <path d="M2.5 5.5h7l2 2h10v12h-19z" fill="#d9a441" />
          <path d="M2.5 9h19v10.5h-19z" fill="#e8b85a" />
        </>
      )}
    </svg>
  );
}

export function IFile({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M5.5 2.5h9l4 4v15h-13z" fill="var(--file-bg, #fff)" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14.5 2.5v4h4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 11h8M8 14h8M8 17h5" stroke="currentColor" strokeWidth="1.1" opacity=".55" />
    </svg>
  );
}
