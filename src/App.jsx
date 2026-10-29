import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { GuideProvider } from './context/GuideContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import GuideLayout from './components/GuideLayout.jsx';
import GuideHome from './pages/GuideHome.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import VideosPage from './pages/VideosPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import NotFound from './pages/NotFound.jsx';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/giris" replace state={{ from: location }} />;
  return children;
}

/**
 * Səhifə ünvanları:
 *   /giris                              — giriş
 *   /esas-sehife                        — əsas səhifə
 *   /bolmeler/:bolme                    — bölmə (mövzu)
 *   /bolmeler/:bolme/:xidmet            — xidmət haqqında təlimat
 *   /video-telimatlar                   — video təlimatlar
 *   /ozunu-yoxla                        — özünü yoxla (sınaq)
 *   /hesabim                            — şəxsi kabinet
 */
function LegacyRedirect() {
  // köhnə /beledci/... ünvanları yeni ünvanlara yönləndirilir
  const { pathname, search, hash } = useLocation();
  const rest = pathname.replace(/^\/beledci\/?/, '');
  const fixed = { '': '/esas-sehife', hesab: '/hesabim', videolar: '/video-telimatlar', sinaq: '/ozunu-yoxla' };
  const to = rest in fixed ? fixed[rest] : `/bolmeler/${rest}`;
  return <Navigate to={`${to}${search}${hash}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/esas-sehife" replace />} />
      <Route path="/beledci/*" element={<LegacyRedirect />} />
      <Route
        element={
          <RequireAuth>
            <GuideProvider>
              <GuideLayout />
            </GuideProvider>
          </RequireAuth>
        }
      >
        <Route path="/esas-sehife" element={<GuideHome />} />
        <Route path="/hesabim" element={<AccountPage />} />
        <Route path="/video-telimatlar" element={<VideosPage />} />
        <Route path="/ozunu-yoxla" element={<QuizPage />} />
        <Route path="/bolmeler" element={<Navigate to="/esas-sehife#bolmeler" replace />} />
        <Route path="/bolmeler/:categoryId" element={<CategoryPage />} />
        <Route path="/bolmeler/:categoryId/:serviceId" element={<ServicePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
