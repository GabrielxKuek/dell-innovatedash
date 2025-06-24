// src/pages/CommunityPage.jsx - Updated to be responsive
import React from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import CommunityHealthFeatures from '../components/community/CommunityHealthFeatures';

const CommunityPage = () => {
  return (
    <ResponsiveLayout title="Community Hub">
      <CommunityHealthFeatures />
    </ResponsiveLayout>
  );
};

export default CommunityPage;