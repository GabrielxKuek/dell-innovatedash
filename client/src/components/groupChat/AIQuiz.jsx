// client/src/components/groupChat/AIQuiz.jsx
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Loader, AlertCircle } from 'lucide-react';
import AIRiskEngine from '../../services/api/AIRiskEngine';
import ConversationTracker from '../../services/api/ConversationTracker';
import TextBubble from '../messages/TextBubble';
import FinalRiskDisplay from './FinalRiskDisplay';

const AIQuiz = ({ group, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [finalRiskAssessment, setFinalRiskAssessment] = useState(null);
  const [isCalculatingFinalRisk, setIsCalculatingFinalRisk] = useState(false);
  
  const [aiEngine] = useState(() => new AIRiskEngine(import.meta.env.VITE_OPENAI_API_KEY));
  const [tracker] = useState(() => new ConversationTracker());
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'received',
      text: "Hello! I'm an AI assistant that will help assess your cancer risk factors. I'll ask you some questions about your health, lifestyle, and family history. This should take about 5-10 minutes. Let's start - what's your name?",
      timestamp: 'now',
      isAI: true
    };
    
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle user input
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isAITyping || isAssessmentComplete) return;

    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: inputText.trim(),
      timestamp: 'now'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Process user message with tracker
    processUserMessage(userMessage);
  };

  // Process user message and generate response
  const processUserMessage = async (userMessage) => {
    setIsAITyping(true);
    
    try {
      // Extract information from user message
      console.log('Processing user message:', userMessage.text);
      const infoExtracted = tracker.extractInfoFromMessage(userMessage.text);
      console.log('Information extracted:', infoExtracted);
      
      // Generate acknowledgment
      const acknowledgment = tracker.generateAcknowledgment(userMessage.text);
      console.log('Generated acknowledgment:', acknowledgment);
      
      // Get next question
      const nextQuestion = tracker.getNextQuestion();
      console.log('Next question:', nextQuestion);
      
      // Check if assessment is complete
      const isComplete = tracker.isAssessmentComplete();
      console.log('Assessment complete?', isComplete);
      
      let responseText;
      if (isComplete) {
        responseText = `${acknowledgment}Perfect! I now have all the information I need for your cancer risk assessment. Let me analyze everything you've shared and calculate your personalized risk profile.`;
        console.log('Assessment complete - will calculate risk');
      } else if (nextQuestion) {
        responseText = `${acknowledgment}${nextQuestion}`;
      } else {
        responseText = `${acknowledgment}Thank you for that information.`;
      }
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'received',
          text: responseText,
          timestamp: 'now',
          isAI: true
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsAITyping(false);
        
        // If assessment is complete, calculate final risk
        if (isComplete) {
          console.log('Setting assessment complete and calculating risk');
          setIsAssessmentComplete(true);
          calculateFinalRisk();
        }
      }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
      
    } catch (error) {
      console.error('Message processing failed:', error);
      setIsAITyping(false);
      
      // Fallback response
      const fallbackMessage = {
        id: Date.now() + 1,
        type: 'received',
        text: "Thank you for that information. Could you tell me a bit more?",
        timestamp: 'now',
        isAI: true
      };
      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  // Calculate final risk assessment
  const calculateFinalRisk = async () => {
    console.log('Starting final risk calculation...');
    setIsCalculatingFinalRisk(true);
    
    try {
      const collectedInfo = tracker.getCollectedInfo();
      console.log('Collected info for risk calculation:', collectedInfo);
      
      const riskAssessment = await aiEngine.calculateFinalRiskFromData(collectedInfo);
      console.log('Risk assessment result:', riskAssessment);
      
      setFinalRiskAssessment(riskAssessment);
    } catch (error) {
      console.error('Final risk calculation failed:', error);
      setFinalRiskAssessment({
        isError: true,
        message: "Unable to calculate risk assessment. Please consult a healthcare professional."
      });
    } finally {
      setIsCalculatingFinalRisk(false);
      console.log('Final risk calculation completed');
    }
  };

  return (
    <div 
      className="h-full flex flex-col"
      style={{ 
        backgroundImage: "url('/waBackground.jpg')",
        backgroundSize: 'cover',
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
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
            🤖
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-base text-white">AI Cancer Risk Assessment</h2>
            <div className="text-xs text-white/80 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              {isAssessmentComplete ? 'Assessment Complete' : 'In Progress...'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
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
          {isAITyping && (
            <div className="flex items-center space-x-2 p-3 bg-white/70 rounded-lg mr-16">
              <Loader className="w-4 h-4 animate-spin text-gray-500" />
              <span className="text-sm text-gray-600">AI is thinking...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Final Risk Assessment */}
      {isAssessmentComplete && (
        <FinalRiskDisplay 
          riskAssessment={finalRiskAssessment}
          isCalculating={isCalculatingFinalRisk}
        />
      )}

      {/* Input Area */}
      {!isAssessmentComplete && (
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your response..."
              disabled={isAITyping}
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-primary focus:border-transparent text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAITyping}
              className="bg-pink-primary text-white p-3 rounded-full hover:bg-pink-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
          
          {/* Progress Indicator */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            Answer questions about your health, lifestyle, and family history
          </div>
        </div>
      )}

      {/* Assessment Complete Message */}
      {isAssessmentComplete && !finalRiskAssessment && !isCalculatingFinalRisk && (
        <div className="bg-green-50 border-t border-green-200 p-4">
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700 font-medium">
              Assessment completed! Your risk analysis is ready.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuiz;