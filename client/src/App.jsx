// src/App.jsx - Updated with new routes
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from './components/shared/ErrorBoundary';

// Existing pages
import IndexPage from './pages/IndexPage';
import TestPage from './pages/TestPage';
import ErrorPage from './pages/ErrorPage';

// New pages
import { DashboardPage } from './pages/DashboardPage';
import { CommunityPage } from './pages/CommunityPage';
import {  PreventionPage } from './pages/PreventionPage';

// // Lazy loading for better performance
// const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/prevention" element={<PreventionPage />} />
          <Route path="/community" element={<CommunityPage />} />
          {/* <Route 
            path="/analytics" 
            element={
              <React.Suspense fallback={<div>Loading Analytics...</div>}>
                <AnalyticsPage />
              </React.Suspense>
            } 
          /> */}
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;