import React from 'react';
import GroupItem from './GroupItem';

const GroupList = ({ groups, onGroupSelect }) => {
  return (
    <div className="h-full flex flex-col bg-pink-accent">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">Cancer Estimation</div>
          <img 
            src="/scsLogo.png" 
            alt="Singapore Cancer Society" 
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>
      
      {/* Groups List */}
      <div className="flex-1 overflow-y-auto p-2">
        {groups.map(group => (
          <GroupItem 
            key={group.id} 
            group={group} 
            onSelect={onGroupSelect} 
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;