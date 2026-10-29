/**
 * Saytın ikon dəsti — Microsoft Fluent UI Icons.
 *  - "Regular" ikonlar: birrəngli xətti ikonlar (bölmələr, kartlar, bloklar) — rəngi CSS-dən gəlir
 *  - "Regular/Filled" ikonlar: interfeys düymələri (oxlar, axtarış, menyu)
 * Komponentlər bir yerdə saxlanılır ki, lazım olsa ikonları asanlıqla dəyişəsiniz.
 */
import {
  // UI
  Navigation24Regular, Dismiss24Regular, Search24Regular, ChevronDown20Regular, ChevronRight20Regular,
  ChevronLeft20Regular, ChevronDoubleDown20Regular, ChevronDoubleUp20Regular, WeatherMoon20Regular,
  WeatherSunny20Regular, TextFont20Regular, Globe20Regular, ArrowRight20Regular, PersonCircle20Regular,
  History20Regular, SignOut20Regular, Folder20Filled, FolderOpen20Filled, PlayCircle20Filled, SlideText20Filled,
  Home20Regular, FullScreenMaximize20Regular, ArrowDownload20Regular, HatGraduation24Filled, Person20Regular,
  LockClosed20Regular, Eye20Regular, EyeOff20Regular, Info20Filled, Grid20Regular, Copy20Regular,
  Checkmark20Regular, Open20Regular, Delete20Regular, Mail20Regular, Building20Regular, SearchInfo24Regular,
  Color20Regular, PanelLeftContract20Regular, PanelLeftExpand20Regular, QuizNew20Regular, QuizNew24Regular,
  Add20Regular, CheckmarkCircle20Filled, DismissCircle20Filled, ArrowCounterclockwise20Regular, Trophy24Regular,
  PersonAdd20Regular, Accessibility20Regular, Book24Regular, Clock20Regular, PaintBrush20Regular, HatGraduation24Regular,
  // Rəngli
  Document24Regular, Library24Regular, Headset24Regular, Laptop24Regular, DataTrending24Regular, PersonStarburst24Regular,
  Bookmark24Regular, TextBulletListSquare24Regular, BookOpen24Regular, Video24Regular, Board24Regular, Globe24Regular,
  ContactCard24Regular, ClipboardTask24Regular, CheckboxChecked24Regular, PersonKey24Regular, Phone24Regular, ChatMultiple24Regular,
  Calendar24Regular, DataBarVerticalAscending24Regular, History24Regular,
} from '@fluentui/react-icons';

/** Hər ikonu eyni interfeysə salır: size, className, style */
const wrap = (C, name) => {
  function Icon({ size = 20, className, style, weight, ...rest }) {
    return <C aria-hidden="true" className={className} style={{ width: size, height: size, flexShrink: 0, ...style }} {...rest} />;
  }
  Icon.displayName = name;
  return Icon;
};

/* ---------- İnterfeys ---------- */
export const List = wrap(Navigation24Regular, 'List');
export const X = wrap(Dismiss24Regular, 'X');
export const MagnifyingGlass = wrap(Search24Regular, 'MagnifyingGlass');
export const CaretDown = wrap(ChevronDown20Regular, 'CaretDown');
export const CaretRight = wrap(ChevronRight20Regular, 'CaretRight');
export const CaretLeft = wrap(ChevronLeft20Regular, 'CaretLeft');
export const CaretDoubleDown = wrap(ChevronDoubleDown20Regular, 'CaretDoubleDown');
export const CaretDoubleUp = wrap(ChevronDoubleUp20Regular, 'CaretDoubleUp');
export const Moon = wrap(WeatherMoon20Regular, 'Moon');
export const Sun = wrap(WeatherSunny20Regular, 'Sun');
export const TextAa = wrap(TextFont20Regular, 'TextAa');
export const Globe = wrap(Globe20Regular, 'Globe');
export const ArrowRight = wrap(ArrowRight20Regular, 'ArrowRight');
export const UserCircle = wrap(PersonCircle20Regular, 'UserCircle');
export const ClockCounterClockwise = wrap(History20Regular, 'ClockCounterClockwise');
export const SignOut = wrap(SignOut20Regular, 'SignOut');
export const Folder = wrap(Folder20Filled, 'Folder');
export const FolderOpen = wrap(FolderOpen20Filled, 'FolderOpen');
export const PlayCircle = wrap(PlayCircle20Filled, 'PlayCircle');
export const Presentation = wrap(SlideText20Filled, 'Presentation');
export const House = wrap(Home20Regular, 'House');
export const ArrowsOut = wrap(FullScreenMaximize20Regular, 'ArrowsOut');
export const DownloadSimple = wrap(ArrowDownload20Regular, 'DownloadSimple');
export const GraduationCap = wrap(HatGraduation24Filled, 'GraduationCap');
export const User = wrap(Person20Regular, 'User');
export const LockKey = wrap(LockClosed20Regular, 'LockKey');
export const Eye = wrap(Eye20Regular, 'Eye');
export const EyeSlash = wrap(EyeOff20Regular, 'EyeSlash');
export const Info = wrap(Info20Filled, 'Info');
export const SquaresFour = wrap(Grid20Regular, 'SquaresFour');
export const Copy = wrap(Copy20Regular, 'Copy');
export const Check = wrap(Checkmark20Regular, 'Check');
export const ArrowSquareOut = wrap(Open20Regular, 'ArrowSquareOut');
export const Trash = wrap(Delete20Regular, 'Trash');
export const EnvelopeSimple = wrap(Mail20Regular, 'EnvelopeSimple');
export const Buildings = wrap(Building20Regular, 'Buildings');
export const MagnifyingGlassMinus = wrap(SearchInfo24Regular, 'MagnifyingGlassMinus');

/* ---------- Bölmə / kart ikonları (birrəngli) ---------- */
export const FileText = wrap(Document24Regular, 'FileText');
export const Stack = wrap(Library24Regular, 'Stack');
export const Lifebuoy = wrap(Headset24Regular, 'Lifebuoy');
export const Monitor = wrap(Laptop24Regular, 'Monitor');
export const ChartBar = wrap(DataTrending24Regular, 'ChartBar');
export const PersonStar = wrap(PersonStarburst24Regular, 'PersonStar');
export const Tag = wrap(Bookmark24Regular, 'Tag');
export const TextAlignLeft = wrap(TextBulletListSquare24Regular, 'TextAlignLeft');
export const BookOpenText = wrap(BookOpen24Regular, 'BookOpenText');
export const FilmStrip = wrap(Video24Regular, 'FilmStrip');
export const SlidesColor = wrap(Board24Regular, 'SlidesColor');
export const GlobeColor = wrap(Globe24Regular, 'GlobeColor');
export const IdentificationBadge = wrap(ContactCard24Regular, 'IdentificationBadge');
export const HistoryColor = wrap(History24Regular, 'HistoryColor');
export const ClipboardText = wrap(ClipboardTask24Regular, 'ClipboardText');
export const Exam = wrap(CheckboxChecked24Regular, 'Exam');
export const SignIn = wrap(PersonKey24Regular, 'SignIn');
export const DeviceMobile = wrap(Phone24Regular, 'DeviceMobile');
export const VideoConference = wrap(Video24Regular, 'VideoConference');
export const ChatsCircle = wrap(ChatMultiple24Regular, 'ChatsCircle');
export const CalendarDots = wrap(Calendar24Regular, 'CalendarDots');
export const Gradebook = wrap(DataBarVerticalAscending24Regular, 'Gradebook');

/* ---------- v6: yeni funksiyalar ---------- */
export const Palette = wrap(Color20Regular, 'Palette');
export const PanelHide = wrap(PanelLeftContract20Regular, 'PanelHide');
export const PanelShow = wrap(PanelLeftExpand20Regular, 'PanelShow');
export const Quiz = wrap(QuizNew20Regular, 'Quiz');
export const QuizBig = wrap(QuizNew24Regular, 'QuizBig');
export const Plus = wrap(Add20Regular, 'Plus');
export const RightMark = wrap(CheckmarkCircle20Filled, 'RightMark');
export const WrongMark = wrap(DismissCircle20Filled, 'WrongMark');
export const Retry = wrap(ArrowCounterclockwise20Regular, 'Retry');
export const Trophy = wrap(Trophy24Regular, 'Trophy');
export const JoinIc = wrap(PersonAdd20Regular, 'JoinIc');
export const A11y = wrap(Accessibility20Regular, 'A11y');
export const CourseIc = wrap(Book24Regular, 'CourseIc');
export const ClockIc = wrap(Clock20Regular, 'ClockIc');
export const BrushIc = wrap(PaintBrush20Regular, 'BrushIc');
export const CapOutline = wrap(HatGraduation24Regular, 'CapOutline');
