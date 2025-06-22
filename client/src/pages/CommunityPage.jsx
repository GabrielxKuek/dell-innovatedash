// src/pages/CommunityPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import CommunityHealthFeatures from '../components/community/CommunityHealthFeatures';
import Navigation from '../components/shared/Navigation';
import { ArrowLeft } from 'lucide-react';

const CommunityPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center p-4 bg-white border-b">
            <button 
              onClick={handleBack}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Community Hub</h1>
          </div>
          
          {/* Community Content */}
          <div className="flex-1 overflow-auto">
            <CommunityHealthFeatures />
          </div>
          
          {/* Navigation */}
          <Navigation currentPage="community" />
        </div>
      </Border>
    </div>
  );
};

export {CommunityPage};