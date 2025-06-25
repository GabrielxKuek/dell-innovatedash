import React, { useState, useEffect } from 'react';
import { AlertTriangle, Heart, Calendar, TrendingUp, Shield, Phone, MapPin, Clock, Star } from 'lucide-react';

const EnhancedHealthDashboard = () => {
  const [user, setUser] = useState({
    name: "Sarah Tan",
    age: 34,
    gender: "female",
    ethnicity: "Chinese",
    riskScore: 23,
    preventionScore: 78
  });

  const [screeningAlerts, setScreeningAlerts] = useState([
    {
      type: "cervical",
      status: "overdue",
      lastDone: "2021-03-15",
      nextDue: "Overdue by 8 months",
      urgency: "high"
    },
    {
      type: "breast",
      status: "upcoming",
      lastDone: "2023-05-10",
      nextDue: "2025-05-10",
      urgency: "medium"
    }
  ]);

  const [localResources, setLocalResources] = useState([
    {
      name: "Ang Mo Kio Polyclinic",
      type: "Cervical Screening",
      distance: "0.8km",
      waitTime: "2-3 days",
      subsidy: "Available for citizens"
    },
    {
      name: "KK Women's and Children's Hospital",
      type: "Comprehensive Screening",
      distance: "3.2km",
      waitTime: "1-2 weeks",
      subsidy: "Medisave claimable"
    }
  ]);

  const preventionRecommendations = [
    {
      category: "Diet",
      priority: "High",
      action: "Reduce hawker center visits to 3x/week",
      impact: "15% risk reduction",
      localTips: ["Choose steamed over fried", "Request less salt/oil", "Add more vegetables"]
    },
    {
      category: "Exercise",
      priority: "Medium",
      action: "Walk 30 minutes daily",
      impact: "20% risk reduction",
      localTips: ["Use park connectors", "Join CC fitness programs", "Take stairs in MRT"]
    },
    {
      category: "Stress",
      priority: "Medium",
      action: "Practice mindfulness",
      impact: "10% risk reduction",
      localTips: ["Join yoga classes at CC", "Visit Botanic Gardens", "Use Calm/Headspace apps"]
    }
  ];

  const RiskScoreDisplay = ({ score, type }) => {
    const getRiskStyles = (score) => {
      if (score < 25) return "text-green-800 bg-green-100 border-green-300";
      if (score < 50) return "text-yellow-800 bg-yellow-100 border-yellow-300";
      return "text-red-800 bg-red-100 border-red-300";
    };

    const getPreventionStyles = (score) => {
      if (score > 75) return "text-green-800 bg-green-100 border-green-300";
      if (score > 50) return "text-yellow-800 bg-yellow-100 border-yellow-300";
      return "text-red-800 bg-red-100 border-red-300";
    };

    const styles = type === 'risk' ? getRiskStyles(score) : getPreventionStyles(score);

    return (
      <div className={`p-6 rounded-lg border-2 ${styles}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">
              {type === 'risk' ? 'Cancer Risk Score' : 'Prevention Score'}
            </h3>
            <p className="text-sm font-medium opacity-80">
              {type === 'risk' ? 'Based on lifestyle & genetics' : 'Your preventive actions'}
            </p>
          </div>
          <div className="text-3xl font-bold">{score}%</div>
        </div>
      </div>
    );
  };

  const ScreeningAlert = ({ alert }) => {
    const getUrgencyStyles = (urgency) => {
      switch(urgency) {
        case 'high': return 'border-l-4 border-red-500 bg-red-50';
        case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50';
        default: return 'border-l-4 border-green-500 bg-green-50';
      }
    };

    return (
      <div className={`${getUrgencyStyles(alert.urgency)} p-4 mb-3 rounded-r-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900 capitalize mb-1">{alert.type} Cancer Screening</h4>
            <p className="text-sm text-gray-700 mb-1">
              Last done: {new Date(alert.lastDone).toLocaleDateString()}
            </p>
            <p className="text-sm font-semibold text-gray-800">Next due: {alert.nextDue}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    );
  };

  const LocalResource = ({ resource }) => (
    <div className="border-2 border-gray-200 rounded-lg p-4 mb-3 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">{resource.name}</h4>
          <p className="text-sm text-gray-700 mb-2 font-medium">{resource.type}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{resource.distance}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{resource.waitTime}</span>
            </span>
          </div>
          <p className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-1 rounded inline-block">
            {resource.subsidy}
          </p>
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <button className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors">
            Call
          </button>
          <button className="border-2 border-gray-300 bg-white text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
            Directions
          </button>
        </div>
      </div>
    </div>
  );

  const PreventionCard = ({ rec }) => (
    <div className="border-2 border-gray-200 rounded-lg p-4 mb-3 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{rec.category}</h4>
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${
            rec.priority === 'High' 
              ? 'bg-red-100 text-red-800 border border-red-300' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
          }`}>
            {rec.priority} Priority
          </span>
        </div>
        <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
          {rec.impact}
        </span>
      </div>
      <p className="text-sm text-gray-800 mb-3 font-medium">{rec.action}</p>
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
        <div className="font-bold text-blue-800 mb-2">Singapore Tips:</div>
        <ul className="ml-4 list-disc text-blue-700">
          {rec.localTips.map((tip, index) => (
            <li key={index} className="mb-1">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Data secured by Singapore PDPA</span>
            </div>
          </div>
        </div>

        {/* Risk Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <RiskScoreDisplay score={user.riskScore} type="risk" />
          <RiskScoreDisplay score={user.preventionScore} type="prevention" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Screening Alerts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Screening Alerts</h2>
              </div>
              {screeningAlerts.map((alert, index) => (
                <ScreeningAlert key={index} alert={alert} />
              ))}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <div className="font-bold text-blue-800 mb-2">Singapore Cancer Screening Programme:</div>
                <p className="text-blue-700">Subsidized screenings available at all polyclinics for eligible residents.</p>
              </div>
            </div>
          </div>

          {/* Prevention Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Prevention Actions</h2>
              </div>
              {preventionRecommendations.map((rec, index) => (
                <PreventionCard key={index} rec={rec} />
              ))}
            </div>
          </div>

          {/* Local Resources */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900">Nearby Resources</h2>
              </div>
              {localResources.map((resource, index) => (
                <LocalResource key={index} resource={resource} />
              ))}
              
              {/* Emergency Contacts */}
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <h3 className="font-bold text-red-800 mb-3 text-lg">Emergency Contacts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-red-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-bold">Emergency: 995</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-bold">Health Hotline: 1800-567-2020</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-bold">Cancer Helpline: 6225-5655</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Health Insights */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">This Week's Health Insights</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="text-3xl font-bold text-green-700 mb-2">5</div>
              <p className="text-sm text-green-800 font-medium">Days with 10k+ steps</p>
            </div>
            <div className="text-center p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-700 mb-2">3</div>
              <p className="text-sm text-blue-800 font-medium">Healthy meals logged</p>
            </div>
            <div className="text-center p-6 bg-purple-50 border-2 border-purple-200 rounded-lg">
              <div className="text-3xl font-bold text-purple-700 mb-2">2</div>
              <p className="text-sm text-purple-800 font-medium">Stress management sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHealthDashboard;