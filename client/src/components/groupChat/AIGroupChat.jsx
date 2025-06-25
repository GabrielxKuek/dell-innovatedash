// client/src/components/groupChat/AIGroupChat.jsx
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Loader } from 'lucide-react';
import { chatFlows } from '../../data/treatmentData';
import TextBubble from '../messages/TextBubble';
import MessageOptions from '../messages/MessageOptions';
import RiskDisplay from './RiskDisplay';
import AIRiskEngine from '../../services/api/AIRiskEngine';
import HealthDataCollector from '../../services/api/HealthDataCollector';

const AIGroupChat = ({ group, onBack }) => {
  // Core state
  const [currentFlow, setCurrentFlow] = useState(1);
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isAIMode, setIsAIMode] = useState(false);
  
  // AI-related state
  const [healthCollector] = useState(() => new HealthDataCollector());
  const [aiEngine] = useState(() => new AIRiskEngine(import.meta.env.VITE_OPENAI_API_KEY));

  // Add this debug line temporarily
  const [currentRisk, setCurrentRisk] = useState(null);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    const firstMessage = chatFlows[group.id]?.[1];
    if (firstMessage) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'received',
        text: firstMessage.message,
        timestamp: 'now'
      };
      
      setMessages([welcomeMessage]);
      setCurrentOptions(firstMessage.options || []);
      healthCollector.addConversationMessage(welcomeMessage);
    }

    // Set up health data change listener
    const handleDataChange = (userData, shouldUpdate) => {
      if (shouldUpdate && isAIMode) {
        calculateRisk();
      }
    };

    healthCollector.onDataChange(handleDataChange);
    
    return () => {
      healthCollector.removeDataChangeListener(handleDataChange);
    };
  }, [group.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate AI risk assessment
  const calculateRisk = async () => {
    setIsCalculatingRisk(true);
    try {
      const conversationContext = healthCollector.getConversationContext();
      const riskAssessment = await aiEngine.calculateRisk(
        healthCollector.userData, 
        conversationContext
      );
      
      setCurrentRisk(riskAssessment);
      healthCollector.resetDataPointsCounter();
      
      // Generate follow-up message if risk is calculated
      if (!riskAssessment.isError && isAIMode) {
        generateAIFollowUp(riskAssessment);
      }
    } catch (error) {
      console.error('Risk calculation failed:', error);
    } finally {
      setIsCalculatingRisk(false);
    }
  };

  // Generate AI follow-up message
  const generateAIFollowUp = async (riskAssessment) => {
    setAiTyping(true);
    try {
      const followUpText = await aiEngine.generateFollowUpMessage(
        riskAssessment, 
        healthCollector.userData
      );
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now(),
          type: 'received',
          text: followUpText,
          timestamp: 'now',
          isAI: true
        };
        
        setMessages(prev => [...prev, aiMessage]);
        healthCollector.addConversationMessage(aiMessage);
        setAiTyping(false);
      }, 1500);
    } catch (error) {
      console.error('AI follow-up generation failed:', error);
      setAiTyping(false);
    }
  };

  // Handle option selection (traditional flow)
  const handleOptionSelect = (option) => {
    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: option.text,
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, userMessage]);
    healthCollector.addConversationMessage(userMessage);
    setCurrentOptions([]);

    // Switch to AI mode if this is a cancer assessment chat
    if (group.id <= 3 && !isAIMode) { // Cancer assessment groups
      setTimeout(() => {
        setIsAIMode(true);
        const aiTransitionMessage = {
          id: Date.now() + 1,
          type: 'received',
          text: "Great! I'll now use AI to give you a personalized risk assessment. The more information you share, the more accurate the assessment becomes. Let's start with some basic questions.",
          timestamp: 'now',
          isAI: true
        };
        setMessages(prev => [...prev, aiTransitionMessage]);
        healthCollector.addConversationMessage(aiTransitionMessage);
        
        // Trigger initial risk calculation
        setTimeout(() => calculateRisk(), 1000);
      }, 800);
      return;
    }

    // Continue with traditional flow
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
        healthCollector.addConversationMessage(botMessage);
        setCurrentOptions(nextMessage.options || []);
        setCurrentFlow(option.nextId);
      }
    }, 1000);
  };

  // Handle suggested question selection from risk display
  const handleSuggestedQuestion = (question) => {
    const aiMessage = {
      id: Date.now(),
      type: 'received',
      text: question,
      timestamp: 'now',
      isAI: true
    };
    
    setMessages(prev => [...prev, aiMessage]);
    healthCollector.addConversationMessage(aiMessage);
  };

  // Handle free text input (for AI mode)
  const handleTextInput = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: text.trim(),
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, userMessage]);
    healthCollector.addConversationMessage(userMessage);
    
    // Generate AI response in AI mode
    if (isAIMode) {
      generateAIResponse(text.trim());
    }
  };

  // Generate AI response to user input
  const generateAIResponse = async (userText) => {
    setAiTyping(true);
    
    try {
      // Check if we have enough data for risk calculation
      const missingInfo = healthCollector.getMissingCriticalInfo();
      let responseText;
      
      if (missingInfo.length > 2) {
        // Ask for more basic information
        const questions = healthCollector.getSuggestedQuestions();
        responseText = questions[Math.floor(Math.random() * questions.length)];
      } else {
        // Generate contextual response
        responseText = await aiEngine.generateFollowUpMessage(
          currentRisk || { keyFactors: [], recommendations: [] }, 
          healthCollector.userData
        );
      }
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now(),
          type: 'received',
          text: responseText,
          timestamp: 'now',
          isAI: true
        };
        
        setMessages(prev => [...prev, aiMessage]);
        healthCollector.addConversationMessage(aiMessage);
        setAiTyping(false);
        
        // Trigger risk calculation if enough data
        if (healthCollector.shouldUpdateRisk()) {
          setTimeout(() => calculateRisk(), 500);
        }
      }, 1200);
      
    } catch (error) {
      console.error('AI response generation failed:', error);
      setAiTyping(false);
      
      // Fallback response
      const fallbackMessage = {
        id: Date.now(),
        type: 'received',
        text: "Thank you for sharing that. Can you tell me more about any symptoms or concerns you might have?",
        timestamp: 'now',
        isAI: true
      };
      setMessages(prev => [...prev, fallbackMessage]);
      healthCollector.addConversationMessage(fallbackMessage);
    }
  };

  return (
    <div 
      className="h-full flex flex-col"
      style={{ 
        backgroundImage: "url('/waBackground.jpg')",
        backgroundSize: 'contain',      // Shows full image, may have empty space
        backgroundPosition: 'center',
        backgroundColor: '#fef7f7'
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-primary to-pink-secondary text-white p-4 shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors bg-white/20"
          >
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
            {isAIMode && (
              <div className="text-xs text-white/80 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                AI-powered assessment
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Display - only show in AI mode or if we have risk data */}
      {(isAIMode || currentRisk) && (
        <RiskDisplay 
          risk={currentRisk}
          isCalculating={isCalculatingRisk}
          healthData={healthCollector.userData}
          onQuestionSelect={handleSuggestedQuestion}
        />
      )}
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {messages.map((message) => (
            <TextBubble
              key={message.id}
              message={message.text}
              type={message.type}
              timestamp={message.timestamp}
              isAI={message.isAI}
            />
          ))}
          
          {/* AI Typing Indicator */}
          {aiTyping && (
            <div className="flex items-center space-x-2 p-3 bg-white/70 rounded-lg mr-16">
              <Loader className="w-4 h-4 animate-spin text-gray-500" />
              <span className="text-sm text-gray-600">AI is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {isAIMode ? (
        <AITextInput onSend={handleTextInput} />
      ) : (
        <MessageOptions 
          options={currentOptions}
          onOptionSelect={handleOptionSelect}
        />
      )}
    </div>
  );
};

// AI Text Input Component
const AITextInput = ({ onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your response..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-primary focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="bg-pink-primary text-white p-3 rounded-full hover:bg-pink-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default AIGroupChat;