import React, { useState, useEffect } from 'react';
import { 
  Users, Globe, TrendingUp, AlertCircle, 
  MapPin, Calendar, BarChart3, PieChart,
  Filter, Download, Maximize2
} from 'lucide-react';

// Mock Chart Components since they're imported but not defined
const ComparisonBarChart = ({ data, title, height, categories, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6" style={{ height }}>
    <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {item.name || item.region || item.type || item.country}
          </span>
          <div className="flex gap-4">
            {categories.map((category) => (
              <div key={category.key} className="text-right">
                <div className="text-sm text-gray-500">{category.name}</div>
                <div className="font-semibold" style={{ color: category.color }}>
                  {formatter ? formatter(item[category.key]) : item[category.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HeatMapChart = ({ data, title, height, colorScale }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6" style={{ height: height + 100 }}>
    <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
    <div className="text-center text-gray-500 py-8">
      Heat map visualization would render here
    </div>
  </div>
);

const ProgressChart = ({ data, title, height }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
    <div className="space-y-4">
      {data.map((item, index) => {
        const progressPercent = (item.current / item.target) * 100;
        const isOnTarget = progressPercent >= 80;
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{item.metric}</span>
              <span className="text-sm text-gray-500">
                {item.current.toLocaleString()} / {item.target.toLocaleString()} {item.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  isOnTarget ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{progressPercent.toFixed(1)}% of target</span>
              <span className={`font-medium ${
                isOnTarget ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {isOnTarget ? 'On Track' : 'Needs Attention'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const PopulationInsights = ({ timeRange = "2024", demographic = "all" }) => {
  const [selectedView, setSelectedView] = useState('demographics');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Singapore demographic data
  const demographicBreakdown = {
    ethnicity: [
      { name: 'Chinese', population: 2780000, percentage: 74.3, incidenceRate: 244.5 },
      { name: 'Malay', population: 508000, percentage: 13.6, incidenceRate: 251.6 },
      { name: 'Indian', population: 348000, percentage: 9.3, incidenceRate: 200.4 },
      { name: 'Others', population: 105000, percentage: 2.8, incidenceRate: 189.2 }
    ],
    ageGroups: [
      { range: '0-14', population: 620000, percentage: 16.6, risk: 'Very Low' },
      { range: '15-39', population: 1380000, percentage: 37.0, risk: 'Low' },
      { range: '40-64', population: 1290000, percentage: 34.6, risk: 'Moderate' },
      { range: '65+', population: 441000, percentage: 11.8, risk: 'High' }
    ],
    gender: [
      { type: 'Male', population: 1860000, percentage: 49.8, cancerRate: 267.3 },
      { type: 'Female', population: 1870000, percentage: 50.2, cancerRate: 222.8 }
    ]
  };

  // Geographic health data (by regions)
  const regionalData = [
    { region: 'Central', population: 980000, screeningRate: 52.1, incidenceRate: 240.2 },
    { region: 'North', population: 870000, screeningRate: 48.7, incidenceRate: 248.9 },
    { region: 'Northeast', population: 980000, screeningRate: 50.3, incidenceRate: 245.1 },
    { region: 'East', population: 950000, screeningRate: 49.8, incidenceRate: 243.7 },
    { region: 'West', population: 950000, screeningRate: 46.2, incidenceRate: 251.3 }
  ];

  // Health system capacity data - FIXED: Better structured data
  const healthSystemData = [
    { metric: 'Hospital Beds', current: 12500, target: 14000, unit: 'beds', priority: 'high' },
    { metric: 'Oncologists', current: 89, target: 120, unit: 'specialists', priority: 'critical' },
    { metric: 'Screening Centers', current: 156, target: 200, unit: 'centers', priority: 'medium' },
    { metric: 'Cancer Centers', current: 6, target: 8, unit: 'centers', priority: 'high' }
  ];

  // Risk factor prevalence - FIXED: Added better data structure
  const riskFactorData = [
    { factor: 'Smoking', prevalence: 10.1, trend: -0.8, risk: 'High', category: 'Behavioral' },
    { factor: 'Obesity (BMI ≥30)', prevalence: 8.6, trend: 0.3, risk: 'High', category: 'Dietary' },
    { factor: 'Physical Inactivity', prevalence: 36.8, trend: -1.2, risk: 'Medium', category: 'Lifestyle' },
    { factor: 'Alcohol (Excessive)', prevalence: 4.8, trend: -0.2, risk: 'Medium', category: 'Behavioral' },
    { factor: 'Diet (Low Fiber)', prevalence: 67.2, trend: -2.1, risk: 'Medium', category: 'Dietary' }
  ];

  // Comparative international data
  const internationalComparison = [
    { country: 'Singapore', incidenceRate: 244.5, mortalityRate: 81.2, survivalRate: 61.2 },
    { country: 'Japan', incidenceRate: 329.7, mortalityRate: 84.7, survivalRate: 64.1 },
    { country: 'South Korea', incidenceRate: 225.4, mortalityRate: 76.8, survivalRate: 67.3 },
    { country: 'Australia', incidenceRate: 323.0, mortalityRate: 78.4, survivalRate: 68.8 },
    { country: 'United States', incidenceRate: 318.6, mortalityRate: 85.0, survivalRate: 65.4 }
  ];

  // Generate heat map data for age x ethnicity cancer risk
  const generateHeatMapData = () => {
    const ethnicities = ['Chinese', 'Malay', 'Indian', 'Others'];
    const ageGroups = ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'];
    
    return ageGroups.map(age => 
      ethnicities.map(ethnicity => ({
        value: Math.floor(Math.random() * 100) + 1,
        label: `${ethnicity} ${age}`,
        display: Math.floor(Math.random() * 100) + 1
      }))
    );
  };

  const renderDemographicsView = () => (
    <div className="space-y-6">
      {/* Ethnicity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonBarChart
          data={demographicBreakdown.ethnicity}
          title="Cancer Incidence by Ethnicity (per 100K)"
          height={300}
          categories={[
            { key: 'incidenceRate', name: 'Incidence Rate', color: '#3b82f6' }
          ]}
          formatter={(value) => `${value} per 100K`}
        />
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Population Distribution</h3>
          <div className="space-y-4">
            {demographicBreakdown.ethnicity.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  ></div>
                  <span className="font-medium text-gray-700">{group.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {(group.population / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-500">{group.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age and Gender Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Cancer Risk by Age Group</h3>
          <div className="space-y-3">
            {demographicBreakdown.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">{group.range} years</span>
                  <div className="text-sm text-gray-500">
                    {(group.population / 1000000).toFixed(1)}M people ({group.percentage}%)
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  group.risk === 'Very Low' ? 'bg-green-100 text-green-800' :
                  group.risk === 'Low' ? 'bg-blue-100 text-blue-800' :
                  group.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {group.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        <ComparisonBarChart
          data={demographicBreakdown.gender}
          title="Cancer Incidence by Gender (per 100K)"
          height={300}
          categories={[
            { key: 'cancerRate', name: 'Cancer Rate', color: '#8b5cf6' }
          ]}
          formatter={(value) => `${value} per 100K`}
        />
      </div>
    </div>
  );

  const renderGeographicView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonBarChart
          data={regionalData}
          title="Screening Rates by Region"
          height={300}
          categories={[
            { key: 'screeningRate', name: 'Screening Rate (%)', color: '#10b981' }
          ]}
          formatter={(value) => `${value}%`}
        />

        <ComparisonBarChart
          data={regionalData}
          title="Cancer Incidence by Region (per 100K)"
          height={300}
          categories={[
            { key: 'incidenceRate', name: 'Incidence Rate', color: '#f59e0b' }
          ]}
          formatter={(value) => `${value} per 100K`}
        />
      </div>

      {/* Heat Map */}
      <HeatMapChart
        data={generateHeatMapData()}
        title="Cancer Risk Heat Map: Age Groups vs Ethnicity"
        height={200}
        colorScale={(value) => `hsl(${120 - value * 1.2}, 70%, ${70 - value * 0.3}%)`}
      />
    </div>
  );

  // FIXED: Improved health system view with better layout and components
  const renderHealthSystemView = () => (
    <div className="space-y-6">
      {/* Health System Capacity Progress */}
      <ProgressChart
        data={healthSystemData}
        title="Health System Capacity vs Targets"
        height={300}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors Card - FIXED: Better layout and visual hierarchy */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Risk Factor Prevalence</h3>
          <div className="space-y-4">
            {riskFactorData.map((factor, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{factor.factor}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                        {factor.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        factor.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {factor.risk} Risk
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{factor.prevalence}%</div>
                    <div className={`text-sm flex items-center gap-1 justify-end ${
                      factor.trend > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${factor.trend < 0 ? 'rotate-180' : ''}`} />
                      {Math.abs(factor.trend)}% YoY
                    </div>
                  </div>
                </div>
                
                {/* Progress bar for prevalence */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      factor.risk === 'High' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}
                    style={{ width: `${Math.min(factor.prevalence, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Comparison */}
        <ComparisonBarChart
          data={internationalComparison}
          title="Singapore vs International Comparison"
          height={300}
          categories={[
            { key: 'incidenceRate', name: 'Incidence', color: '#3b82f6' },
            { key: 'mortalityRate', name: 'Mortality', color: '#ef4444' },
            { key: 'survivalRate', name: 'Survival', color: '#10b981' }
          ]}
          formatter={(value) => `${value}`}
        />
      </div>

      {/* FIXED: Added Health System Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Health System Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">89%</div>
            <div className="text-sm text-blue-700">Screening Program Coverage</div>
            <div className="text-xs text-blue-600 mt-1">Target: 95%</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-900">12.3</div>
            <div className="text-sm text-green-700">Days to Treatment</div>
            <div className="text-xs text-green-600 mt-1">Target: ≤14 days</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-900">94%</div>
            <div className="text-sm text-orange-700">Treatment Completion</div>
            <div className="text-xs text-orange-600 mt-1">Target: 90%</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-900">78%</div>
            <div className="text-sm text-purple-700">Follow-up Compliance</div>
            <div className="text-xs text-purple-600 mt-1">Target: 85%</div>
          </div>
        </div>
      </div>
    </div>
  );

  const getViewTitle = () => {
    switch(selectedView) {
      case 'demographics': return 'Demographic Analysis';
      case 'geographic': return 'Geographic Distribution';
      case 'health-system': return 'Health System Capacity';
      default: return 'Population Insights';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${isFullscreen ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{getViewTitle()}</h2>
              <p className="text-sm text-gray-600">
                Comprehensive population health insights for {timeRange}
                {demographic !== 'all' && ` • ${demographic} demographic`}
              </p>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex items-center gap-2 mt-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'demographics', label: 'Demographics', icon: Users },
              { id: 'geographic', label: 'Geographic', icon: MapPin },
              { id: 'health-system', label: 'Health System', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Total Population</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">5.92M</div>
            <div className="text-xs text-blue-600">Singapore residents</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Cancer Survival</span>
            </div>
            <div className="text-2xl font-bold text-green-900">61.2%</div>
            <div className="text-xs text-green-600">5-year survival rate</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">High Risk</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">441K</div>
            <div className="text-xs text-orange-600">People aged 65+</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Annual Cases</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">9,297</div>
            <div className="text-xs text-purple-600">Average per year</div>
          </div>
        </div>

        {/* Dynamic Content Based on Selected View */}
        {selectedView === 'demographics' && renderDemographicsView()}
        {selectedView === 'geographic' && renderGeographicView()}
        {selectedView === 'health-system' && renderHealthSystemView()}
      </div>

      {/* Insights Summary */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Population Health Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Ethnic Disparities:</span>
                <span className="text-gray-600"> Malay residents show highest cancer incidence rates (251.6 per 100K)</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Aging Population:</span>
                <span className="text-gray-600"> 61.5% of cancer cases occur in people aged 60+ years</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Regional Variation:</span>
                <span className="text-gray-600"> Western region shows lowest screening participation (46.2%)</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Gender Gap:</span>
                <span className="text-gray-600"> Male cancer rates 20% higher than females (267.3 vs 222.8)</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Modifiable Risks:</span>
                <span className="text-gray-600"> 67% have suboptimal diet, 37% are physically inactive</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-gray-700">Healthcare Capacity:</span>
                <span className="text-gray-600"> Need 26% more oncologists to meet growing demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationInsights;