import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { chatFlows } from '../../data/treatmentData';
import TextBubble from '../messages/TextBubble';

const GroupChat = ({ group, onBack }) => {
  const [currentFlow, setCurrentFlow] = useState(1);
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);

  useEffect(() => {
    // Initialize with first message
    const firstMessage = chatFlows[group.id]?.[1];
    if (firstMessage) {
      setMessages([{
        id: Date.now(),
        type: 'received',
        text: firstMessage.message,
        timestamp: 'now'
      }]);
      setCurrentOptions(firstMessage.options || []);
    }
  }, [group.id]);

  const handleOptionSelect = (option) => {
    // Add user's choice to messages
    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: option.text,
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentOptions([]); // Clear options while waiting for response

    // Add bot response after a delay
    setTimeout(() => {
      const nextMessage = chatFlows[group.id]?.[option.nextId];
      if (nextMessage) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'received',
          text: nextMessage.message,
          timestamp: 'now'
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentOptions(nextMessage.options || []);
        setCurrentFlow(option.nextId);
      } else {
        // If no next message found, provide a fallback to continue conversation
        handleConversationEnd();
      }
    }, 1000);
  };

  const handleConversationEnd = () => {
    // Create a fallback message to keep the conversation going
    const fallbackMessage = {
      id: Date.now() + 1,
      type: 'received',
      text: "Is there anything else you would like to know?",
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, fallbackMessage]);
    
    // Automatically provide the starting options again
    const firstMessage = chatFlows[group.id]?.[1];
    if (firstMessage && firstMessage.options) {
      // Add an option to end the conversation along with the original options
      const optionsWithEnd = [
        ...firstMessage.options,
        {
          text: "No, I'm all set",
          nextId: "end",
          description: "End the conversation"
        }
      ];
      setCurrentOptions(optionsWithEnd);
    } else {
      // Fallback if no starting options found
      const fallbackOptions = [
        {
          text: "Start over",
          nextId: 1,
          description: "Begin from the start"
        },
        {
          text: "No, I'm all set",
          nextId: "end",
          description: "End the conversation"
        }
      ];
      setCurrentOptions(fallbackOptions);
    }
  };

  const handleFallbackOption = (option) => {
    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: option.text,
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentOptions([]);

    setTimeout(() => {
      if (option.nextId === "end") {
        // Final goodbye message
        const goodbyeMessage = {
          id: Date.now() + 1,
          type: 'received',
          text: "Thank you for chatting! Feel free to come back anytime if you have more questions.",
          timestamp: 'now'
        };
        
        setMessages(prev => [...prev, goodbyeMessage]);
        setCurrentOptions([]); // No more options - conversation truly ends
      }
    }, 1000);
  };

  // Enhanced option select handler that handles both regular flow and fallback options
  const enhancedHandleOptionSelect = (option) => {
    // Check if this is a regular chat flow option
    const isRegularFlow = chatFlows[group.id]?.[option.nextId];
    
    if (isRegularFlow || option.nextId === 1) {
      // Handle regular chat flow or restart from beginning
      handleOptionSelect(option);
    } else if (option.nextId === "end") {
      // Handle explicit end
      handleFallbackOption(option);
    } else {
      // If nextId doesn't exist in flows, treat as conversation end
      handleConversationEnd();
    }
  };

  return (
    <div 
      className="h-full flex flex-col"
      style={{ 
        backgroundImage: "url('/waBackground.jpg')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor: '#fef7f7' // Fallback pink background
      }}
    >
      {/* Header - Using CSS variables for pink colors */}
      <div className="text-white p-4 shadow-lg" style={{ background: 'linear-gradient(to right, var(--color-pink-primary), var(--color-pink-secondary))' }}>
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20 text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', border: 'none' }}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            <span className="text-lg">{group.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-base text-white">{group.name}</h2>
            <div className="flex items-center text-xs text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse border border-white"></div>
                <span>online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {messages.map((message) => (
            <TextBubble
              key={message.id}
              message={message.text}
              type={message.type}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>

      {/* Message Options - Using proper pink styling */}
      <PinkMessageOptions 
        options={currentOptions}
        onOptionSelect={enhancedHandleOptionSelect}
      />
    </div>
  );
};

// Properly styled message options component
const PinkMessageOptions = ({ options, onOptionSelect }) => {
  if (!options || options.length === 0) {
    return (
      <div className="bg-white p-4" style={{ borderTop: '1px solid var(--color-pink-muted)' }}>
        <div className="text-center text-gray-500 text-sm">
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4" style={{ borderTop: '1px solid var(--color-pink-muted)' }}>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(option)}
            className="w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm"
            style={{ 
              backgroundColor: 'var(--color-pink-accent)',
              border: '1px solid var(--color-pink-muted)',
              color: '#1f2937'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--color-pink-muted)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-pink-accent)';
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium flex-1">{option.text}</span>
              <svg className="w-4 h-4 ml-2 flex-shrink-0" style={{ color: 'var(--color-pink-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {option.description && (
              <div className="text-xs text-gray-600 mt-1">
                {option.description}
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Option count indicator */}
      {options.length > 3 && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">
            {options.length} options available
          </span>
        </div>
      )}
    </div>
  );
};

export default GroupChat;