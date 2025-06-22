// src/pages/AnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Border from '../components/phoneComponents/Border';
import HealthcareAnalyticsDashboard from '../components/analytics/HealthcareAnalyticsDashboard';
import Navigation from '../components/shared/Navigation';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { ArrowLeft, Download, Share, Settings } from 'lucide-react';
import { AnalyticsService } from '../services/api/AnalyticsService';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const analyticsService = new AnalyticsService();

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, selectedRegion]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const [metrics, trends, distribution, regional, insights] = await Promise.all([
        analyticsService.getPopulationHealthMetrics(timeRange, selectedRegion),
        analyticsService.getRiskTrendData(timeRange),
        analyticsService.getCancerTypeDistribution(),
        analyticsService.getRegionalData(),
        analyticsService.generateAIInsights()
      ]);

      setAnalyticsData({
        metrics,
        trends,
        distribution,
        regional,
        insights
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format = 'csv') => {
    try {
      await analyticsService.exportAnalyticsData(format, timeRange);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center">
        <Border>
          <LoadingSpinner message="Loading analytics dashboard..." />
        </Border>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b">
            <div className="flex items-center">
              <button 
                onClick={handleBack}
                className="mr-3 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">Analytics</h1>
                <p className="text-xs text-gray-600">Population health insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleExport('csv')}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Export Data"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Share"
              >
                <Share className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Analytics Content */}
          <div className="flex-1 overflow-auto">
            <HealthcareAnalyticsDashboard 
              data={analyticsData}
              timeRange={timeRange}
              selectedRegion={selectedRegion}
              onTimeRangeChange={setTimeRange}
              onRegionChange={setSelectedRegion}
            />
          </div>
          
          {/* Navigation */}
          <Navigation currentPage="analytics" />
        </div>
      </Border>
    </div>
  );
};