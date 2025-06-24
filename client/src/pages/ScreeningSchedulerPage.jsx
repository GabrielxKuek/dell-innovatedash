// src/pages/ScreeningSchedulerPage.jsx - Complete Screening Scheduler
import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import { 
  Calendar, Clock, MapPin, Phone, Star, Plus,
  CheckCircle, AlertCircle, Info, ExternalLink,
  Filter, Search, ChevronRight, Heart, Shield
} from 'lucide-react';

const ScreeningSchedulerPage = () => {
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [userAge] = useState(45); // Mock user age
  const [userGender] = useState('female'); // Mock user gender

  // Mock user's screening history
  const [userScreenings, setUserScreenings] = useState([
    {
      type: 'breast',
      name: 'Breast Cancer Screening',
      lastDate: '2023-06-15',
      nextDue: '2025-06-15',
      status: 'up-to-date',
      location: 'Singapore General Hospital'
    },
    {
      type: 'cervical',
      name: 'Cervical Cancer Screening',
      lastDate: '2022-03-10',
      nextDue: '2024-12-10',
      status: 'overdue',
      location: 'Raffles Medical'
    },
    {
      type: 'colorectal',
      name: 'Colorectal Cancer Screening',
      lastDate: null,
      nextDue: 'Schedule now',
      status: 'never',
      location: null
    }
  ]);

  // Available screening types with Singapore-specific info
  const availableScreenings = [
    {
      id: 'breast',
      name: 'Breast Cancer Screening',
      description: 'Mammography for women aged 40-69',
      frequency: 'Every 2 years',
      ageRange: '40-69 years',
      gender: 'female',
      testType: 'Mammogram',
      duration: '20 minutes',
      preparation: 'Avoid deodorant/powder on screening day',
      cost: 'Subsidized: $50-80 | Private: $200-300',
      eligible: userAge >= 40 && userAge <= 69 && userGender === 'female'
    },
    {
      id: 'cervical',
      name: 'Cervical Cancer Screening',
      description: 'Pap test or HPV test for women aged 25-74',
      frequency: 'Pap: Every 3 years | HPV: Every 5 years',
      ageRange: '25-74 years',
      gender: 'female',
      testType: 'Pap Smear / HPV Test',
      duration: '15 minutes',
      preparation: 'Avoid intercourse 48 hours before test',
      cost: 'Subsidized: $20-40 | Private: $80-150',
      eligible: userAge >= 25 && userAge <= 74 && userGender === 'female'
    },
    {
      id: 'colorectal',
      name: 'Colorectal Cancer Screening',
      description: 'FIT test or colonoscopy for adults aged 50+',
      frequency: 'FIT: Annual | Colonoscopy: Every 10 years',
      ageRange: '50+ years',
      gender: 'both',
      testType: 'FIT Test / Colonoscopy',
      duration: 'FIT: 5 minutes | Colonoscopy: 2 hours',
      preparation: 'FIT: None | Colonoscopy: Bowel preparation required',
      cost: 'FIT Free for eligible | Colonoscopy: $800-2000',
      eligible: userAge >= 50
    },
    {
      id: 'prostate',
      name: 'Prostate Cancer Screening',
      description: 'PSA test for men aged 50+ (or 45+ if high risk)',
      frequency: 'Every 1-2 years (after discussion with doctor)',
      ageRange: '50+ years (45+ if high risk)',
      gender: 'male',
      testType: 'PSA Blood Test',
      duration: '10 minutes',
      preparation: 'No special preparation needed',
      cost: 'Subsidized: $30-60 | Private: $80-120',
      eligible: userAge >= 50 && userGender === 'male'
    }
  ];

  // Singapore healthcare providers
  const healthcareProviders = [
    {
      id: 1,
      name: 'Singapore General Hospital',
      type: 'Public Hospital',
      rating: 4.8,
      address: 'Outram Road, Singapore 169608',
      phone: '+65 6222 3322',
      distance: '2.3 km',
      screenings: ['breast', 'cervical', 'colorectal', 'prostate'],
      waitTime: '2-3 weeks',
      subsidized: true
    },
    {
      id: 2,
      name: 'Raffles Medical Group',
      type: 'Private Clinic',
      rating: 4.6,
      address: '585 North Bridge Road, Singapore 188770',
      phone: '+65 6311 1111',
      distance: '1.8 km',
      screenings: ['breast', 'cervical', 'colorectal', 'prostate'],
      waitTime: '1-2 weeks',
      subsidized: false
    },
    {
      id: 3,
      name: 'Tan Tock Seng Hospital',
      type: 'Public Hospital',
      rating: 4.7,
      address: '11 Jalan Tan Tock Seng, Singapore 308433',
      phone: '+65 6256 6011',
      distance: '4.1 km',
      screenings: ['breast', 'cervical', 'colorectal', 'prostate'],
      waitTime: '2-4 weeks',
      subsidized: true
    },
    {
      id: 4,
      name: 'Mount Elizabeth Hospital',
      type: 'Private Hospital',
      rating: 4.9,
      address: '3 Mount Elizabeth, Singapore 228510',
      phone: '+65 6737 2666',
      distance: '3.2 km',
      screenings: ['breast', 'cervical', 'colorectal', 'prostate'],
      waitTime: '1 week',
      subsidized: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'up-to-date': return 'text-green-600 bg-green-100';
      case 'due-soon': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'never': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'up-to-date': return CheckCircle;
      case 'due-soon': return Clock;
      case 'overdue': return AlertCircle;
      case 'never': return Info;
      default: return Info;
    }
  };

  const bookAppointment = (screening, provider) => {
    alert(`Booking ${screening.name} at ${provider.name}\n\nIn a real app, this would open the booking system or call ${provider.phone}`);
  };

  const renderScheduleTab = () => (
    <div className="space-y-6">
      {/* Your Current Screenings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Your Screening Status
        </h2>
        <div className="space-y-4">
          {userScreenings.map((screening, index) => {
            const StatusIcon = getStatusIcon(screening.status);
            return (
              <div key={index} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getStatusColor(screening.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{screening.name}</h3>
                      <p className="text-sm text-gray-600">
                        {screening.lastDate 
                          ? `Last: ${new Date(screening.lastDate).toLocaleDateString('en-SG')}`
                          : 'Never done'
                        }
                      </p>
                      <p className="text-sm font-medium">
                        Next due: {screening.nextDue}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(screening.status)}`}>
                      {screening.status.replace('-', ' ').toUpperCase()}
                    </span>
                    {(screening.status === 'overdue' || screening.status === 'never') && (
                      <button
                        onClick={() => setSelectedScreening(screening.type)}
                        className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Screenings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-green-600" />
          Available Screenings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableScreenings.filter(s => s.eligible).map((screening) => (
            <div key={screening.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{screening.name}</h3>
                  <p className="text-sm text-gray-600">{screening.description}</p>
                </div>
                <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Test:</strong> {screening.testType}</div>
                <div><strong>Frequency:</strong> {screening.frequency}</div>
                <div><strong>Duration:</strong> {screening.duration}</div>
                <div><strong>Cost:</strong> {screening.cost}</div>
              </div>
              
              <button
                onClick={() => setSelectedScreening(screening.id)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Screening
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProvidersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Healthcare Providers</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All Types</option>
            <option>Public Hospitals</option>
            <option>Private Clinics</option>
            <option>Polyclinics</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {healthcareProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {provider.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {provider.distance}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {provider.waitTime}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {provider.address}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {provider.phone}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {provider.screenings.map((screening) => (
                  <span key={screening} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {screening}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                >
                  Call
                </button>
                <button
                  onClick={() => bookAppointment(selectedScreening || availableScreenings[0], provider)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducationTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Screening Education</h2>
      
      <div className="grid gap-6">
        {availableScreenings.filter(s => s.eligible).map((screening) => (
          <div key={screening.id} className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{screening.name}</h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">About the Test</h4>
                <ul className="space-y-1 text-gray-600">
                  <li><strong>Type:</strong> {screening.testType}</li>
                  <li><strong>Duration:</strong> {screening.duration}</li>
                  <li><strong>Age Range:</strong> {screening.ageRange}</li>
                  <li><strong>Frequency:</strong> {screening.frequency}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Preparation</h4>
                <p className="text-gray-600 mb-3">{screening.preparation}</p>
                
                <h4 className="font-medium text-gray-900 mb-2">Cost Information</h4>
                <p className="text-gray-600">{screening.cost}</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Why is this important?</h4>
              <p className="text-blue-800 text-sm">
                Early detection through regular screening can significantly improve treatment outcomes and survival rates.
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* External Resources */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="space-y-3">
          <a
            href="https://www.moh.gov.sg/resources-statistics/educational-resources/screening"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            MOH Screening Guidelines
          </a>
          <a
            href="https://www.singaporecancersociety.org.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Singapore Cancer Society
          </a>
          <a
            href="https://www.hpb.gov.sg/healthy-living/disease-and-conditions/cancer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Health Promotion Board - Cancer Prevention
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout title="Screening Scheduler" showBackButton={true}>
      <div className="space-y-6">
        {/* Header with Quick Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Your Health Screening Hub</h1>
          <p className="text-blue-100 mb-4">
            Stay on top of your cancer screening schedule with personalized reminders and easy booking.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userScreenings.filter(s => s.status === 'up-to-date').length}</div>
              <div className="text-sm text-blue-100">Up to Date</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userScreenings.filter(s => s.status === 'overdue' || s.status === 'never').length}</div>
              <div className="text-sm text-blue-100">Action Needed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{availableScreenings.filter(s => s.eligible).length}</div>
              <div className="text-sm text-blue-100">Available</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'schedule', label: 'My Schedule', icon: Calendar },
              { id: 'providers', label: 'Find Providers', icon: MapPin },
              { id: 'education', label: 'Learn More', icon: Info }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTab(id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === 'schedule' && renderScheduleTab()}
        {selectedTab === 'providers' && renderProvidersTab()}
        {selectedTab === 'education' && renderEducationTab()}
      </div>
    </ResponsiveLayout>
  );
};

export default ScreeningSchedulerPage;