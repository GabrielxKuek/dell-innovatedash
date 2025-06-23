import React, { useState, useEffect } from 'react';
import { 
  Brain, BarChart3, Users, Heart, Calendar, Settings, 
  Wifi, Battery, Volume2, Grid3X3, ChevronRight,
  Star, Zap, TrendingUp
} from 'lucide-react';

const ResponsiveOSInterface = ({ onAppSelect }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, []);

  // Featured apps (highlighted first)
  const featuredApps = [
    {
      id: 'ai-assessment',
      name: 'AI Risk Assessment',
      subtitle: 'Comprehensive AI Health Analysis',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      route: '/ai-quiz',
      featured: true,
      badge: 'AI Powered',
      description: 'Advanced cancer risk assessment using AI'
    },
    {
      id: 'quick-quiz',
      name: 'Quick Health Quiz',
      subtitle: 'Fast Cancer Risk Check',
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      route: '/quick-quiz',
      featured: true,
      badge: 'Popular',
      description: '5-minute health assessment'
    }
  ];

  // Regular apps
  const regularApps = [
    {
      id: 'dashboard',
      name: 'Health Dashboard',
      icon: BarChart3,
      color: 'from-blue-400 to-blue-600',
      route: '/dashboard',
      description: 'View your health metrics'
    },
    {
      id: 'prevention',
      name: 'Prevention Plan',
      icon: Heart,
      color: 'from-red-400 to-red-600',
      route: '/prevention',
      description: 'Personalized prevention strategies'
    },
    {
      id: 'community',
      name: 'Community Hub',
      icon: Users,
      color: 'from-green-400 to-green-600',
      route: '/community',
      description: 'Connect with health community'
    },
    {
      id: 'analytics',
      name: 'Health Analytics',
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-600',
      route: '/analytics',
      description: 'Population health insights'
    },
    {
      id: 'scheduler',
      name: 'Screening Scheduler',
      icon: Calendar,
      color: 'from-orange-400 to-orange-600',
      route: '/scheduler',
      description: 'Manage your screening appointments'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      color: 'from-gray-400 to-gray-600',
      route: '/settings',
      description: 'App preferences and account'
    }
  ];

  const handleAppClick = (app) => {
    if (onAppSelect) {
      onAppSelect(app);
    }
  };

  const DesktopInterface = () => (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Desktop Taskbar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 flex items-center justify-between px-4 text-white text-sm">
        <div className="flex items-center gap-4">
          <div className="font-semibold">Singapore Health OS</div>
          <div>{currentTime.toLocaleDateString('en-SG')}</div>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-8 p-8 h-full">
        <div className="max-w-7xl mx-auto h-full">
          {/* Welcome Section */}
          <div className="text-center text-white mb-12 mt-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Singapore Health Platform
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your AI-powered health companion for cancer prevention and early detection
            </p>
          </div>

          {/* Featured Apps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Featured Health Apps
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="group relative bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
                        {app.badge}
                      </span>
                    </div>
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{app.name}</h3>
                    <p className="text-blue-200 text-sm mb-3">{app.subtitle}</p>
                    <p className="text-blue-100 text-sm">{app.description}</p>
                    
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-blue-200 text-sm">Click to start</span>
                      <ChevronRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Apps */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Grid3X3 className="w-6 h-6" />
              All Applications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {regularApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="group text-center cursor-pointer"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">{app.name}</h3>
                    <p className="text-blue-200 text-xs">{app.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative">
      {/* Mobile Status Bar */}
      <div className="h-12 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <span>Health OS</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-6 pb-24">
        {/* Time and Greeting */}
        <div className="text-center text-white mb-8">
          <div className="text-4xl font-light mb-2">
            {currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-lg text-blue-200">
            {currentTime.toLocaleDateString('en-SG', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Featured Apps - Mobile */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Featured
          </h2>
          <div className="space-y-4">
            {featuredApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 active:bg-opacity-20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{app.name}</h3>
                      <p className="text-blue-200 text-sm">{app.subtitle}</p>
                    </div>
                    <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
                      {app.badge}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* App Grid - Mobile */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">All Apps</h2>
          <div className="grid grid-cols-3 gap-4">
            {regularApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="text-center active:scale-95 transition-transform"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-2 mx-auto shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-xs font-medium leading-tight">{app.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Dock - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-black bg-opacity-40 backdrop-blur-md border-t border-white border-opacity-20">
        <div className="flex items-center justify-center h-full px-8">
          <div className="flex items-center gap-6">
            {featuredApps.slice(0, 2).map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              );
            })}
            <div
              onClick={() => handleAppClick(regularApps[0])} // Dashboard
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileInterface /> : <DesktopInterface />;
};

export default ResponsiveOSInterface;