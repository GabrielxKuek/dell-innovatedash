// client/src/components/groupChat/GroupItem.jsx
const GroupItem = ({ group, onSelect }) => {
  return (
    <div 
      className={`rounded-lg p-3 m-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] border ${
        group.isAIQuiz 
          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100'
          : 'bg-white border-pink-muted'
      }`}
      onClick={() => onSelect(group)}
    >
      <div className="flex items-center">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden shadow-sm ring-1 ${
          group.isAIQuiz 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-purple-300 text-2xl'
            : 'bg-gradient-to-br from-pink-primary to-pink-secondary ring-pink-muted'
        }`}>
          <span className="text-lg">{group.avatar}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate text-sm ${
            group.isAIQuiz ? 'text-purple-900' : 'text-gray-900'
          }`}>
            {group.name}
            {group.isAIQuiz && (
              <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                AI
              </span>
            )}
          </h3>
          <p className={`text-xs truncate mt-0.5 ${
            group.isAIQuiz ? 'text-purple-600' : 'text-gray-600'
          }`}>
            {group.lastMessage}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className={group.isAIQuiz ? 'ml-2 text-purple-500' : 'ml-2 text-pink-primary'}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;