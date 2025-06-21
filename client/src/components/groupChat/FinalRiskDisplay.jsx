// client/src/components/groupChat/FinalRiskDisplay.jsx
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Activity,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const FinalRiskDisplay = ({ riskAssessment, isCalculating }) => {
  if (isCalculating) {
    return (
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-primary mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Calculating Your Risk Assessment
          </h3>
          <p className="text-sm text-gray-600">
            Our AI is analyzing your responses to provide a personalized risk assessment...
          </p>
        </div>
      </div>
    );
  }

  if (!riskAssessment) {
    return null;
  }

  if (riskAssessment.isError) {
    return (
      <div className="bg-red-50 border-t border-red-200 p-6">
        <div className="flex items-center justify-center space-x-2 text-red-700">
          <AlertCircle className="w-6 h-6" />
          <span className="font-medium">Assessment Error</span>
        </div>
        <p className="text-sm text-red-600 text-center mt-2">
          {riskAssessment.message}
        </p>
      </div>
    );
  }

  const getRiskColor = (percentage) => {
    if (percentage < 20) return {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-800',
      accent: 'text-green-600',
      progressBg: 'bg-green-500'
    };
    if (percentage < 40) return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      accent: 'text-yellow-600',
      progressBg: 'bg-yellow-500'
    };
    if (percentage < 60) return {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-800',
      accent: 'text-orange-600',
      progressBg: 'bg-orange-500'
    };
    return {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      accent: 'text-red-600',
      progressBg: 'bg-red-500'
    };
  };

  const getRiskIcon = (percentage) => {
    if (percentage < 20) return <Shield className="w-8 h-8" />;
    if (percentage < 40) return <TrendingDown className="w-8 h-8" />;
    if (percentage < 60) return <AlertTriangle className="w-8 h-8" />;
    return <TrendingUp className="w-8 h-8" />;
  };

  const colors = getRiskColor(riskAssessment.riskPercentage);

  return (
    <div className={`${colors.bg} border-t-2 ${colors.border} p-6 max-h-80 overflow-y-auto`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.bg} ${colors.border} border-2 mb-4`}>
          <div className={colors.accent}>
            {getRiskIcon(riskAssessment.riskPercentage)}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Risk Assessment</h2>
        <p className="text-sm text-gray-600">Based on your responses</p>
      </div>

      {/* Risk Score */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Overall Risk Level</h3>
            <p className={`text-sm font-medium ${colors.accent}`}>{riskAssessment.riskLevel}</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${colors.accent}`}>
              {riskAssessment.riskPercentage}%
            </div>
            <div className="text-xs text-gray-500">
              Confidence: {riskAssessment.confidence}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${colors.progressBg}`}
              style={{ width: `${Math.min(riskAssessment.riskPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>
      </div>

      {/* Key Risk Factors */}
      {riskAssessment.keyFactors && riskAssessment.keyFactors.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Key Risk Factors Identified
          </h4>
          <div className="grid gap-2">
            {riskAssessment.keyFactors.map((factor, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {riskAssessment.recommendations && riskAssessment.recommendations.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {riskAssessment.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start text-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Protective Factors */}
      {riskAssessment.protectiveFactors && riskAssessment.protectiveFactors.length > 0 && (
        <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Protective Factors
          </h4>
          <div className="space-y-2">
            {riskAssessment.protectiveFactors.map((factor, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-700">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {riskAssessment.additionalInfo && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Additional Information
          </h4>
          <p className="text-sm text-blue-700">{riskAssessment.additionalInfo}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Important Disclaimer
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          {riskAssessment.disclaimer || 
           "This assessment is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper medical evaluation and personalized recommendations. Risk factors can change over time, and this assessment is based on the information provided today."}
        </p>
      </div>

      {/* Next Steps */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">What's next?</p>
        <div className="text-xs text-gray-500">
          • Share these results with your healthcare provider<br/>
          • Schedule regular check-ups as recommended<br/>
          • Consider lifestyle modifications if suggested<br/>
          • Stay informed about early detection methods
        </div>
      </div>
    </div>
  );
};

export default FinalRiskDisplay;