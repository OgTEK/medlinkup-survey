import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import Admin from './admin/Admin';
import LandingPage from './pages/LandingPage';
import './styles.css';
import './landing.css';

function HomeRoute() {
  const ref = new URLSearchParams(useLocation().search).get('ref');
  if (ref) return <Navigate to={`/survey?ref=${encodeURIComponent(ref)}`} replace />;
  return <LandingPage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/survey" element={<App />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);