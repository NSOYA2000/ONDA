import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ChooseFormat from './pages/ChooseFormat';
import Converting from './pages/Converting';
import Done from './pages/Done';
import HowItWorks from './pages/HowItWorks';
import SupportedFormats from './pages/SupportedFormats';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/choose-format" element={<ChooseFormat />} />
          <Route path="/converting" element={<Converting />} />
          <Route path="/done" element={<Done />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/formats" element={<SupportedFormats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
