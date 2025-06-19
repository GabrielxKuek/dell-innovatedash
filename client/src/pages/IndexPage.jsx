import { useState } from "react"
import Border from '../components/phoneComponents/Border';
import GroupList from '../components/groupChat/GroupList';
import GroupChat from '../components/groupChat/GroupChat';
import { groupsData } from '../data/groupsData';

const IndexPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setCurrentView('chat');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedGroup(null);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        {currentView === 'list' ? (
          <GroupList 
            groups={groupsData} 
            onGroupSelect={handleGroupSelect} 
          />
        ) : (
          <GroupChat 
            group={selectedGroup} 
            onBack={handleBackToList} 
          />
        )}
      </Border>
    </div>
  );
};


export default IndexPage;