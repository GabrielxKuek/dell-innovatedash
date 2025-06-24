// src/components/ResponsiveOSInterface.jsx - CSS CLICK ISSUES FIXED
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, BarChart3, Users, Heart, Calendar, Settings, 
  Wifi, Battery, Volume2, Grid3X3, ChevronRight,
  Star, Zap, TrendingUp
} from 'lucide-react';

const ResponsiveOSInterface = ({ onAppSelect }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, []);

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

  // Enhanced click handler with event debugging
  const handleAppClick = (app, event) => {
    // Prevent event bubbling and ensure we capture the click
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('=== CLICK DEBUG INFO ===');
    console.log('App clicked:', app.name, 'Route:', app.route);
    console.log('Event target:', event?.target);
    console.log('Current target:', event?.currentTarget);
    console.log('onAppSelect available:', typeof onAppSelect === 'function');
    console.log('navigate available:', typeof navigate === 'function');
    console.log('Window width:', window.innerWidth, 'isMobile:', isMobile);
    console.log('========================');

    // Handle special routes through parent
    if (onAppSelect && (app.route === '/ai-quiz' || app.route === '/quick-quiz' || app.route === '/scheduler' || app.route === '/settings')) {
      console.log('Using parent onAppSelect handler');
      onAppSelect(app);
      return;
    }

    // Handle navigation routes directly
    try {
      switch (app.route) {
        case '/dashboard':
          console.log('Navigating to dashboard...');
          navigate('/dashboard');
          break;
        case '/prevention':
          console.log('Navigating to prevention...');
          navigate('/prevention');
          break;
        case '/community':
          console.log('Navigating to community...');
          navigate('/community');
          break;
        case '/analytics':
          console.log('Navigating to analytics...');
          navigate('/analytics');
          break;
        default:
          console.log('Unknown route, falling back to onAppSelect or home');
          if (onAppSelect) {
            onAppSelect(app);
          } else {
            navigate('/');
          }
      }
    } catch (error) {
      console.error('Navigation failed:', error);
      // Fallback
      if (app.route === '/ai-quiz' || app.route === '/quick-quiz' || app.route === '/scheduler' || app.route === '/settings') {
        window.location.href = '/';
      } else {
        window.location.href = app.route;
      }
    }
  };

  const DesktopInterface = () => (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Pattern - FIXED: Make sure it doesn't block clicks */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Desktop Taskbar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 flex items-center justify-between px-4 text-white text-sm z-50">
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

      {/* Main Content - FIXED: Ensure proper z-index and click handling */}
      <div className="pt-8 p-8 h-full relative z-10">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Singapore Health OS
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Your Comprehensive Health Management Platform
            </p>
          </div>

          {/* Featured Apps - FIXED: Enhanced click handling */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Featured Health Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    onMouseDown={(e) => {
                      console.log('Mouse down on:', app.name);
                      e.preventDefault();
                    }}
                    className="group bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 relative z-20"
                    style={{ 
                      pointerEvents: 'auto',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  >
                    <div className="flex items-center gap-6 pointer-events-none">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{app.name}</h3>
                        <p className="text-blue-200 text-sm mb-4">{app.description}</p>
                        {app.badge && (
                          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                            {app.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 group-hover:text-white transition-colors">
                        <span className="text-blue-200 text-sm">Click to start</span>
                        <ChevronRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Apps - FIXED: Enhanced click handling */}
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
                    onClick={(e) => handleAppClick(app, e)}
                    onMouseDown={(e) => {
                      console.log('Mouse down on:', app.name);
                      e.preventDefault();
                    }}
                    className="group text-center cursor-pointer relative z-20"
                    style={{ 
                      pointerEvents: 'auto',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl pointer-events-none`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1 pointer-events-none">{app.name}</h3>
                    <p className="text-blue-200 text-xs pointer-events-none">{app.description}</p>
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
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-6 pb-24">
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
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="flex items-center gap-4 pointer-events-none">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{app.name}</h3>
                      <p className="text-blue-200 text-sm">{app.description}</p>
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
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-2 mx-auto shadow-lg pointer-events-none`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-xs font-medium leading-tight pointer-events-none">{app.name}</h3>
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
                  onClick={(e) => handleAppClick(app, e)}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Icon className="w-7 h-7 text-white pointer-events-none" />
                </div>
              );
            })}
            <div
              onClick={(e) => handleAppClick(regularApps[0], e)}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              <BarChart3 className="w-7 h-7 text-white pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileInterface /> : <DesktopInterface />;
};

export default ResponsiveOSInterface;