import {
  PeopleTeam24Regular, Library24Regular, DocumentFolder24Regular, ClipboardTask24Regular, DataBarVerticalAscending24Regular,
  CheckboxChecked24Regular, PaintBrush24Regular, ChatMultiple24Regular, DataTrending24Regular, Certificate24Regular,
  PhoneLaptop24Regular, LinkMultiple24Regular, Settings24Regular, LockShield24Regular, PuzzlePiece24Regular, Apps24Regular,
} from '@fluentui/react-icons';

/**
 * Bölmə ikonları — Fluent UI birrəngli (Regular) ikonlar.
 * Backend `icon` sahəsində bu açarlardan birini göndərir.
 */
const MAP = {
  Users: PeopleTeam24Regular,
  BookOpen: Library24Regular,
  FolderOpen: DocumentFolder24Regular,
  ClipboardList: ClipboardTask24Regular,
  BarChart3: DataBarVerticalAscending24Regular,
  ShieldCheck: CheckboxChecked24Regular,
  PenTool: PaintBrush24Regular,
  MessagesSquare: ChatMultiple24Regular,
  LineChart: DataTrending24Regular,
  Award: Certificate24Regular,
  Smartphone: PhoneLaptop24Regular,
  Plug: LinkMultiple24Regular,
  Settings: Settings24Regular,
  Lock: LockShield24Regular,
  Puzzle: PuzzlePiece24Regular,
};

export default function CategoryIcon({ name, size = 28, className, style }) {
  const C = MAP[name] || Apps24Regular;
  return <C aria-hidden="true" className={className} style={{ width: size, height: size, flexShrink: 0, ...style }} />;
}
