// client/src/pages/IndexPage.jsx
import { useState } from "react"
import Border from '../components/phoneComponents/Border';
import GroupList from '../components/groupChat/GroupList';
import AIGroupChat from '../components/groupChat/AIGroupChat'; // Updated import
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

  // Check if OpenAI API key is configured
  const isAIConfigured = import.meta.env.VITE_OPENAI_API_KEY;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
      <Border>
        {currentView === 'list' ? (
          <div className="h-full flex flex-col">
            {/* AI Status Indicator */}
            {!isAIConfigured && (
              <div className="bg-yellow-50 border-b border-yellow-200 p-2">
                <div className="text-xs text-yellow-700 text-center">
                  ⚠️ AI features disabled - OpenAI API key not configured
                </div>
              </div>
            )}
            
            <GroupList 
              groups={groupsData} 
              onGroupSelect={handleGroupSelect} 
            />
          </div>
        ) : (
          <AIGroupChat 
            group={selectedGroup} 
            onBack={handleBackToList} 
          />
        )}
      </Border>
    </div>
  );
};

export default IndexPage;