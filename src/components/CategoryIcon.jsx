import {
  Users, BookOpen, FolderOpen, ClipboardText, ChartBar, ShieldCheck, PenNib, ChatsCircle,
  ChartLine, Certificate, DeviceMobile, PlugsConnected, GearSix, LockKey, PuzzlePiece, Folder,
} from '@phosphor-icons/react';

/**
 * Bölmə ikonları (Phosphor Icons, "duotone" üslubu).
 * Backend `icon` sahəsində bu açarlardan birini göndərir.
 */
const MAP = {
  Users,
  BookOpen,
  FolderOpen,
  ClipboardList: ClipboardText,
  BarChart3: ChartBar,
  ShieldCheck,
  PenTool: PenNib,
  MessagesSquare: ChatsCircle,
  LineChart: ChartLine,
  Award: Certificate,
  Smartphone: DeviceMobile,
  Plug: PlugsConnected,
  Settings: GearSix,
  Lock: LockKey,
  Puzzle: PuzzlePiece,
};

export default function CategoryIcon({ name, size = 28, weight = 'duotone', ...rest }) {
  const C = MAP[name] || Folder;
  return <C size={size} weight={weight} {...rest} />;
}
