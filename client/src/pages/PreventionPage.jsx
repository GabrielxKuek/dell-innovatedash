// src/pages/PreventionPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import Navigation from '../components/shared/Navigation';
import { PreventionRecommendationEngine } from '../services/api/PreventionRecommendationEngine';
import { ScreeningComplianceTracker } from '../services/api/ScreeningComplianceTracker';
import { ArrowLeft, Heart, Calendar, MapPin, Phone } from 'lucide-react';

const PreventionPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [screeningStatus, setScreeningStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserDataAndGenerateRecommendations();
  }, []);

  const loadUserDataAndGenerateRecommendations = async () => {
    try {
      // Load user data
      const savedData = localStorage.getItem('healthUserData');
      if (savedData) {
        const data = JSON.parse(savedData);
        setUserData(data);

        // Generate recommendations
        const preventionEngine = new PreventionRecommendationEngine();
        const screeningTracker = new ScreeningComplianceTracker();
        
        const recs = preventionEngine.generatePersonalizedPrevention(data, {});
        const screening = screeningTracker.assessComplianceStatus(data);
        
        setRecommendations(recs);
        setScreeningStatus(screening);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your prevention plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center p-4 bg-white border-b">
            <button 
              onClick={handleBack}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Prevention Plan</h1>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Screening Status */}
            {screeningStatus && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="font-semibold">Screening Status</h2>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {screeningStatus.overallScore}%
                  </div>
                  <p className="text-sm text-gray-600">Compliance Score</p>
                </div>
                
                {screeningStatus.nextActions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-red-600">Action Required:</h3>
                    {screeningStatus.nextActions.map((action, index) => (
                      <div key={index} className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                        <p className="font-medium">{action.action}</p>
                        <p className="text-sm text-gray-600">{action.subsidy}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Immediate Actions */}
            {recommendations?.immediate.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-red-600" />
                  <h2 className="font-semibold">Immediate Actions</h2>
                </div>
                {recommendations.immediate.map((rec, index) => (
                  <div key={index} className="border-l-4 border-red-500 bg-red-50 p-3 mb-3 rounded">
                    <h3 className="font-medium text-red-800">{rec.category}</h3>
                    <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                    <p className="text-sm font-medium text-green-600 mb-2">{rec.impact}</p>
                    
                    {rec.nextSteps && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Next Steps:</p>
                        <ul className="text-sm text-gray-600 ml-4 list-disc">
                          {rec.nextSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Short-term Recommendations */}
            {recommendations?.shortTerm.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold mb-3">Short-term Goals</h2>
                {recommendations.shortTerm.map((rec, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 bg-yellow-50 p-3 mb-3 rounded">
                    <h3 className="font-medium text-yellow-800">{rec.category}</h3>
                    <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                    <p className="text-sm font-medium text-green-600 mb-2">{rec.impact}</p>
                    
                    {rec.singaporeTips && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Singapore Tips:</p>
                        <ul className="text-sm text-gray-600 ml-4 list-disc">
                          {rec.singaporeTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Local Resources */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Nearby Resources</h2>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded p-3">
                  <h3 className="font-medium">Health Promotion Board</h3>
                  <p className="text-sm text-gray-600">National health education and promotion</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      1800-567-2020
                    </span>
                    <span>hpb.gov.sg</span>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <h3 className="font-medium">Singapore Cancer Society</h3>
                  <p className="text-sm text-gray-600">Cancer support and education</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      6225-5655
                    </span>
                    <span>singaporecancersociety.org.sg</span>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <h3 className="font-medium">Nearest Polyclinic</h3>
                  <p className="text-sm text-gray-600">Primary healthcare services</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Find at nhgp.com.sg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h2 className="font-semibold text-red-800 mb-3">Emergency Contacts</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span><strong>Emergency:</strong> 995</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span><strong>Health Hotline:</strong> 1800-567-2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span><strong>Mental Health:</strong> 6389-2222</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <Navigation currentPage="prevention" />
        </div>
      </Border>
    </div>
  );
};

export { PreventionPage };