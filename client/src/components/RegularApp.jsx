import { useState, useEffect } from 'react';
import { 
  Heart, BarChart3, Users, Calendar, Settings, 
  Wifi, Battery, Grid3X3, ChevronRight,
  Activity, Brain
} from 'lucide-react';

const RegularApp = ({ appName, appIcon: Icon, onBack }) => {
  return <>
    <div className="h-full flex flex-col">
        <div className="bg-pink-50 p-4 border-b border-pink-200">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-gray-600" />
            <h1 className="text-xl font-bold text-gray-800">{appName}</h1>
            </div>
        </div>
        </div>
        
        <div className="flex-1 p-6 bg-pink-50 flex items-center justify-center">
        <div className="text-center">
            <Icon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{appName}</h2>
            <p className="text-gray-600 mb-4">This feature is coming soon!</p>
            <button
            onClick={onBack}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
            Back to Home
            </button>
        </div>
        </div>
    </div>
  </>
};

export default RegularApp;