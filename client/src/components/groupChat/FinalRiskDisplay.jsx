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
  Info,
  ArrowLeft
} from 'lucide-react';

const FinalRiskDisplay = ({ riskAssessment, isCalculating, onBack }) => {
  if (isCalculating) {
    return (
      <div className="h-full w-full bg-white flex flex-col">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
          <div className="flex items-center">
            <button 
              onClick={onBack} 
              className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h2 className="text-lg font-semibold">Risk Assessment Results</h2>
          </div>
        </div>
        
        {/* Loading Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-primary mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Calculating Your Risk Assessment
            </h3>
            <p className="text-sm text-gray-600">
              Our AI is analyzing your responses to provide a personalized risk assessment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!riskAssessment) {
    return (
      <div className="h-full w-full bg-white flex flex-col">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
          <div className="flex items-center">
            <button 
              onClick={onBack} 
              className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h2 className="text-lg font-semibold">Risk Assessment Results</h2>
          </div>
        </div>
      </div>
    );
  }

  const getDummyResponse = () => ({
    riskPercentage: 25,
    riskLevel: "Low-Moderate Risk",
    confidence: "Medium",
    keyFactors: ["Age demographics", "Lifestyle factors"],
    recommendations: ["Regular check-ups", "Healthy lifestyle"],
    protectiveFactors: ["Active lifestyle"],
    additionalInfo: "Please check-up with a medical professional for best results",
    disclaimer: "This is a sample assessment only"
  });

  // Use dummy data if there's an error or no data
  const displayData = (riskAssessment && !riskAssessment.isError) ? riskAssessment : getDummyResponse();

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

  const getRiskImage = (percentage) => {
    const imageClasses = "w-full h-auto mb-12 max-w-xs mx-auto rounded-lg shadow-md sm:max-w-sm md:max-w-md";
    
    if (percentage < 20) {
      return (
        <img 
          src="/lowRisk.jpg" 
          alt="Low Risk Illustration" 
          className={imageClasses}
          onError={(e) => {
            // Hide image and show fallback icon if image fails
            e.target.style.display = 'none';
          }}
        />
      );
    }
    if (percentage < 40) {
      return (
        <img 
          src="/moderateRisk.jpg" 
          alt="Moderate Risk Illustration" 
          className={imageClasses}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    if (percentage < 60) {
      return (
        <img 
          src="/atRisk.jpg" 
          alt="High Risk Illustration" 
          className={imageClasses}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    return (
      <img 
        src="/atRisk.png" 
        alt="Very High Risk Illustration" 
        className={imageClasses}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  };

  const colors = getRiskColor(displayData.riskPercentage);

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h2 className="text-lg font-semibold">Your Risk Assessment Results</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`${colors.bg} p-6`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.bg} ${colors.border} border-2 mb-4`}>
              <div className={colors.accent}>
                {getRiskIcon(displayData.riskPercentage)}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Risk Assessment</h2>
            <p className="text-sm text-gray-600">Based on your responses</p>
          </div>

          {getRiskImage(displayData.riskPercentage)}

          {/* Risk Score */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Overall Risk Level</h3>
                <p className={`text-sm font-medium ${colors.accent}`}>{displayData.riskLevel}</p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${colors.accent}`}>
                  {displayData.riskPercentage}%
                </div>
                <div className="text-xs text-gray-500">
                  Confidence: {displayData.confidence}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${colors.progressBg}`}
                  style={{ width: `${Math.min(displayData.riskPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low Risk</span>
                <span>High Risk</span>
              </div>
            </div>
          </div>

          {/* Key Risk Factors */}
          {displayData.keyFactors && displayData.keyFactors.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Key Risk Factors Identified
              </h4>
              <div className="grid gap-2">
                {displayData.keyFactors.map((factor, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {displayData.recommendations && displayData.recommendations.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Recommendations
              </h4>
              <div className="space-y-2">
                {displayData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protective Factors */}
          {displayData.protectiveFactors && displayData.protectiveFactors.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Protective Factors
              </h4>
              <div className="space-y-2">
                {displayData.protectiveFactors.map((factor, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {displayData.additionalInfo && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Additional Information
              </h4>
              <p className="text-sm text-blue-700">{displayData.additionalInfo}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Important Disclaimer
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {displayData.disclaimer || 
               "This assessment is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper medical evaluation and personalized recommendations. Risk factors can change over time, and this assessment is based on the information provided today."}
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">What's next?</p>
            
            {/* Book Now Button */}
            <div className="mb-4">
              <button
                onClick={() => window.open('https://www.singaporecancersociety.org.sg/get-screened/book-your-screening-appointment-at-scs-clinic-bishan.html#register_appointment', '_blank')}
                className="w-full bg-gradient-to-r from-pink-primary to-pink-secondary text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-secondary hover:to-pink-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📅 Book Your Screening Appointment
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Schedule your appointment at Singapore Cancer Society Clinic
              </p>
            </div>
            
            <div className="text-xs text-gray-500 pb-6">
              • Share these results with your healthcare provider<br/>
              • Schedule regular check-ups as recommended<br/>
              • Consider lifestyle modifications if suggested<br/>
              • Stay informed about early detection methods
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalRiskDisplay;