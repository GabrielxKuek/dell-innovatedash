import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { chatFlows } from '../../data/treatmentData';
import TextBubble from '../messages/TextBubble';
import MessageOptions from '../messages/MessageOptions';

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
      }
    }, 1000);
  };

  return (
    <div 
      className="h-full flex flex-col"
      style={{ 
        backgroundImage: "url('/waBackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#fef7f7' // Fallback pink background
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            <img 
              src={group.avatar} 
              alt={group.name}
              className="w-full h-full object-cover rounded-full"
            />
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

      {/* Message Options (Keyboard Area) */}
      <MessageOptions 
        options={currentOptions}
        onOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

export default GroupChat;