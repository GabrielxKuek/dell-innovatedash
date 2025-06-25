// Additional Components to Support Enhanced Prevention Page

// 1. Risk Calculator Component
// src/components/prevention/RiskCalculator.jsx
import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

export const RiskCalculator = () => {
  const [factors, setFactors] = useState({
    age: 30,
    gender: 'female',
    smoking: false,
    bmi: 23,
    exercise: 3,
    alcohol: 'none',
    familyHistory: false
  });

  const calculateRisk = () => {
    let risk = 10; // Base risk
    if (factors.smoking) risk += 25;
    if (factors.bmi > 25) risk += 15;
    if (factors.exercise < 2) risk += 10;
    if (factors.alcohol === 'heavy') risk += 15;
    if (factors.familyHistory) risk += 20;
    if (factors.age > 40) risk += 10;
    return Math.min(risk, 95);
  };

  const riskScore = calculateRisk();
  const riskLevel = riskScore < 30 ? 'Low' : riskScore < 60 ? 'Moderate' : 'High';
  const riskColor = riskScore < 30 ? 'green' : riskScore < 60 ? 'yellow' : 'red';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Interactive Risk Calculator</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="range"
              min="18"
              max="80"
              value={factors.age}
              onChange={(e) => setFactors({...factors, age: parseInt(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{factors.age} years</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">BMI</label>
            <input
              type="range"
              min="15"
              max="40"
              step="0.1"
              value={factors.bmi}
              onChange={(e) => setFactors({...factors, bmi: parseFloat(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{factors.bmi} kg/m²</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Exercise (days/week)</label>
            <input
              type="range"
              min="0"
              max="7"
              value={factors.exercise}
              onChange={(e) => setFactors({...factors, exercise: parseInt(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{factors.exercise} days</span>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={factors.smoking}
                onChange={(e) => setFactors({...factors, smoking: e.target.checked})}
                className="rounded"
              />
              <span className="text-sm">Current smoker</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={factors.familyHistory}
                onChange={(e) => setFactors({...factors, familyHistory: e.target.checked})}
                className="rounded"
              />
              <span className="text-sm">Family history of cancer</span>
            </label>
          </div>
        </div>
        
        {/* Risk Display */}
        <div className="flex flex-col justify-center">
          <div className={`text-center p-6 rounded-lg bg-${riskColor}-50 border-2 border-${riskColor}-200`}>
            <div className={`text-4xl font-bold text-${riskColor}-600 mb-2`}>
              {riskScore}%
            </div>
            <p className="text-lg font-medium mb-2">Risk Level: {riskLevel}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div 
                className={`bg-${riskColor}-500 h-3 rounded-full transition-all duration-500`}
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Based on modifiable lifestyle factors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Weekly Challenge Component
// src/components/prevention/WeeklyChallenge.jsx
export const WeeklyChallenge = () => {
  const [challenges] = useState([
    {
      id: 1,
      title: "5-a-Day Fruit & Veg Challenge",
      description: "Eat 5 servings of fruits and vegetables daily",
      progress: 4,
      target: 7,
      reward: "50 health points",
      icon: "🥬",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "10,000 Steps Daily",
      description: "Walk 10,000 steps every day this week",
      progress: 5,
      target: 7,
      reward: "100 health points",
      icon: "👟",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Smoke-Free Week",
      description: "Stay tobacco-free for 7 consecutive days",
      progress: 7,
      target: 7,
      reward: "200 health points",
      icon: "🚭",
      difficulty: "Hard"
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-500" />
        This Week's Prevention Challenges
      </h3>
      
      <div className="space-y-4">
        {challenges.map(challenge => (
          <div key={challenge.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{challenge.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.target} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          challenge.progress === challenge.target ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-600">{challenge.reward}</div>
                    {challenge.progress === challenge.target && (
                      <div className="text-xs text-green-600">✅ Complete!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Habit Tracker Component
// src/components/prevention/HabitTracker.jsx
export const HabitTracker = () => {
  const [habits] = useState([
    { name: "Exercise", streak: 12, target: 150, unit: "minutes/week", color: "green" },
    { name: "Healthy Eating", streak: 8, target: 5, unit: "servings/day", color: "blue" },
    { name: "Smoke-Free", streak: 365, target: 1, unit: "days", color: "purple" },
    { name: "Sun Protection", streak: 5, target: 1, unit: "daily", color: "orange" }
  ]);

  const getDaysOfWeek = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Habit Tracker</h3>
      
      <div className="space-y-4">
        {habits.map((habit, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">{habit.name}</h4>
                <p className="text-sm text-gray-600">{habit.streak} day streak</p>
              </div>
              <div className={`text-2xl font-bold text-${habit.color}-600`}>
                🔥
              </div>
            </div>
            
            <div className="flex gap-1">
              {getDaysOfWeek().map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`flex-1 h-8 rounded border-2 flex items-center justify-center text-xs font-medium ${
                    dayIndex < 5 ? `bg-${habit.color}-100 border-${habit.color}-300 text-${habit.color}-700` :
                    `border-gray-200 bg-gray-50 text-gray-400`
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Singapore Health Map Component
// src/components/prevention/HealthMap.jsx
export const HealthMap = () => {
  const facilities = [
    { 
      name: "Tampines Polyclinic", 
      type: "Polyclinic", 
      distance: "1.2 km", 
      services: ["Mammography", "Pap Smear", "FIT Test"],
      rating: 4.5,
      waitTime: "15-30 min"
    },
    { 
      name: "Singapore Cancer Society", 
      type: "Support Center", 
      distance: "3.5 km", 
      services: ["Support Groups", "Education", "Counseling"],
      rating: 4.8,
      waitTime: "By appointment"
    },
    { 
      name: "ActiveSG Tampines Hub", 
      type: "Fitness Center", 
      distance: "0.8 km", 
      services: ["Gym", "Pool", "Classes"],
      rating: 4.3,
      waitTime: "Walk-in"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Nearby Health Facilities</h3>
      
      {/* Simple Map Placeholder */}
      <div className="bg-blue-50 rounded-lg h-48 mb-4 flex items-center justify-center border-2 border-dashed border-blue-200">
        <div className="text-center text-blue-600">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Interactive Map View</p>
          <p className="text-xs text-gray-500">Singapore Health Facilities Near You</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {facilities.map((facility, index) => (
          <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{facility.name}</h4>
                <p className="text-sm text-gray-600">{facility.type} • {facility.distance}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium">{facility.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{facility.waitTime}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {facility.services.map((service, serviceIndex) => (
                <span 
                  key={serviceIndex}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Prevention Tips Carousel
// src/components/prevention/TipsCarousel.jsx
export const TipsCarousel = () => {
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    {
      title: "Hawker Center Smart Choices",
      content: "Choose steamed fish over fried, ask for less oil and salt, opt for brown rice.",
      category: "Nutrition",
      icon: "🍜",
      color: "green"
    },
    {
      title: "Exercise in Singapore Heat",
      content: "Best times: 6-8am or after 6pm. Use park connectors and stay hydrated.",
      category: "Fitness",
      icon: "🏃‍♀️",
      color: "blue"
    },
    {
      title: "Sun Protection Tips",
      content: "SPF 30+ always, seek shade 10am-3pm, wear protective clothing outdoors.",
      category: "Skin Health",
      icon: "☀️",
      color: "orange"
    },
    {
      title: "Stress Management",
      content: "Practice mindfulness, use nature parks for relaxation, maintain work-life balance.",
      category: "Mental Health",
      icon: "🧘‍♀️",
      color: "purple"
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const tip = tips[currentTip];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Daily Prevention Tips</h3>
      
      <div className={`bg-${tip.color}-50 rounded-lg p-4 border-l-4 border-${tip.color}-500`}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">{tip.icon}</span>
          <div>
            <h4 className="font-medium mb-1">{tip.title}</h4>
            <span className={`text-xs bg-${tip.color}-100 text-${tip.color}-700 px-2 py-1 rounded`}>
              {tip.category}
            </span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{tip.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTip ? `bg-${tip.color}-500` : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button onClick={prevTip} className="p-1 rounded border hover:bg-gray-50">
              ←
            </button>
            <button onClick={nextTip} className="p-1 rounded border hover:bg-gray-50">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage in PreventionPage:
// Import these components and add them to appropriate tabs:
// 
// import { RiskCalculator, WeeklyChallenge, HabitTracker, HealthMap, TipsCarousel } from '../components/prevention';
//
// Then add to tab content:
// - RiskCalculator in Assessment tab
// - WeeklyChallenge and HabitTracker in Lifestyle tab  
// - HealthMap in Resources tab
// - TipsCarousel in Overview or Education tab