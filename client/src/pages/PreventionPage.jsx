import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, MapPin, Phone, TrendingUp, Target, Award, 
  AlertTriangle, CheckCircle, Clock, Users, Book, Activity,
  Scale, Utensils, Dumbbell, Cigarette, Wine, Sun, Shield,
  ArrowRight, Star, Flame, Trophy, Zap, Brain
} from 'lucide-react';

const ResponsiveLayout = ({ children, title }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 py-6">
      {children}
    </div>
  </div>
);

const PreventionPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [riskFactors, setRiskFactors] = useState({
    smoking: false,
    bmi: 23.5,
    alcohol: 'occasional',
    exercise: 3,
    diet: 'mixed',
    familyHistory: false,
    age: 32,
    gender: 'female'
  });
  const [streakData, setStreakData] = useState({
    exerciseStreak: 12,
    healthyEatingStreak: 8,
    smokeFreeStreak: 365,
    screeningCompliance: 85
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'assessment', label: 'Risk Assessment', icon: Target },
    { id: 'lifestyle', label: 'Lifestyle Plan', icon: Activity },
    { id: 'screening', label: 'Screening Schedule', icon: Calendar },
    { id: 'education', label: 'Learn More', icon: Book },
    { id: 'resources', label: 'Local Resources', icon: MapPin }
  ];

  // Calculate overall risk score based on factors
  const calculateRiskScore = () => {
    let score = 20; // Base score
    if (riskFactors.smoking) score += 30;
    if (riskFactors.bmi > 25) score += 15;
    if (riskFactors.bmi > 30) score += 25;
    if (riskFactors.alcohol === 'heavy') score += 20;
    if (riskFactors.exercise < 3) score += 15;
    if (riskFactors.familyHistory) score += 25;
    if (riskFactors.age > 40) score += 10;
    if (riskFactors.age > 50) score += 20;
    
    return Math.min(score, 100);
  };

  const riskScore = calculateRiskScore();
  const riskLevel = riskScore < 30 ? 'Low' : riskScore < 60 ? 'Moderate' : 'High';
  const riskColor = riskScore < 30 ? 'green' : riskScore < 60 ? 'yellow' : 'red';

  // Button styles for consistency
  const buttonStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors",
    outline: "border-2 border-gray-300 hover:border-gray-400 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors bg-white"
  };

  // Overview Tab Content
  const OverviewContent = () => {
    // Mock data for demonstration
    const riskScore = 25;
    const riskLevel = "Low";
    const streakData = {
      exerciseStreak: 12,
      healthyEatingStreak: 8,
      smokeFreeStreak: 365,
      screeningCompliance: 85
    };

    const buttonStyles = {
      primary: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
      secondary: "bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
      outline: "border border-green-600 text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors"
    };

    return (
      <div className="space-y-6">
        {/* Hero Risk Display */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cancer Prevention Score</h2>
              <p className="text-blue-100">Based on Singapore health guidelines</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{100 - riskScore}%</div>
              <p className="text-sm text-blue-100">Prevention Level</p>
            </div>
          </div>
          
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${100 - riskScore}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-white">
            <span>Risk Level: <strong>{riskLevel}</strong></span>
            <span>🇸🇬 Singapore Standards</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
            <Flame className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">{streakData.exerciseStreak}</div>
            <p className="text-sm text-green-700">Day Exercise Streak</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
            <Utensils className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{streakData.healthyEatingStreak}</div>
            <p className="text-sm text-blue-700">Days Healthy Eating</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">{streakData.smokeFreeStreak}</div>
            <p className="text-sm text-purple-700">Days Smoke-Free</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
            <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-800">{streakData.screeningCompliance}%</div>
            <p className="text-sm text-orange-700">Screening Compliance</p>
          </div>
        </div>

        {/* Top Priority Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
            <Target className="w-5 h-5 text-red-500" />
            Priority Actions This Week
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Schedule Mammography</p>
                <p className="text-sm text-red-700">Overdue by 3 months - Book at polyclinic (subsidized)</p>
              </div>
              <button className={buttonStyles.primary}>Book Now</button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <Scale className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900">BMI Optimization</p>
                <p className="text-sm text-yellow-700">Current: 23.5 | Target: 18.5-23 | Join ActiveSG programs</p>
              </div>
              <button className={buttonStyles.secondary}>Learn More</button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <Dumbbell className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Exercise Consistency</p>
                <p className="text-sm text-green-700">Maintain 150 min/week - Use park connectors nearby</p>
              </div>
              <button className={buttonStyles.outline}>Track Progress</button>
            </div>
          </div>
        </div>

        {/* Singapore Cancer Statistics */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Why Prevention Matters in Singapore</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">30-50%</div>
              <p className="text-sm text-gray-700">Cancers are preventable through lifestyle changes</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">16,303</div>
              <p className="text-sm text-gray-700">New cancer cases annually in Singapore men</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">97.5%</div>
              <p className="text-sm text-gray-700">Survival rate for early-detected skin cancer</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Risk Assessment Tab Content
  const AssessmentContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Personalized Risk Factors</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Modifiable Risk Factors */}
          <div>
            <h4 className="font-medium mb-3 text-green-700">✅ Modifiable Factors</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-900">Smoking Status</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${riskFactors.smoking ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {riskFactors.smoking ? 'Current Smoker' : 'Non-Smoker'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-900">BMI</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${riskFactors.bmi > 25 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {riskFactors.bmi} kg/m²
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-900">Alcohol Consumption</span>
                </div>
                <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800 capitalize font-medium">
                  {riskFactors.alcohol}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-900">Exercise (days/week)</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${riskFactors.exercise < 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {riskFactors.exercise} days
                </span>
              </div>
            </div>
          </div>

          {/* Non-Modifiable Risk Factors */}
          <div>
            <h4 className="font-medium mb-3 text-gray-700">📋 Non-Modifiable Factors</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-gray-900">Age</span>
                <span className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-800 font-medium">
                  {riskFactors.age} years
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-gray-900">Gender</span>
                <span className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-800 capitalize font-medium">
                  {riskFactors.gender}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-gray-900">Family History</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${riskFactors.familyHistory ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  {riskFactors.familyHistory ? 'Positive' : 'Negative'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Reduction Potential */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Risk Reduction Potential</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <div>
              <p className="font-medium text-gray-900">Quit Smoking</p>
              <p className="text-sm text-gray-800">Singapore's #1 preventable cancer risk factor</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">-30%</div>
              <p className="text-sm text-gray-800">Risk Reduction</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div>
              <p className="font-medium text-gray-900">Maintain Healthy Weight</p>
              <p className="text-sm text-gray-800">BMI 18.5-23 (Asian guidelines)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">-20%</div>
              <p className="text-sm text-gray-800">Risk Reduction</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
            <div>
              <p className="font-medium text-gray-900">Regular Exercise</p>
              <p className="text-sm text-gray-800">150 min/week moderate activity</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">-15%</div>
              <p className="text-sm text-gray-800">Risk Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Lifestyle Plan Tab Content
  const LifestyleContent = () => (
    <div className="space-y-6">
      {/* Weekly Goals */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <Target className="w-5 h-5 text-blue-500" />
          This Week's Goals
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Exercise Goal</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-800">150 minutes this week</span>
                <span className="text-green-800 font-medium">67%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
            <p className="text-sm text-green-800">100 minutes completed • 50 minutes remaining</p>
          </div>
          
          <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Nutrition Goal</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-800">5 servings fruits/veg daily</span>
                <span className="text-blue-800 font-medium">80%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            <p className="text-sm text-blue-800">4 servings today • 1 more to go</p>
          </div>
        </div>
      </div>

      {/* Singapore-Specific Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Singapore Health Recommendations</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
            <h4 className="font-medium text-orange-900 mb-2">🍜 Hawker Center Choices</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Choose steamed over fried options</li>
              <li>• Request "less oil, less salt" when ordering</li>
              <li>• Opt for brown rice instead of white rice</li>
              <li>• Look for Healthier Choice Symbol</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <h4 className="font-medium text-green-900 mb-2">🏃‍♀️ Local Exercise Options</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Use park connectors for walking/cycling</li>
              <li>• Join ActiveSG sports programs</li>
              <li>• Exercise early morning (6-8am) to avoid heat</li>
              <li>• Utilize community center facilities</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <h4 className="font-medium text-blue-900 mb-2">☀️ Sun Protection</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• UV index often high - use SPF 30+ sunscreen</li>
              <li>• Seek shade during 10am-3pm peak hours</li>
              <li>• Wear protective clothing outdoors</li>
              <li>• Regular skin checks for moles/changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Prevention Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-yellow-900">100 Day Streak</p>
            <p className="text-xs text-yellow-800">Exercise Consistency</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Smoke Free</p>
            <p className="text-xs text-green-800">1 Year Achievement</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">Screening Hero</p>
            <p className="text-xs text-blue-800">Up-to-date on all tests</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-300 opacity-75">
            <Star className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Weight Goal</p>
            <p className="text-xs text-gray-600">2 kg to unlock</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Screening Schedule Tab Content
  const ScreeningContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Personalized Screening Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-red-50 border-red-200">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div className="flex-1">
              <h4 className="font-medium text-red-900">Mammography (Breast Cancer)</h4>
              <p className="text-sm text-red-800">Last: March 2023 • Next due: March 2024 (Overdue)</p>
              <p className="text-sm text-red-700">ScreenIt-Breast program available at polyclinics</p>
            </div>
            <button className={buttonStyles.primary}>Book Now</button>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
            <Clock className="w-6 h-6 text-yellow-600" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-900">Pap Smear (Cervical Cancer)</h4>
              <p className="text-sm text-yellow-800">Last: June 2023 • Next due: June 2026</p>
              <p className="text-sm text-yellow-700">Due in 18 months - set reminder</p>
            </div>
            <button className={buttonStyles.outline}>Set Reminder</button>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg bg-green-50 border-green-200">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div className="flex-1">
              <h4 className="font-medium text-green-900">FIT Test (Colorectal Cancer)</h4>
              <p className="text-sm text-green-800">Last: November 2024 • Next due: November 2025</p>
              <p className="text-sm text-green-700">Up to date - excellent compliance!</p>
            </div>
            <button className={buttonStyles.outline}>Track Results</button>
          </div>
        </div>
      </div>

      {/* Screening Statistics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Singapore Screening Rates</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg border">
            <div className="text-xl font-bold text-gray-900 mb-1">45.4%</div>
            <p className="text-sm text-gray-800 mb-2">Cervical Cancer Screening</p>
            <p className="text-xs text-blue-700">Target: 70% • Help us improve!</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border">
            <div className="text-xl font-bold text-gray-900 mb-1">52.3%</div>
            <p className="text-sm text-gray-800 mb-2">Breast Cancer Screening</p>
            <p className="text-xs text-blue-700">Target: 65% • You're contributing!</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border">
            <div className="text-xl font-bold text-gray-900 mb-1">41.7%</div>
            <p className="text-sm text-gray-800 mb-2">Colorectal Screening</p>
            <p className="text-xs text-blue-700">Target: 60% • Great example!</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Education Tab Content
  const EducationContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Interactive Learning Modules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <Brain className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-medium mb-2 text-gray-900">Understanding Cancer Risk</h4>
            <p className="text-sm text-gray-700 mb-3">Learn how genetics and lifestyle interact to influence cancer risk</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">15 min read</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <Utensils className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-medium mb-2 text-gray-900">Nutrition & Cancer Prevention</h4>
            <p className="text-sm text-gray-700 mb-3">Singapore dietary guidelines for cancer prevention</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">20 min read</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <Sun className="w-8 h-8 text-orange-600 mb-3" />
            <h4 className="font-medium mb-2 text-gray-900">Skin Cancer in Tropical Singapore</h4>
            <p className="text-sm text-gray-700 mb-3">UV protection strategies for year-round sun exposure</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">10 min read</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-medium mb-2 text-gray-900">Family Health History</h4>
            <p className="text-sm text-gray-700 mb-3">How to map and understand genetic cancer risk factors</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">12 min read</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Prevention Facts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">30-50%</strong> of cancers are preventable through lifestyle modifications</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">Early detection</strong> increases survival rates by up to 90% for some cancers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">Regular exercise</strong> reduces cancer risk by 20-30%</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">Tobacco use</strong> is linked to 30% of cancer deaths worldwide</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">Healthy diet</strong> can reduce cancer risk by 10-20%</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-800"><strong className="text-gray-900">Sun protection</strong> prevents 90% of skin cancers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Resources Tab Content  
  const ResourcesContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          Nearby Health Facilities
        </h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Tampines Polyclinic</h4>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">1.2 km</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Comprehensive screening services • Subsidized rates</p>
            <div className="flex gap-2 text-xs">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Mammography</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Pap Smear</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">FIT Test</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Singapore Cancer Society</h4>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">3.5 km</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Support services • Educational programs • Patient assistance</p>
            <div className="flex gap-2 text-xs">
              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">Support Groups</span>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Education</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">ActiveSG Tampines Hub</h4>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">0.8 km</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Fitness facilities • Swimming pool • Sports programs</p>
            <div className="flex gap-2 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Gym</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Pool</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Classes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-red-500" />
          Important Contacts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
            <div>
              <p className="font-medium">Emergency Services</p>
              <p className="text-sm text-gray-600">Medical emergencies</p>
            </div>
            <a href="tel:995" className="text-red-600 font-bold text-xl">995</a>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
            <div>
              <p className="font-medium">Health Hotline</p>
              <p className="text-sm text-gray-600">General health inquiries</p>
            </div>
            <a href="tel:1800-567-2020" className="text-blue-600 font-medium">1800-567-2020</a>
          </div>
          <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border">
            <div>
              <p className="font-medium">Cancer Helpline</p>
              <p className="text-sm text-gray-600">Singapore Cancer Society</p>
            </div>
            <a href="tel:6225-5655" className="text-pink-600 font-medium">6225-5655</a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'assessment': return <AssessmentContent />;
      case 'lifestyle': return <LifestyleContent />;
      case 'screening': return <ScreeningContent />;
      case 'education': return <EducationContent />;
      case 'resources': return <ResourcesContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <ResponsiveLayout title="Prevention Plan">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        {/* <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default PreventionPage;