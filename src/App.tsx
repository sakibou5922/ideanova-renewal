import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Company } from './pages/Company';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { NewsDetail, NewsList } from './pages/News';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { Service } from './pages/Service';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="service" element={<Service />} />
          <Route path="company" element={<Company />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          {/* 現行 URL の互換リダイレクト */}
          <Route path="staret-hp" element={<Navigate to="/news/staret-hp" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
