// client/src/components/messages/TextBubble.jsx
import React from 'react';
import { Bot, User } from 'lucide-react';

const TextBubble = ({ message, type, timestamp, isAI = false }) => {
  const isReceived = type === 'received';
  
  return (
    <div className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-1`}>
      <div className={`max-w-[80%] ${isReceived ? 'mr-12' : 'ml-12'}`}>
        {/* AI Indicator */}
        {isAI && isReceived && (
          <div className="flex items-center mb-1 ml-2">
            <Bot className="w-3 h-3 text-pink-primary mr-1" />
            <span className="text-xs text-gray-500 font-medium">AI Assistant</span>
          </div>
        )}
        
        <div
          className={`
            relative px-4 py-2 rounded-2xl text-sm leading-relaxed
            ${isReceived 
              ? isAI
                ? 'bg-gradient-to-r from-pink-50 to-rose-50 text-gray-800 border border-pink-200' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-200'
              : 'bg-gradient-to-r from-pink-primary to-pink-secondary text-white shadow-sm'
            }
            ${isReceived ? 'rounded-tl-md' : 'rounded-tr-md'}
          `}
        >
          {/* Message Content */}
          <div className="whitespace-pre-wrap break-words">
            {message}
          </div>
          
          {/* Timestamp */}
          <div className={`
            text-xs mt-1 opacity-70
            ${isReceived ? 'text-gray-500' : 'text-white/80'}
          `}>
            {timestamp}
          </div>
        </div>

        {/* Enhanced AI message features */}
        {isAI && isReceived && (
          <div className="mt-1 ml-2">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Powered by AI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextBubble;