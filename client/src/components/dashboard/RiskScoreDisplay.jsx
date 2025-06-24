// src/components/dashboard/RiskScoreDisplay.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const RiskScoreDisplay = ({ score, type, trend = null }) => {
  const getColor = (score, type) => {
    if (type === 'risk') {
      if (score < 25) return "text-green-600 bg-green-50 border-green-200";
      if (score < 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
      return "text-red-600 bg-red-50 border-red-200";
    } else {
      if (score > 75) return "text-green-600 bg-green-50 border-green-200";
      if (score > 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
      return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getIcon = (type) => {
    return type === 'risk' ? Activity : TrendingUp;
  };

  const Icon = getIcon(type);

  return (
    <div className={`p-4 rounded-lg border ${getColor(score, type)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">
              {type === 'risk' ? 'Cancer Risk Score' : 'Prevention Score'}
            </h3>
            <p className="text-sm opacity-75">
              {type === 'risk' ? 'Based on lifestyle & genetics' : 'Your preventive actions'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{score}%</div>
          {trend && (
            <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// src/components/dashboard/ScreeningAlert.jsx
import React from 'react';
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const ScreeningAlert = ({ alert, onBookNow }) => {
  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-green-500 bg-green-50';
    }
  };

  const getIcon = (urgency) => {
    switch(urgency) {
      case 'high': return AlertTriangle;
      case 'medium': return Calendar;
      default: return CheckCircle;
    }
  };

  const Icon = getIcon(alert.urgency);

  return (
    <div className={`border-l-4 p-4 mb-3 rounded ${getUrgencyColor(alert.urgency)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 ${
            alert.urgency === 'high' ? 'text-red-600' : 
            alert.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`} />
          <div>
            <h4 className="font-semibold capitalize">{alert.type} Cancer Screening</h4>
            <p className="text-sm text-gray-600">
              Last done: {alert.lastDone ? new Date(alert.lastDone).toLocaleDateString() : 'Never'}
            </p>
            <p className="text-sm font-medium">Next due: {alert.nextDue}</p>
            {alert.testType && (
              <p className="text-xs text-gray-500">Test: {alert.testType}</p>
            )}
          </div>
        </div>
        <button 
          onClick={() => onBookNow && onBookNow(alert)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            alert.urgency === 'high' 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// src/components/dashboard/LocalResource.jsx
import React from 'react';
import { MapPin, Clock, Phone, Star } from 'lucide-react';

const LocalResource = ({ resource, onCall, onDirections }) => {
  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{resource.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{resource.type || resource.services?.join(', ')}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resource.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {resource.waitTime}
            </span>
            {resource.rating && (
              <div className="flex items-center gap-1">
                {getRatingStars(resource.rating)}
                <span className="text-xs">({resource.rating})</span>
              </div>
            )}
          </div>
          
          {resource.subsidy && (
            <p className="text-xs text-green-600 font-medium">{resource.subsidy}</p>
          )}
          
          {resource.address && (
            <p className="text-xs text-gray-500 mt-1">{resource.address}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <button 
            onClick={() => onCall && onCall(resource)}
            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            Call
          </button>
          <button 
            onClick={() => onDirections && onDirections(resource)}
            className="border border-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

// src/components/dashboard/PreventionCard.jsx
import React from 'react';
import { Heart, Target, TrendingUp } from 'lucide-react';

const PreventionCard = ({ recommendation, onStartAction }) => {
  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'diet': return '🥗';
      case 'exercise': return '🏃‍♂️';
      case 'smoking': return '🚭';
      case 'stress': return '🧘‍♀️';
      case 'alcohol': return '🍷';
      default: return '❤️';
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-3 bg-white hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getCategoryIcon(recommendation.category)}</span>
          <div>
            <h4 className="font-semibold text-gray-900">{recommendation.category}</h4>
            {recommendation.priority && (
              <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(recommendation.priority)}`}>
                {recommendation.priority} Priority
              </span>
            )}
          </div>
        </div>
        {recommendation.impact && (
          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
            <TrendingUp className="w-4 h-4" />
            {recommendation.impact}
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{recommendation.action}</p>
      
      {recommendation.singaporeTips && (
        <div className="bg-blue-50 p-3 rounded text-xs mb-3">
          <strong className="text-blue-800">Singapore Tips:</strong>
          <ul className="mt-2 ml-4 list-disc text-blue-700">
            {recommendation.singaporeTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
      {recommendation.nextSteps && (
        <div className="bg-gray-50 p-3 rounded text-xs mb-3">
          <strong className="text-gray-800">Next Steps:</strong>
          <ul className="mt-2 ml-4 list-disc text-gray-700">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      
      {recommendation.localProgram && (
        <div className="border-t pt-3 mt-3">
          <h5 className="font-medium text-sm text-gray-800 mb-1">
            {recommendation.localProgram.title}
          </h5>
          <p className="text-xs text-gray-600 mb-2">
            by {recommendation.localProgram.provider}
          </p>
          {recommendation.localProgram.contact && (
            <p className="text-xs text-blue-600">
              Contact: {recommendation.localProgram.contact}
            </p>
          )}
        </div>
      )}
      
      <button 
        onClick={() => onStartAction && onStartAction(recommendation)}
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Start Action Plan
      </button>
    </div>
  );
};

export { RiskScoreDisplay, ScreeningAlert, LocalResource, PreventionCard };