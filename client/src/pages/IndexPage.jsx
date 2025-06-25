import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ArrowLeft, MessageCircle, Settings, Brain, Activity, Heart, BarChart3, Users, Calendar } from 'lucide-react';

// Import your components
import GroupList from '../components/groupChat/GroupList';
import RegularApp from '../components/RegularApp';
import GroupChat from '../components/groupChat/GroupChat';
import AIQuiz from '../components/groupChat/AIQuiz';
import ResponsiveOSInterface from '../components/ResponsiveOSInterface';
import AnalyticsPage from './AnalyticsPage';
import CommunityPage from './CommunityPage';
import DashboardPage from './DashboardPage';
import PreventionPage from './PreventionPage';
import ScreeningSchedulerPage from './ScreeningSchedulerPage';
import { groupsData } from '../data/groupsData';

const Border = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-gradient-to-br from-pink-100/80 via-rose-100/80 to-pink-200/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[700px] overflow-hidden border border-gray-300">
      {/* Mac-style Window Title Bar */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mac Window Control Buttons - ALL CLOSE */}
          <div className="flex items-center gap-2">
            <div 
              onClick={onClose}
              className="w-3 h-3 bg-red-400 rounded-full hover:bg-red-500 cursor-pointer"
            ></div>
            <div 
              onClick={onClose}
              className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500 cursor-pointer"
            ></div>
            <div 
              onClick={onClose}
              className="w-3 h-3 bg-green-400 rounded-full hover:bg-green-500 cursor-pointer"
            ></div>
          </div>
        </div>
        <div></div>
      </div>
      
      {/* Window Content */}
      <div className="h-[calc(700px-56px)] overflow-auto">
        {children}
      </div>
    </div>
  </div>
);

const IndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('os');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentApp, setCurrentApp] = useState(null);

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
    console.log('App selected:', app);
    
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
      case '/analytics':
        // Set analytics view directly
        setCurrentView('analytics');
        break;
      case '/dashboard':
        // Set dashboard view directly
        setCurrentView('dashboard');
        break;
      case '/prevention':
        // Set prevention view directly
        setCurrentView('prevention');
        break;
      case '/community':
        // Set community view directly
        setCurrentView('community');
        break;
      case '/scheduler':
        // Set scheduler view directly
        setCurrentView('scheduler');
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
    setCurrentApp(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedGroup(null);
    setCurrentApp(null);
  };

  // Fix the API check logic
  const isAIConfigured = !!import.meta.env.VITE_OPENAI_API_KEY;

  if (currentView === 'os') {
    return <ResponsiveOSInterface onAppSelect={handleAppSelect} />;
  }

  // Render other views in desktop popup style
  return (
    <div className="w-screen h-screen bg-pink-50 flex justify-center items-center overflow-hidden">
      <Border onClose={handleBackToOS}>
        {currentView === 'analytics' ? (
          // Render Analytics Page directly
          <AnalyticsPage />
        ) : currentView === 'dashboard' ? (
          <DashboardPage />
        ) : currentView === 'prevention' ? (
          <PreventionPage />
        ) : currentView === 'community' ? (
          <CommunityPage />
        ) : currentView === 'scheduler' ? (
          <ScreeningSchedulerPage />
        ) : currentView === 'list' ? (
          <div className="h-full flex flex-col">
            <div className="bg-pink-50 p-4 border-b border-pink-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Health Assessments</h1>
                  <p className="text-sm text-gray-600">Choose your health quiz</p>
                </div>
              </div>
            </div>

            {!isAIConfigured && (
              <div className="bg-yellow-50 border-b border-yellow-200 p-3">
                <div className="text-xs text-yellow-700 text-center">
                  ⚠️ AI features disabled - OpenAI API key not configured
                </div>
              </div>
            )}
            
            <div className="flex-1 bg-pink-50 overflow-y-auto">
              <GroupList 
                groups={groupsData} 
                onGroupSelect={handleGroupSelect} 
              />
            </div>
          </div>
        ) : currentView === 'settings' ? (
          <div className="h-full flex flex-col">
            <div className="bg-pink-50 p-4 border-b border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <h1 className="text-xl font-bold text-gray-800">Settings</h1>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-6 bg-pink-50 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">API Configuration</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">OpenAI API Status</span>
                    <span className={`text-sm font-medium ${isAIConfigured ? 'text-green-600' : 'text-red-600'}`}>
                      {isAIConfigured ? 'Connected' : 'Not Configured'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                  <p className="text-sm text-gray-600">
                    Singapore Health Platform v1.0
                  </p>
                  <p className="text-sm text-gray-600">
                    AI-powered health companion for cancer prevention
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('list')}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                >
                  View Health Assessments
                </button>
              </div>
            </div>
          </div>
        ) : currentView === 'app' && currentApp ? (
          <RegularApp 
            appName={currentApp.name} 
            appIcon={currentApp.icon} 
            onBack={handleBackToOS} 
          />
        ) : (
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