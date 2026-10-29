import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { EmptyState } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <EmptyState icon={SearchX} title="Səhifə tapılmadı" text="Axtardığınız səhifə mövcud deyil və ya köçürülüb.">
      <Link to="/" className="btn-primary">Ana səhifəyə qayıt</Link>
    </EmptyState>
  );
}
