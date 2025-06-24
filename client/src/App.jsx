// src/App.jsx - Temporarily add debug route
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'
import DashboardPage from './pages/DashboardPage'  
import CommunityPage from './pages/CommunityPage'  
import PreventionPage from './pages/PreventionPage'  
import AnalyticsPage from './pages/AnalyticsPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/prevention" element={<PreventionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;