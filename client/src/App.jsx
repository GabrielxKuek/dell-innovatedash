// src/App.jsx - Modified with AI Adventure logic
import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'
import DashboardPage from './pages/DashboardPage'  
import CommunityPage from './pages/CommunityPage'  
import PreventionPage from './pages/PreventionPage'  
import AnalyticsPage from './pages/AnalyticsPage'
import ScreeningSchedulerPage from './pages/ScreeningSchedulerPage'
import AITextAdventure from './components/AITextAdventure' // You'll need to create this file
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// Wrapper component that handles AI Adventure logic
const HomeWrapper = () => {
  const [hasCompletedAdventure, setHasCompletedAdventure] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdventure, setShowAdventure] = useState(false);

  useEffect(() => {
    // Check if user has completed the AI adventure
    const adventureCompleted = localStorage.getItem('ai-adventure-completed');
    setHasCompletedAdventure(!!adventureCompleted);
    setIsLoading(false);
  }, []);

  const handleAdventureComplete = () => {
    // Mark adventure as completed
    localStorage.setItem('ai-adventure-completed', 'true');
    localStorage.setItem('ai-adventure-completed-date', new Date().toISOString());
    setHasCompletedAdventure(true);
    setShowAdventure(false);
  };

  const handleSkipAdventure = () => {
    // Allow user to skip the adventure
    localStorage.setItem('ai-adventure-skipped', 'true');
    setHasCompletedAdventure(true);
    setShowAdventure(false);
  };

  const handleOpenAdventure = () => {
    setShowAdventure(true);
  };

  const handleCloseAdventure = () => {
    setShowAdventure(false);
  };

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Screen-Play...</p>
        </div>
      </div>
    );
  }

  // If adventure not completed, show AI Text Adventure
  if (!hasCompletedAdventure && !showAdventure) {
    return (
      <AITextAdventure 
        onClose={handleAdventureComplete}
        onSkip={handleSkipAdventure}
      />
    );
  }

  // If adventure completed, show regular IndexPage with adventure button
  return (
    <>
      <IndexPage />
      {/* Show adventure button for completed users */}
      {/* Show adventure overlay if requested */}
      {showAdventure && (
        <AITextAdventure 
          onClose={handleCloseAdventure}
          onSkip={handleCloseAdventure}
        />
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/prevention" element={<PreventionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/scheduler" element={<ScreeningSchedulerPage />} />
        
        {/* Force adventure route - useful for testing */}
        <Route path="/adventure" element={<AITextAdventure onClose={() => window.location.href = '/'} />} />
        
        {/* Direct access to main app (bypass adventure) */}
        <Route path="/app" element={<IndexPage />} />
        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;