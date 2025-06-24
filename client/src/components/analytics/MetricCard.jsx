// src/components/analytics/MetricCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, color = "blue", suffix = "", prefix = "", trend = null }) => {
  const getTrendIcon = (change) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (change) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const TrendIcon = getTrendIcon(change);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== null && change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${getTrendColor(change)}`}>
              <TrendIcon className="w-4 h-4 mr-1" />
              <span>
                {Math.abs(change)}% from last period
              </span>
            </div>
          )}
          {trend && (
            <div className="text-xs text-gray-500 mt-1">
              {trend}
            </div>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full ml-4`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;