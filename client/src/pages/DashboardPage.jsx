// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import EnhancedHealthDashboard from '../components/dashboard/EnhancedHealthDashboard';
import Navigation from '../components/shared/Navigation';
import { ArrowLeft } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from local storage or API
    const savedData = localStorage.getItem('healthUserData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

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
            <h1 className="text-lg font-semibold">Health Dashboard</h1>
          </div>
          
          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto">
            <EnhancedHealthDashboard userData={userData} />
          </div>
          
          {/* Navigation */}
          <Navigation currentPage="dashboard" />
        </div>
      </Border>
    </div>
  );
};

export { DashboardPage};