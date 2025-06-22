// src/pages/IndexPage.jsx - Enhanced with navigation
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import GroupList from '../components/groupChat/GroupList';
import GroupChat from '../components/groupChat/GroupChat';
import AIQuiz from '../components/groupChat/AIQuiz';
import Navigation from '../components/shared/Navigation';
import { groupsData } from '../data/groupsData';
import { BarChart3, Users, Heart, Settings } from 'lucide-react';

const IndexPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('list');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setCurrentView('chat');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedGroup(null);
  };

  // Check if OpenAI API key is configured
  const isAIConfigured = !!import.meta.env.VITE_OPENAI_API_KEY;

  // Quick action cards for main features
  const quickActions = [
    {
      title: "Health Dashboard",
      description: "View your risk assessment and health insights",
      icon: BarChart3,
      color: "blue",
      action: () => navigate('/dashboard')
    },
    {
      title: "Prevention Plan",
      description: "Get personalized prevention recommendations",
      icon: Heart,
      color: "red",
      action: () => navigate('/prevention')
    },
    {
      title: "Community Hub",
      description: "Connect with health community and challenges",
      icon: Users,
      color: "green",
      action: () => navigate('/community')
    }
  ];

  const QuickActionCard = ({ title, description, icon: Icon, color, action }) => (
    <button
      onClick={action}
      className={`w-full p-4 rounded-lg border-2 border-transparent hover:border-${color}-200 bg-white shadow-sm hover:shadow-md transition-all text-left`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        {currentView === 'list' ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Health Assistant</h1>
                  <p className="text-sm text-gray-600">Your AI-powered health companion</p>
                </div>
                <button 
                  onClick={() => navigate('/analytics')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
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
            
            {/* Quick Actions */}
            <div className="p-4 bg-white border-b">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <QuickActionCard key={index} {...action} />
                ))}
              </div>
            </div>

            {/* Health Assessments */}
            <div className="flex-1 bg-gray-50">
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Health Assessments</h2>
              </div>
              <GroupList 
                groups={groupsData} 
                onGroupSelect={handleGroupSelect} 
              />
            </div>

            {/* Navigation */}
            <Navigation currentPage="home" />
          </div>
        ) : (
          // Chat view - choose between regular chat and AI quiz
          <div className="h-full flex flex-col">
            {selectedGroup?.isAIQuiz ? (
              <AIQuiz 
                group={selectedGroup} 
                onBack={handleBackToList} 
              />
            ) : (
              <GroupChat 
                group={selectedGroup} 
                onBack={handleBackToList} 
              />
            )}
          </div>
        )}
      </Border>
    </div>
  );
};

export default IndexPage;