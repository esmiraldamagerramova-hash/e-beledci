import {
  Users, BookOpen, FolderOpen, ClipboardList, BarChart3, ShieldCheck, PenTool,
  MessagesSquare, LineChart, Award, Smartphone, Plug, Settings, Lock, Puzzle, Folder,
} from 'lucide-react';

const MAP = {
  Users, BookOpen, FolderOpen, ClipboardList, BarChart3, ShieldCheck, PenTool,
  MessagesSquare, LineChart, Award, Smartphone, Plug, Settings, Lock, Puzzle,
};

/** Backend ikon adını string kimi göndərir (lucide adları). Tanınmazsa — qovluq. */
export default function Icon({ name, ...props }) {
  const C = MAP[name] || Folder;
  return <C {...props} />;
}
