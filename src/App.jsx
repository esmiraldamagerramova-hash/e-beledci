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
import NotFound from './pages/NotFound.jsx';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/giris" replace state={{ from: location }} />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/beledci" replace />} />
      <Route
        path="/beledci"
        element={
          <RequireAuth>
            <GuideProvider>
              <GuideLayout />
            </GuideProvider>
          </RequireAuth>
        }
      >
        <Route index element={<GuideHome />} />
        <Route path="hesab" element={<AccountPage />} />
        <Route path="videolar" element={<VideosPage />} />
        <Route path=":categoryId" element={<CategoryPage />} />
        <Route path=":categoryId/:serviceId" element={<ServicePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
