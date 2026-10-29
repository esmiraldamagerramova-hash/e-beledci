import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PrefsProvider } from './context/PrefsContext.jsx';
import { LangProvider } from './i18n/LangContext.jsx';

/* Şriftlər saytın içində saxlanılır (Google Fonts-dan asılılıq yoxdur).
   Montserrat — başlıqlar (UNEC giriş dizaynındakı kimi), Source Sans 3 — mətn (uzun oxumaq üçün rahat).
   Hər ikisi Azərbaycan (ə, ğ, ı, İ) və kiril hərflərini dəstəkləyir. */
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/400-italic.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
import '@fontsource/caveat/600.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <PrefsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PrefsProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
);
