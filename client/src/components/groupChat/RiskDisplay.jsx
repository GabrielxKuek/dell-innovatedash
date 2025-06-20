// client/src/components/groupChat/RiskDisplay.jsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Activity,
  Clock,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const RiskDisplay = ({ risk, isCalculating, healthData, onQuestionSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatingRisk, setAnimatingRisk] = useState(0);

  // Animate risk percentage changes
  useEffect(() => {
    if (risk && risk.riskPercentage !== undefined) {
      const startValue = animatingRisk;
      const endValue = risk.riskPercentage;
      const duration = 1000; // 1 second animation
      const steps = 30;
      const stepTime = duration / steps;
      const increment = (endValue - startValue) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatingRisk(Math.round(startValue + (increment * currentStep)));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatingRisk(endValue);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [risk?.riskPercentage]);

  if (!risk && !isCalculating) {
    return (
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 p-4">
        <div className="flex items-center justify-center text-gray-500">
          <Activity className="w-5 h-5 mr-2" />
          <span className="text-sm">Start chatting to get your risk assessment</span>
        </div>
      </div>
    );
  }

  const getRiskColor = (percentage) => {
    if (percentage < 20) return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      accent: 'text-green-500'
    };
    if (percentage < 40) return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200', 
      text: 'text-yellow-700',
      accent: 'text-yellow-500'
    };
    if (percentage < 60) return {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700', 
      accent: 'text-orange-500'
    };
    return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      accent: 'text-red-500'
    };
  };

  const getRiskIcon = (percentage) => {
    if (percentage < 20) return <Shield className="w-5 h-5" />;
    if (percentage < 40) return <TrendingDown className="w-5 h-5" />;
    if (percentage < 60) return <AlertTriangle className="w-5 h-5" />;
    return <TrendingUp className="w-5 h-5" />;
  };

  const getRiskDescription = (percentage, level) => {
    if (percentage < 20) return "Your current risk factors suggest a lower likelihood";
    if (percentage < 40) return "Some risk factors identified that warrant attention";
    if (percentage < 60) return "Several risk factors present - consider discussing with a doctor";
    return "Multiple risk factors identified - medical consultation recommended";
  };

  const colors = risk ? getRiskColor(risk.riskPercentage) : getRiskColor(0);

  return (
    <div className={`${colors.bg} ${colors.border} border-b transition-all duration-300`}>
      {isCalculating ? (
        <div className="p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-pink-primary border-t-transparent"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Analyzing your health data...</span>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Using AI to calculate personalized risk assessment
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {/* Main Risk Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${colors.accent} flex-shrink-0`}>
                {getRiskIcon(animatingRisk)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-800">Risk Level</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {risk.riskLevel}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {getRiskDescription(animatingRisk, risk.riskLevel)}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-2xl font-bold ${colors.accent}`}>
                {animatingRisk}%
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {risk.confidence} confidence
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                  animatingRisk < 20 ? 'bg-green-500' :
                  animatingRisk < 40 ? 'bg-yellow-500' :
                  animatingRisk < 60 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(animatingRisk, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Key Factors Preview */}
          {risk.keyFactors && risk.keyFactors.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs text-gray-600 font-medium mb-1">Key Factors:</div>
                <div className="text-xs text-gray-700">
                  {risk.keyFactors.slice(0, 2).join(', ')}
                  {risk.keyFactors.length > 2 && (
                    <span className="text-gray-500"> +{risk.keyFactors.length - 2} more</span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 p-1 hover:bg-white/50 rounded-full transition-colors"
              >
                {isExpanded ? 
                  <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                }
              </button>
            </div>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 animate-in slide-in-from-top duration-200">
              {/* All Key Factors */}
              {risk.keyFactors && risk.keyFactors.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-2">All Risk Factors:</div>
                  <div className="flex flex-wrap gap-1">
                    {risk.keyFactors.map((factor, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-white/70 text-gray-700 rounded-full border border-gray-300"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {risk.recommendations && risk.recommendations.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-2">Recommendations:</div>
                  <div className="space-y-1">
                    {risk.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Questions */}
              {risk.nextQuestions && risk.nextQuestions.length > 0 && onQuestionSelect && (
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-2">Answer these to improve accuracy:</div>
                  <div className="space-y-1">
                    {risk.nextQuestions.slice(0, 2).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => onQuestionSelect(question)}
                        className="text-xs text-left text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors w-full text-left"
                      >
                        "{question}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {risk.disclaimer && (
                <div className="flex items-start space-x-2 p-2 bg-white/70 rounded border border-gray-300">
                  <Info className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-600">
                    {risk.disclaimer}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {risk.isError && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-yellow-700">
                  Risk calculation temporarily unavailable. Please try again later.
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RiskDisplay;