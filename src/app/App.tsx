import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '@core/ui';
import { Home } from '@features/home';
import { Experience } from '@features/experience';
import { Projects } from '@features/projects';
import { BlogIndex, BlogArticle } from '@features/blog';
import { Contact } from '@features/contact';
import { Resume } from '@features/resume';
import { ROUTES } from './routes';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}

export function AppContent() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.experience} element={<Experience />} />
          <Route path={ROUTES.about} element={<Experience />} />
          <Route path={ROUTES.projects} element={<Projects />} />
          <Route path={ROUTES.blog} element={<BlogIndex />} />
          <Route path={ROUTES.blogArticle} element={<BlogArticle />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.resume} element={<Resume />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
