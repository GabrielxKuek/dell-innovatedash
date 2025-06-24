// src/pages/DashboardPage.jsx - Updated to be responsive
import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import EnhancedHealthDashboard from '../components/dashboard/EnhancedHealthDashboard';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from local storage or API
    const savedData = localStorage.getItem('healthUserData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  return (
    <ResponsiveLayout title="Health Dashboard">
      <EnhancedHealthDashboard userData={userData} />
    </ResponsiveLayout>
  );
};

export default DashboardPage;