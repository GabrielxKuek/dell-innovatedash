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
    const getColor = (score) => {
      if (score < 25) return "text-green-600 bg-green-50";
      if (score < 50) return "text-yellow-600 bg-yellow-50";
      return "text-red-600 bg-red-50";
    };

    const getPreventionColor = (score) => {
      if (score > 75) return "text-green-600 bg-green-50";
      if (score > 50) return "text-yellow-600 bg-yellow-50";
      return "text-red-600 bg-red-50";
    };

    return (
      <div className={`p-4 rounded-lg ${type === 'risk' ? getColor(score) : getPreventionColor(score)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              {type === 'risk' ? 'Cancer Risk Score' : 'Prevention Score'}
            </h3>
            <p className="text-sm opacity-75">
              {type === 'risk' ? 'Based on lifestyle & genetics' : 'Your preventive actions'}
            </p>
          </div>
          <div className="text-2xl font-bold">{score}%</div>
        </div>
      </div>
    );
  };

  const ScreeningAlert = ({ alert }) => {
    const getUrgencyColor = (urgency) => {
      switch(urgency) {
        case 'high': return 'border-red-500 bg-red-50';
        case 'medium': return 'border-yellow-500 bg-yellow-50';
        default: return 'border-green-500 bg-green-50';
      }
    };

    return (
      <div className={`border-l-4 p-4 mb-3 ${getUrgencyColor(alert.urgency)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold capitalize">{alert.type} Cancer Screening</h4>
            <p className="text-sm text-gray-600">
              Last done: {new Date(alert.lastDone).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium">Next due: {alert.nextDue}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    );
  };

  const LocalResource = ({ resource }) => (
    <div className="border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{resource.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{resource.type}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resource.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {resource.waitTime}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">{resource.subsidy}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
            Call
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-50">
            Directions
          </button>
        </div>
      </div>
    </div>
  );

  const PreventionCard = ({ rec }) => (
    <div className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{rec.category}</h4>
          <span className={`text-xs px-2 py-1 rounded ${
            rec.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {rec.priority} Priority
          </span>
        </div>
        <span className="text-sm font-medium text-green-600">{rec.impact}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
      <div className="bg-blue-50 p-2 rounded text-xs">
        <strong>Singapore Tips:</strong>
        <ul className="mt-1 ml-4 list-disc">
          {rec.localTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name} • {user.age}yo {user.ethnicity} {user.gender}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            Data secured by Singapore Personal Data Protection Act
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Screening Alerts</h2>
            </div>
            {screeningAlerts.map((alert, index) => (
              <ScreeningAlert key={index} alert={alert} />
            ))}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <strong>Singapore Cancer Screening Programme:</strong>
              <p className="mt-1">Subsidized screenings available at all polyclinics for eligible residents.</p>
            </div>
          </div>
        </div>

        {/* Prevention Recommendations */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Prevention Actions</h2>
            </div>
            {preventionRecommendations.map((rec, index) => (
              <PreventionCard key={index} rec={rec} />
            ))}
          </div>
        </div>

        {/* Local Resources */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Nearby Resources</h2>
            </div>
            {localResources.map((resource, index) => (
              <LocalResource key={index} resource={resource} />
            ))}
            
            {/* Emergency Contacts */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Contacts</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Emergency: 995</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Health Hotline: 1800-567-2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Cancer Helpline: 6225-5655</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Health Insights */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold">This Week's Health Insights</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-gray-600">Days with 10k+ steps</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-sm text-gray-600">Healthy meals logged</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <p className="text-sm text-gray-600">Stress management sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHealthDashboard;