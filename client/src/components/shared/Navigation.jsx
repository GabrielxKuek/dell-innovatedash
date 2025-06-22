// src/components/shared/Navigation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, BarChart3, Users, Heart } from 'lucide-react';

const Navigation = ({ currentPage }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      key: 'home',
      label: 'Home',
      icon: Home,
      path: '/'
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/dashboard'
    },
    {
      key: 'prevention',
      label: 'Prevention',
      icon: Heart,
      path: '/prevention'
    },
    {
      key: 'community',
      label: 'Community',
      icon: Users,
      path: '/community'
    }
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentPage === key
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;