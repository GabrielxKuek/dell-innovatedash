// src/components/ResponsiveOSInterface.jsx - FIXED WHITESPACE & RESPONSIVE ISSUES
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, BarChart3, Users, Calendar, Settings, 
  Wifi, Battery, Volume2, Grid3X3, ChevronRight,
  Phone, MessageCircle, Activity, Brain
} from 'lucide-react';

const ResponsiveOSInterface = ({ onAppSelect }) => {
  const navigate = useNavigate();
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
      color: 'from-green-400 to-green-600',
      route: '/ai-quiz',
      description: 'Personalized health assessment'
    },
    {
      id: 'quick-quiz',
      name: 'Quick Health Check',
      icon: Activity,
      color: 'from-red-400 to-red-600',
      route: '/quick-quiz',
      description: 'Fast health screening'
    }
  ];

  const regularApps = [
    {
      id: 'dashboard',
      name: 'Health Dashboard',
      icon: BarChart3,
      color: 'from-blue-400 to-blue-600',
      route: '/dashboard',
      description: 'Your health metrics and trends'
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
      icon: BarChart3,
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

  const handleAppClick = (app, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('App clicked:', app.name, 'Route:', app.route);

    // Handle special routes through parent
    if (onAppSelect && (app.route === '/ai-quiz' || app.route === '/quick-quiz' || app.route === '/scheduler' || app.route === '/settings')) {
      onAppSelect(app);
      return;
    }

    // Handle navigation routes directly
    try {
      switch (app.route) {
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
        default:
          if (onAppSelect) {
            onAppSelect(app);
          } else {
            navigate('/');
          }
      }
    } catch (error) {
      console.error('Navigation failed:', error);
      if (app.route === '/ai-quiz' || app.route === '/quick-quiz' || app.route === '/scheduler' || app.route === '/settings') {
        window.location.href = '/';
      } else {
        window.location.href = app.route;
      }
    }
  };

  // FIXED: Desktop Interface with proper overflow handling
  const DesktopInterface = () => (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Desktop Taskbar - FIXED: z-index and positioning */}
      <div className="sticky top-0 left-0 right-0 h-8 bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 flex items-center justify-between px-4 text-white text-sm z-50">
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

      {/* Main Content - FIXED: proper responsive container */}
      <div className="px-4 py-8 min-h-[calc(100vh-2rem)]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Singapore Health OS
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Your Comprehensive Health Management Platform
            </p>
          </div>

          {/* Featured Apps Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Featured Health Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    className="group bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{app.name}</h3>
                        <p className="text-blue-200 text-sm mb-3">{app.description}</p>
                        <div className="flex items-center gap-2 text-blue-200">
                          <span className="text-blue-200 text-sm">Click to start</span>
                          <ChevronRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Apps Section - FIXED: responsive grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Grid3X3 className="w-6 h-6" />
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
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-xs md:text-sm mb-1 leading-tight">{app.name}</h3>
                    <p className="text-blue-200 text-xs hidden md:block leading-tight">{app.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // FIXED: Mobile Interface with proper scroll handling
  const MobileInterface = () => (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-x-hidden">
      {/* Mobile Status Bar */}
      <div className="h-12 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <span>Health OS</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Mobile Content - FIXED: proper padding for bottom dock */}
      <div className="px-4 py-6 pb-24 min-h-[calc(100vh-3rem)]">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Health OS</h1>
          <p className="text-blue-200">Your health companion</p>
        </div>

        {/* Featured Apps - Mobile */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-4">Featured</h2>
          <div className="space-y-4">
            {featuredApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 active:scale-95 transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{app.name}</h3>
                      <p className="text-blue-200 text-sm truncate">{app.description}</p>
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
                  onClick={(e) => handleAppClick(app, e)}
                  className="text-center active:scale-95 transition-transform cursor-pointer"
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

      {/* Bottom Dock - Mobile - FIXED: proper positioning */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-black bg-opacity-40 backdrop-blur-md border-t border-white border-opacity-20 safe-area-inset-bottom">
        <div className="flex items-center justify-center h-full px-8">
          <div className="flex items-center gap-6">
            {featuredApps.slice(0, 2).map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              );
            })}
            <div
              onClick={(e) => handleAppClick(regularApps[0], e)}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
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