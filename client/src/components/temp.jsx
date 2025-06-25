import React, { useState, useEffect } from 'react';
import { 
  Heart, BarChart3, Users, Calendar, Settings, 
  Wifi, Battery, Volume2, Grid3X3, ChevronRight,
  Phone, MessageCircle, Activity, Brain, X, Minimize2,
  Maximize2, TrendingUp, AlertTriangle, Shield,
  MapPin, Info, Clock, CheckCircle, Filter, Search,
  Star, Plus, ExternalLink
} from 'lucide-react';

// Mock components for the pages (you would import your actual components)
const AnalyticsPageContent = ({ onClose }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('2018-2022');
  const [selectedDemographic, setSelectedDemographic] = useState('all');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('overview');

  const keyMetrics = [
    {
      title: "Total Cancer Cases (2018-2022)",
      value: "46,483",
      change: 3.2,
      icon: Users,
      color: "blue",
      trend: "Average 9,297 cases per year"
    },
    {
      title: "Cancer Incidence Rate",
      value: "244.5",
      suffix: " per 100K",
      change: 1.8,
      icon: TrendingUp,
      color: "purple",
      trend: "Age-standardized rate"
    },
    {
      title: "5-Year Survival Rate",
      value: "61.2",
      suffix: "%",
      change: 2.5,
      icon: Heart,
      color: "green",
      trend: "Improving outcomes"
    },
    {
      title: "Screening Coverage",
      value: "46.1",
      suffix: "%",
      change: -1.2,
      icon: Shield,
      color: "orange",
      trend: "Below target rates"
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6">
        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Singapore Health Analytics</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value="2018-2022">2018-2022</option>
                <option value="2013-2017">2013-2017</option>
              </select>
              
              <select 
                value={selectedDemographic}
                onChange={(e) => setSelectedDemographic(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value="all">All Demographics</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}<span className="text-sm text-gray-600">{metric.suffix}</span>
                </div>
                <div className="text-sm text-gray-600">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 h-64">
            <h3 className="font-semibold mb-4">Cancer Incidence by Type</h3>
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4 h-64">
            <h3 className="font-semibold mb-4">Screening Compliance</h3>
            <div className="space-y-3">
              {['Cervical (25-74)', 'Breast (40-69)', 'Colorectal (50-74)'].map((type, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{type}</span>
                    <span>{45 + i * 3}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${45 + i * 3}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h3>
          <p className="text-xs text-gray-600">
            Singapore Cancer Registry • MOH Singapore • Health Promotion Board
          </p>
        </div>
      </div>
    </div>
  );
};

const PreventionPageContent = ({ onClose }) => {
  const mockRecommendations = {
    immediate: [
      {
        category: "Overdue Screening",
        action: "Schedule cervical cancer screening (Pap test)",
        impact: "Could prevent 95% of cervical cancers with regular screening",
        nextSteps: ["Call clinic to book appointment", "Prepare for 15-minute procedure"]
      }
    ],
    shortTerm: [
      {
        category: "Lifestyle Improvement",
        action: "Increase physical activity to 150 minutes per week",
        impact: "Reduces cancer risk by 20-30%",
        singaporeTips: ["Join ActiveSG programs", "Use Singapore park connectors", "Try tai chi at community centers"]
      }
    ]
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold">Your Prevention Plan</h2>
        </div>

        {/* Immediate Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Immediate Actions
          </h3>
          {mockRecommendations.immediate.map((rec, index) => (
            <div key={index} className="border-l-4 border-red-500 bg-red-50 p-3 rounded">
              <h4 className="font-medium text-red-800">{rec.category}</h4>
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

        {/* Short-term Goals */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Short-term Goals</h3>
          {mockRecommendations.shortTerm.map((rec, index) => (
            <div key={index} className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded">
              <h4 className="font-medium text-yellow-800">{rec.category}</h4>
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

        {/* Emergency Contacts */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="font-semibold text-red-800 mb-3">Emergency Contacts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span><strong>Emergency:</strong> 995</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span><strong>Health Hotline:</strong> 1800-567-2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SchedulerPageContent = ({ onClose }) => {
  const userScreenings = [
    {
      type: 'breast',
      name: 'Breast Cancer Screening',
      lastDate: '2023-06-15',
      nextDue: '2025-06-15',
      status: 'up-to-date'
    },
    {
      type: 'cervical',
      name: 'Cervical Cancer Screening',
      lastDate: '2022-03-10',
      nextDue: '2024-12-10',
      status: 'overdue'
    },
    {
      type: 'colorectal',
      name: 'Colorectal Cancer Screening',
      lastDate: null,
      nextDue: 'Schedule now',
      status: 'never'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'up-to-date': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'never': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'up-to-date': return CheckCircle;
      case 'overdue': return AlertTriangle;
      case 'never': return Info;
      default: return Info;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Screening Scheduler</h2>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-bold mb-2">Your Screening Status</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">1</div>
              <div className="text-sm text-blue-100">Up to Date</div>
            </div>
            <div>
              <div className="text-xl font-bold">2</div>
              <div className="text-sm text-blue-100">Action Needed</div>
            </div>
            <div>
              <div className="text-xl font-bold">4</div>
              <div className="text-sm text-blue-100">Available</div>
            </div>
          </div>
        </div>

        {/* Screening Status */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Your Screenings
          </h3>
          <div className="space-y-3">
            {userScreenings.map((screening, index) => {
              const StatusIcon = getStatusIcon(screening.status);
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getStatusColor(screening.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{screening.name}</h4>
                      <p className="text-xs text-gray-600">
                        {screening.lastDate 
                          ? `Last: ${new Date(screening.lastDate).toLocaleDateString('en-SG')}`
                          : 'Never done'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(screening.status)}`}>
                      {screening.status.replace('-', ' ').toUpperCase()}
                    </span>
                    {(screening.status === 'overdue' || screening.status === 'never') && (
                      <button className="block mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Healthcare Providers */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            Nearby Providers
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Singapore General Hospital', type: 'Public', rating: 4.8, distance: '2.3 km' },
              { name: 'Raffles Medical Group', type: 'Private', rating: 4.6, distance: '1.8 km' }
            ].map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="font-medium text-sm">{provider.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {provider.type}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {provider.rating}
                    </span>
                    <span>{provider.distance}</span>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityPageContent = ({ onClose }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold">Community Hub</h2>
        </div>

        {/* Community Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Community Health Network</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">12,847</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Health Goal Success</div>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div className="space-y-3">
          {[
            { title: 'Health Challenges', desc: 'Join community wellness challenges', icon: Activity },
            { title: 'Support Groups', desc: 'Connect with others on similar health journeys', icon: Heart },
            { title: 'Local Events', desc: 'Health fairs and screening events near you', icon: Calendar },
            { title: 'Expert Q&A', desc: 'Ask questions to healthcare professionals', icon: MessageCircle }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Recent Community Activity</h3>
          <div className="space-y-3">
            {[
              { user: 'Sarah L.', action: 'completed mammography screening', time: '2 hours ago' },
              { user: 'Community Group', action: 'shared nutrition tips for cancer prevention', time: '5 hours ago' },
              { user: 'Dr. Tan', action: 'answered questions about colorectal screening', time: '1 day ago' }
            ].map((activity, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{activity.user}</span>
                <span className="text-gray-600"> {activity.action}</span>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPageContent = ({ onClose }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Health Dashboard</h2>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Your Health Score</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">87</div>
            <div className="text-sm text-gray-600 mb-4">Out of 100</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'BMI', value: '22.4', status: 'normal', color: 'green' },
            { label: 'Blood Pressure', value: '120/80', status: 'normal', color: 'green' },
            { label: 'Cholesterol', value: '195', status: 'good', color: 'green' },
            { label: 'Last Screening', value: '6 months', status: 'due soon', color: 'yellow' }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-3">
              <div className="text-sm text-gray-600">{metric.label}</div>
              <div className="text-lg font-bold">{metric.value}</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 bg-${metric.color}-100 text-${metric.color}-800`}>
                {metric.status}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Recent Health Activity</h3>
          <div className="space-y-3">
            {[
              { activity: 'Completed breast cancer screening', date: '2024-06-15', result: 'Normal' },
              { activity: 'Health check-up appointment', date: '2024-05-10', result: 'Good' },
              { activity: 'Blood test results', date: '2024-04-22', result: 'Normal' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-sm">{item.activity}</div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {item.result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Health Recommendations</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Schedule your next mammography screening</li>
            <li>• Consider increasing physical activity to 150 min/week</li>
            <li>• Book annual health check-up appointment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const SettingsPageContent = ({ onClose }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Profile Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" defaultValue="Sarah Chen" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" defaultValue="sarah.chen@email.com" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" defaultValue="+65 9123 4567" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Notifications</h3>
          <div className="space-y-3">
            {[
              'Screening reminders',
              'Health tips and updates',
              'Community activity',
              'Emergency alerts'
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{setting}</span>
                <button className="w-10 h-6 bg-blue-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Privacy & Data</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
              Download my health data
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
              Manage data sharing permissions
            </button>
            <button className="w-full text-left text-sm text-red-600 hover:text-red-800">
              Delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Popup Window Component
const PopupWindow = ({ app, onClose, children }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const windowStyle = isMaximized 
    ? { top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }
    : { 
        top: position.y,
        left: position.x,
        width: '800px',
        height: '600px'
      };

  return (
    <div
      className="fixed bg-white rounded-lg shadow-2xl border border-gray-300 flex flex-col z-50"
      style={windowStyle}
    >
      {/* Window Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {React.createElement(app.icon, { className: "w-4 h-4 text-gray-700" })}
            <span className="font-medium text-gray-900 text-sm">{app.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 text-white" />
            ) : (
              <Maximize2 className="w-2 h-2 text-white" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <X className="w-2 h-2 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const ResponsiveOSInterface = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const featuredApps = [
    {
      id: 'ai-quiz',
      name: 'AI Health Quiz',
      icon: Brain,
      color: 'bg-pink-200',
      route: '/ai-quiz',
      description: 'Personalized health assessment'
    },
    {
      id: 'quick-quiz',
      name: 'Quick Health Check',
      icon: Activity,
      color: 'bg-rose-200',
      route: '/quick-quiz',
      description: 'Fast health screening'
    }
  ];

  const regularApps = [
    {
      id: 'dashboard',
      name: 'Health Dashboard',
      icon: BarChart3,
      color: 'bg-pink-200',
      route: '/dashboard',
      description: 'Your health metrics and trends',
      component: DashboardPageContent
    },
    {
      id: 'prevention',
      name: 'Prevention Plan',
      icon: Heart,
      color: 'bg-rose-200',
      route: '/prevention',
      description: 'Personalized prevention strategies',
      component: PreventionPageContent
    },
    {
      id: 'community',
      name: 'Community Hub',
      icon: Users,
      color: 'bg-pink-300',
      route: '/community',
      description: 'Connect with health community',
      component: CommunityPageContent
    },
    {
      id: 'analytics',
      name: 'Health Analytics',
      icon: BarChart3,
      color: 'bg-rose-300',
      route: '/analytics',
      description: 'Population health insights',
      component: AnalyticsPageContent
    },
    {
      id: 'scheduler',
      name: 'Screening Scheduler',
      icon: Calendar,
      color: 'bg-pink-200',
      route: '/scheduler',
      description: 'Manage your screening appointments',
      component: SchedulerPageContent
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      color: 'bg-gray-300',
      route: '/settings',
      description: 'App preferences and account',
      component: SettingsPageContent
    }
  ];

  const handleAppClick = (app, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('App clicked:', app.name, 'Route:', app.route);

    // For mobile, just alert (you can implement mobile navigation here)
    if (isMobile) {
      alert(`Opening ${app.name} - This would navigate to ${app.route} on mobile`);
      return;
    }

    // For desktop, open popup window
    if (app.component) {
      // Check if window is already open
      const existingWindow = openWindows.find(w => w.id === app.id);
      if (existingWindow) {
        // Bring to front by removing and re-adding
        setOpenWindows(prev => [
          ...prev.filter(w => w.id !== app.id),
          existingWindow
        ]);
        return;
      }

      // Open new window
      const newWindow = {
        id: app.id,
        app: app,
        component: app.component
      };
      setOpenWindows(prev => [...prev, newWindow]);
    } else {
      // Handle featured apps or apps without components
      alert(`Opening ${app.name} - Component not yet implemented`);
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
  };

  // Desktop Interface with popup windows
  const DesktopInterface = () => (
    <div className="min-h-screen w-full bg-pink-50 relative overflow-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f472b6' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="px-4 py-8 min-h-[calc(100vh-2rem)]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Singapore Health OS
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Comprehensive Health Management Platform
            </p>
          </div>

          {/* Featured Apps Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-pink-500" />
              Featured Health Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    className="group bg-white rounded-2xl p-6 hover:bg-pink-50 transition-all duration-300 cursor-pointer border border-pink-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {app.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {app.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600 text-sm font-medium">Click to start</span>
                          <ChevronRight className="w-4 h-4 text-pink-600 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Apps Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Grid3X3 className="w-6 h-6 text-pink-500" />
              All Applications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {regularApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onClick={(e) => handleAppClick(app, e)}
                    className="group text-center cursor-pointer"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${app.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-all duration-300 shadow-sm`}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                    </div>
                    <h3 className="text-gray-800 font-medium text-xs md:text-sm mb-1 leading-tight">
                      {app.name}
                    </h3>
                    <p className="text-gray-600 text-xs hidden md:block leading-tight">
                      {app.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Render open popup windows */}
      {openWindows.map((window) => {
        const WindowComponent = window.component;
        return (
          <PopupWindow
            key={window.id}
            app={window.app}
            onClose={() => closeWindow(window.id)}
          >
            <WindowComponent onClose={() => closeWindow(window.id)} />
          </PopupWindow>
        );
      })}
    </div>
  );

  // Mobile Interface (unchanged from original)
  const MobileInterface = () => (
    <div className="min-h-screen w-full bg-pink-50 relative overflow-x-hidden">
      {/* Mobile Status Bar */}
      <div className="h-12 bg-white border-b border-pink-200 flex items-center justify-between px-4 text-gray-800 text-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
          </div>
          <span className="font-medium">Health OS</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span className="font-mono text-sm">
            {currentTime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-6 pb-24 min-h-[calc(100vh-3rem)]">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Health OS</h1>
          <p className="text-gray-600">Your health companion</p>
        </div>

        {/* Featured Apps - Mobile */}
        <div className="mb-8">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Featured</h2>
          <div className="space-y-4">
            {featuredApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className="bg-white rounded-2xl p-4 active:scale-95 transition-transform cursor-pointer border border-pink-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-800 font-medium truncate">{app.name}</h3>
                      <p className="text-gray-600 text-sm truncate">{app.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* App Grid - Mobile */}
        <div>
          <h2 className="text-gray-800 text-lg font-semibold mb-4">All Apps</h2>
          <div className="grid grid-cols-3 gap-4">
            {regularApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className="text-center active:scale-95 transition-transform cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center mb-2 mx-auto shadow-sm`}>
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-gray-800 text-xs font-medium leading-tight">{app.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Dock - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-pink-200">
        <div className="flex items-center justify-center h-full px-8">
          <div className="flex items-center gap-6">
            {featuredApps.slice(0, 2).map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={(e) => handleAppClick(app, e)}
                  className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer`}
                >
                  <Icon className="w-7 h-7 text-gray-700" />
                </div>
              );
            })}
            <div
              onClick={(e) => handleAppClick(regularApps[0], e)}
              className="w-14 h-14 rounded-2xl bg-pink-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <BarChart3 className="w-7 h-7 text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileInterface /> : <DesktopInterface />;
};

export default ResponsiveOSInterface;