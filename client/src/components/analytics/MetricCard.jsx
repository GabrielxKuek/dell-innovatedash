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

// src/components/analytics/ChartComponents.jsx
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart = ({ data, lines, height = 300, title }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="period" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            name={line.name}
            dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const StackedBarChart = ({ data, bars, height = 300, title }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip content={<CustomTooltip formatter={(value) => `${value}%`} />} />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            stackId="a"
            fill={bar.color}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const DonutChart = ({ data, height = 300, title, centerText }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip formatter={(value) => `${value}%`} />}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    {centerText && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{centerText.value}</div>
          <div className="text-sm text-gray-600">{centerText.label}</div>
        </div>
      </div>
    )}
  </div>
);

const HorizontalBarChart = ({ data, height = 400, title, valueFormatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" stroke="#6b7280" fontSize={12} />
        <YAxis 
          dataKey="category" 
          type="category" 
          width={120} 
          stroke="#6b7280" 
          fontSize={12}
        />
        <Tooltip 
          content={<CustomTooltip formatter={valueFormatter} />}
        />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export { TrendChart, StackedBarChart, DonutChart, HorizontalBarChart, MetricCard };

// src/components/analytics/AIInsights.jsx
import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, ChevronDown, ChevronUp } from 'lucide-react';

const AIInsights = ({ insights, onAcceptRecommendation }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const getInsightIcon = (type) => {
    switch(type) {
      case 'trend': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      case 'opportunity': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type, priority) => {
    if (priority === 'high') {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    switch(type) {
      case 'trend': return 'border-blue-500 bg-blue-50 text-blue-800';
      case 'alert': return 'border-red-500 bg-red-50 text-red-800';
      case 'recommendation': return 'border-green-500 bg-green-50 text-green-800';
      case 'opportunity': return 'border-purple-500 bg-purple-50 text-purple-800';
      default: return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6" />
        <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type);
          const isExpanded = expandedInsight === index;
          
          return (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-5 h-5 mt-0.5 text-white" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm uppercase tracking-wide">
                        {insight.type}
                      </span>
                      {insight.priority && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          insight.priority === 'high' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                        }`}>
                          {insight.priority}
                        </span>
                      )}
                      {insight.confidence && (
                        <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white mb-2">{insight.message}</p>
                    
                    {isExpanded && insight.details && (
                      <div className="mt-3 space-y-2">
                        {insight.details.data && (
                          <div className="bg-white bg-opacity-20 rounded p-3 text-xs">
                            <strong>Supporting Data:</strong>
                            <ul className="mt-1 ml-4 list-disc">
                              {insight.details.data.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {insight.details.actions && (
                          <div className="bg-white bg-opacity-20 rounded p-3 text-xs">
                            <strong>Recommended Actions:</strong>
                            <ul className="mt-1 ml-4 list-disc">
                              {insight.details.actions.map((action, i) => (
                                <li key={i}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {insight.details.timeline && (
                          <div className="bg-white bg-opacity-20 rounded p-3 text-xs">
                            <strong>Timeline:</strong> {insight.details.timeline}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {insight.actionable && onAcceptRecommendation && (
                    <button
                      onClick={() => onAcceptRecommendation(insight)}
                      className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                    >
                      Accept
                    </button>
                  )}
                  
                  {insight.details && (
                    <button
                      onClick={() => setExpandedInsight(isExpanded ? null : index)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* AI Status */}
      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white text-opacity-75">
            Last Analysis: {new Date().toLocaleString()}
          </span>
          <span className="text-white text-opacity-75">
            {insights.length} insights generated
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;