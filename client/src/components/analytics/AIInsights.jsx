// src/components/analytics/AIInsights.jsx - AI-Powered Health Insights
import React, { useState } from 'react';
import { 
  Brain, TrendingUp, AlertTriangle, Lightbulb, Target, 
  ChevronDown, ChevronUp, CheckCircle, Clock, 
  BarChart3, Users, Zap
} from 'lucide-react';

const AIInsights = ({ insights, onAcceptRecommendation }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [acceptedRecommendations, setAcceptedRecommendations] = useState(new Set());

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
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
    }
    
    switch(type) {
      case 'trend': 
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600'
        };
      case 'alert': 
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600'
        };
      case 'recommendation': 
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: 'text-green-600'
        };
      case 'opportunity': 
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-600'
        };
      default: 
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          icon: 'text-purple-600'
        };
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${badges[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const handleExpandToggle = (insightId) => {
    setExpandedInsight(expandedInsight === insightId ? null : insightId);
  };

  const handleAcceptRecommendation = (insight) => {
    setAcceptedRecommendations(prev => new Set([...prev, insight.id]));
    if (onAcceptRecommendation) {
      onAcceptRecommendation(insight);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Health Analytics</h2>
            <p className="text-purple-200 text-sm">Powered by Singapore health data patterns</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-purple-200">Live Analysis</span>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const colors = getInsightColor(insight.type, insight.priority);
          const isExpanded = expandedInsight === insight.id;
          const isAccepted = acceptedRecommendations.has(insight.id);

          return (
            <div
              key={insight.id}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 bg-white rounded-lg ${colors.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${colors.text}`}>{insight.title}</h3>
                      {getPriorityBadge(insight.priority)}
                    </div>
                    <p className={`text-sm ${colors.text} mb-3`}>{insight.summary}</p>
                    
                    {/* Confidence Score */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-600">AI Confidence:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              insight.confidence >= 0.9 ? 'bg-green-500' :
                              insight.confidence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${insight.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {Math.round(insight.confidence * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <h4 className={`font-medium ${colors.text} mb-2`}>Detailed Analysis</h4>
                          <p className={`text-sm ${colors.text} leading-relaxed`}>
                            {insight.details}
                          </p>
                        </div>

                        {insight.recommendations && insight.recommendations.length > 0 && (
                          <div>
                            <h4 className={`font-medium ${colors.text} mb-2`}>Recommendations</h4>
                            <ul className="space-y-2">
                              {insight.recommendations.map((rec, index) => (
                                <li key={index} className={`text-sm ${colors.text} flex items-start gap-2`}>
                                  <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></div>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          {!isAccepted ? (
                            <button
                              onClick={() => handleAcceptRecommendation(insight)}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Accept Recommendation
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Recommendation Accepted
                            </div>
                          )}
                          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Schedule Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                {insight.expandable && (
                  <button
                    onClick={() => handleExpandToggle(insight.id)}
                    className={`p-1 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors ${colors.text}`}
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
          );
        })}
      </div>
      
      {/* AI Analysis Summary */}
      <div className="mt-6 pt-4 border-t border-white border-opacity-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-300" />
            <span className="text-white text-opacity-75">
              {insights.length} insights generated
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-300" />
            <span className="text-white text-opacity-75">
              Population: 5.9M residents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-opacity-75">
              Last updated: {new Date().toLocaleString('en-SG')}
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
          <p className="text-xs text-white text-opacity-75 leading-relaxed">
            <strong>AI Methodology:</strong> Analysis based on Singapore Cancer Registry data (2018-2022), 
            National Population Health Survey (2023), and international health patterns. 
            Machine learning models trained on demographic, lifestyle, and clinical factors 
            specific to Singapore's multi-ethnic population.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;