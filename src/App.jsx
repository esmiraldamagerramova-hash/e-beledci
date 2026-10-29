import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { ProgressProvider } from './hooks/useProgress.js';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Trainings from './pages/Trainings.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Tests from './pages/Tests.jsx';
import QuizRun from './pages/QuizRun.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="xidmetler" element={<Services />} />
          <Route path="xidmetler/:id" element={<ServiceDetail />} />
          <Route path="telimler" element={<Trainings />} />
          <Route path="telimler/:id" element={<CourseDetail />} />
          <Route path="testler" element={<Tests />} />
          <Route path="testler/:id" element={<QuizRun />} />
          <Route path="profil" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}
