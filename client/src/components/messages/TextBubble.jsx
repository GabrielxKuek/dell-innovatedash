const TextBubble = ({ message, type, timestamp }) => {
  const isReceived = type === 'received';
  
  return (
    <div className={`flex ${isReceived ? 'justify-start mr-12' : 'justify-end ml-12'} mb-3`}>
      <div 
        className={`
          max-w-xs px-4 py-3 rounded-2xl shadow-sm
          ${isReceived 
            ? 'bg-white text-pink-primary rounded-tl-md border border-pink-muted' 
            : 'bg-pink-primary text-white rounded-tr-md'
          }
        `}
      >
        <p className="text-sm leading-relaxed font-medium">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isReceived ? 'text-pink-secondary' : 'text-white/70'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextBubble;