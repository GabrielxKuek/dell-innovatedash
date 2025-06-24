// src/pages/IndexPage.jsx - Implementation Ready
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import GroupList from '../components/groupChat/GroupList';
import GroupChat from '../components/groupChat/GroupChat';
import AIQuiz from '../components/groupChat/AIQuiz';
import ResponsiveOSInterface from '../components/ResponsiveOSInterface';
import { groupsData } from '../data/groupsData';

const IndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('os'); // Start with OS interface
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Check if we should open a specific quiz from state
    if (location.state?.openAIQuiz) {
      // Find AI quiz in groups data
      const aiQuiz = groupsData.find(group => group.isAIQuiz);
      if (aiQuiz) {
        setSelectedGroup(aiQuiz);
        setCurrentView('chat');
      }
    } else if (location.state?.openQuickQuiz) {
      // Open first group as quick quiz
      setSelectedGroup(groupsData[0]);
      setCurrentView('chat');
    }
  }, [location.state]);

  const handleAppSelect = (app) => {
    console.log('App selected:', app); // Debug log
    
    switch (app.route) {
      case '/ai-quiz':
        // Find AI quiz in groups data
        const aiQuiz = groupsData.find(group => group.isAIQuiz);
        if (aiQuiz) {
          setSelectedGroup(aiQuiz);
          setCurrentView('chat');
        } else {
          // Fallback: show quiz list
          setCurrentView('list');
        }
        break;
      case '/quick-quiz':
        // Open first quiz as quick quiz
        setSelectedGroup(groupsData[0]);
        setCurrentView('chat');
        break;
      case '/dashboard':
        navigate('/dashboard');
        break;
      case '/prevention':
        navigate('/prevention');
        break;
      case '/community':
        navigate('/community');
        break;
      case '/analytics':
        navigate('/analytics');
        break;
      case '/scheduler':
        setCurrentView('list'); // Show quiz list for now
        break;
      case '/settings':
        setCurrentView('settings');
        break;
      default:
        setCurrentView('list');
    }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setCurrentView('chat');
  };

  const handleBackToOS = () => {
    setCurrentView('os');
    setSelectedGroup(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedGroup(null);
  };

  // Check if OpenAI API key is configured
  const isAIConfigured = !!import.meta.env.VITE_OPENAI_API_KEY;

  // Render OS Interface (no phone border)
  if (currentView === 'os') {
    return <ResponsiveOSInterface onAppSelect={handleAppSelect} />;
  }

  // Render other views in phone border for consistency
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        {currentView === 'list' ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Health Assessments</h1>
                  <p className="text-sm text-gray-600">Choose your health quiz</p>
                </div>
                <button 
                  onClick={handleBackToOS}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  ← Back to Home
                </button>
              </div>
            </div>

            {/* AI Status Indicator */}
            {!isAIConfigured && (
              <div className="bg-yellow-50 border-b border-yellow-200 p-3">
                <div className="text-xs text-yellow-700 text-center">
                  ⚠️ AI features disabled - OpenAI API key not configured
                </div>
              </div>
            )}
            
            {/* Quiz List */}
            <div className="flex-1 bg-gray-50">
              <GroupList 
                groups={groupsData} 
                onGroupSelect={handleGroupSelect} 
              />
            </div>
          </div>
        ) : currentView === 'settings' ? (
          <div className="h-full flex flex-col">
            {/* Settings View */}
            <div className="bg-white p-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <button 
                  onClick={handleBackToOS}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold text-gray-900 mb-2">API Configuration</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">OpenAI API Status</span>
                    <span className={`text-sm font-medium ${isAIConfigured ? 'text-green-600' : 'text-red-600'}`}>
                      {isAIConfigured ? 'Connected' : 'Not Configured'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-sm text-gray-600">
                    Singapore Health Platform v1.0
                  </p>
                  <p className="text-sm text-gray-600">
                    AI-powered health companion for cancer prevention
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('list')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  View Health Assessments
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Chat view - choose between regular chat and AI quiz
          <div className="h-full flex flex-col">
            {selectedGroup?.isAIQuiz ? (
              <AIQuiz 
                group={selectedGroup} 
                onBack={handleBackToOS} 
              />
            ) : (
              <GroupChat 
                group={selectedGroup} 
                onBack={handleBackToOS} 
              />
            )}
          </div>
        )}
      </Border>
    </div>
  );
};

export default IndexPage;