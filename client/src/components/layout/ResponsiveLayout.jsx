// src/components/layout/ResponsiveLayout.jsx - FIXED WHITESPACE ISSUE
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Menu, Bell } from 'lucide-react';
import Border from '../phoneComponents/Border';

const ResponsiveLayout = ({ 
  children, 
  title, 
  showBackButton = true, 
  showPhoneBorder = false 
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBack = () => {
    console.log('Back button clicked');
    navigate('/');
  };

  const MobileHeader = () => (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {showBackButton && (
        <button 
          onClick={handleBack} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="font-semibold text-gray-900">{title}</h1>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );

  const DesktopHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <>
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
              >
                <Home className="w-5 h-5" />
                Back to Health OS
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
            </>
          )}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  // FIXED: Phone border with proper responsive handling
  if (showPhoneBorder && !isMobile) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center p-4 overflow-auto">
        <div className="w-full max-w-sm h-full max-h-[90vh] flex-shrink-0">
          <Border>
            <div className="h-full w-full overflow-auto">
              {children}
            </div>
          </Border>
        </div>
      </div>
    );
  }

  // FIXED: Mobile layout with proper overflow handling
  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
        <MobileHeader />
        <div className="w-full px-4 py-6 pb-safe">
          <div className="w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // FIXED: Desktop layout with consistent width handling
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <DesktopHeader />
      <div className="w-full px-4 py-6">
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;