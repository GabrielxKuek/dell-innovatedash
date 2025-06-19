const GroupItem = ({ group, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-lg p-3 m-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] border border-pink-muted"
      onClick={() => onSelect(group)}
    >
      <div className="flex items-center">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-pink-primary to-pink-secondary rounded-full flex items-center justify-center mr-3 overflow-hidden shadow-sm ring-1 ring-pink-muted">
          <img 
            src={group.avatar} 
            alt={group.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate text-sm">
            {group.name}
          </h3>
          <p className="text-xs text-gray-600 truncate mt-0.5">
            {group.lastMessage}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="ml-2 text-pink-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;