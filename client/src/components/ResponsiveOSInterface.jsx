import React, { useState, useEffect } from 'react';
import { 
  Heart, BarChart3, Users, Calendar, Settings, 
  Wifi, Battery, Volume2, Grid3X3, ChevronRight,
  Phone, MessageCircle, Activity, Brain
} from 'lucide-react';

const ResponsiveOSInterface = ({ onAppSelect }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const featuredApps = [
    {
      id: 'ai-quiz',
      name: 'AI Health Quiz',
      icon: Brain,
      color: 'bg-pink-200',
      route: '/ai-quiz',
      description: 'Personalized health assessment'
    },
    {
      id: 'quick-quiz',
      name: 'Quick Health Check',
      icon: Activity,
      color: 'bg-rose-200',
      route: '/quick-quiz',
      description: 'Fast health screening'
    }
  ];

  const regularApps = [
    {
      id: 'dashboard',
      name: 'Health Dashboard',
      icon: BarChart3,
      color: 'bg-pink-200',
      route: '/dashboard',
      description: 'Your health metrics and trends'
    },
    {
      id: 'prevention',
      name: 'Prevention Plan',
      icon: Heart,
      color: 'bg-rose-200',
      route: '/prevention',
      description: 'Personalized prevention strategies'
    },
    {
      id: 'community',
      name: 'Community Hub',
      icon: Users,
      color: 'bg-pink-300',
      route: '/community',
      description: 'Connect with health community'
    },
    {
      id: 'analytics',
      name: 'Health Analytics',
      icon: BarChart3,
      color: 'bg-rose-300',
      route: '/analytics',
      description: 'Population health insights'
    },
    {
      id: 'scheduler',
      name: 'Screening Scheduler',
      icon: Calendar,
      color: 'bg-pink-200',
      route: '/scheduler',
      description: 'Manage your screening appointments'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      color: 'bg-gray-300',
      route: '/settings',
      description: 'App preferences and account'
    }
  ];

  const handleAppClick = (app, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('App clicked:', app.name, 'Route:', app.route);

    // Always use onAppSelect if it exists - this will handle all navigation
    if (onAppSelect) {
      onAppSelect(app);
      return;
    }

    // Fallback for when onAppSelect is not available
    console.log('onAppSelect not available, using fallback navigation for:', app.route);
  };

  // Desktop Interface with simple pastel theme
  const DesktopInterface = () => (
    <div className="min-h-screen w-full bg-pink-50 relative overflow-x-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f472b6' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="px-4 py-8 min-h-[calc(100vh-2rem)]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Screen-Play
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Comprehensive Health Management Platform
            </p>
          </div>

          {/* Featured Apps Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-pink-500" />
              Featured Health Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    className="group bg-white rounded-2xl p-6 hover:bg-pink-50 transition-all duration-300 cursor-pointer border border-pink-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {app.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {app.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600 text-sm font-medium">Click to start</span>
                          <ChevronRight className="w-4 h-4 text-pink-600 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Apps Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Grid3X3 className="w-6 h-6 text-pink-500" />
              All Applications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {regularApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    className="group text-center cursor-pointer"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${app.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-all duration-300 shadow-sm`}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                    </div>
                    <h3 className="text-gray-800 font-medium text-xs md:text-sm mb-1 leading-tight">
                      {app.name}
                    </h3>
                    <p className="text-gray-600 text-xs hidden md:block leading-tight">
                      {app.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Interface with simple pastel theme
  const MobileInterface = () => (
    <div className="min-h-screen w-full bg-pink-50 relative overflow-x-hidden">
      {/* Mobile Status Bar */}
      <div className="h-12 bg-white border-b border-pink-200 flex items-center justify-between px-4 text-gray-800 text-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
          </div>
          <span className="font-medium">Screen-Play</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span className="font-mono text-sm">
            {currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-6 pb-24 min-h-[calc(100vh-3rem)]">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Screen-Play</h1>
          <p className="text-gray-600">Your health companion</p>
        </div>

        {/* Featured Apps - Mobile */}
        <div className="mb-8">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Featured</h2>
          <div className="space-y-4">
            {featuredApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className="bg-white rounded-2xl p-4 active:scale-95 transition-transform cursor-pointer border border-pink-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-800 font-medium truncate">{app.name}</h3>
                      <p className="text-gray-600 text-sm truncate">{app.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* App Grid - Mobile */}
        <div>
          <h2 className="text-gray-800 text-lg font-semibold mb-4">All Apps</h2>
          <div className="grid grid-cols-3 gap-4">
            {regularApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className="text-center active:scale-95 transition-transform cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center mb-2 mx-auto shadow-sm`}>
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-gray-800 text-xs font-medium leading-tight">{app.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Dock - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-pink-200">
        <div className="flex items-center justify-center h-full px-8">
          <div className="flex items-center gap-6">
            {featuredApps.slice(0, 2).map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer`}
                >
                  <Icon className="w-7 h-7 text-gray-700" />
                </div>
              );
            })}
            <div
              onClick={(e) => handleAppClick(regularApps[0], e)}
              className="w-14 h-14 rounded-2xl bg-pink-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <BarChart3 className="w-7 h-7 text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileInterface /> : <DesktopInterface />;
};

export default ResponsiveOSInterface;