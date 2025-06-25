// src/components/AITextAdventure.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Send, Loader, AlertCircle, X, Brain, Heart, Activity, Home } from 'lucide-react';

// Text Bubble Component
const TextBubble = ({ message, type, isAI = false, timestamp }) => {
  const isReceived = type === 'received';
  
  return (
    <div className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-[85%] ${isReceived ? 'mr-12' : 'ml-12'}`}>
        {isAI && (
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-pink-500" />
            <span className="text-xs text-gray-500 font-medium">Adventure Guide</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isReceived
              ? 'bg-white border border-pink-200 text-gray-800'
              : 'bg-pink-500 text-white'
          } shadow-sm`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{message}</div>
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-400 mt-1 ${isReceived ? 'text-left' : 'text-right'}`}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

// OpenAI API Service
class OpenAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async sendMessage(messages) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API call failed:', error);
      throw error;
    }
  }

  async generateSummary(userResponses) {
    const summaryPrompt = `Based on this text adventure conversation about cancer risk assessment, provide a personalized summary and risk analysis:

User responses: ${userResponses.join(' | ')}

Please provide:
1. A brief personalized risk assessment
2. Key factors identified from their responses
3. General recommendations (not medical advice)
4. Encouragement to consult healthcare professionals for proper screening

Keep it supportive and informative, not alarming.`;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: summaryPrompt }],
          max_tokens: 400,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation failed:', error);
      throw error;
    }
  }
}

// Main Component
const AITextAdventure = ({ onClose, onSkip }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showSkipOption, setShowSkipOption] = useState(false);
  
  const messagesEndRef = useRef(null);
  const openAIService = useRef(null);
  const inputRef = useRef(null); // Changed to reference the DOM element

  // Show skip option after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipOption(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const showFallbackAdventure = useCallback(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'received',
      text: "🌟 Welcome, brave health explorer! \n\nI'm your AI Adventure Guide, ready to take you on an exciting journey of health discovery! Unfortunately, I'm having trouble connecting to my full adventure systems right now.\n\nWould you like to skip this adventure and go straight to exploring the Screen-Play health platform?",
      timestamp: 'now',
      isAI: true
    };
    setMessages([welcomeMessage]);
    setShowSkipOption(true);
  }, []);

  const getInitialMessage = useCallback(async () => {
    if (!openAIService.current) return;
    
    setIsAITyping(true);
    try {
      const initialPrompt = [
        {
          role: 'system',
          content: `You are to mimic a text adventure game. Ask questions to help the user discover their cancer risk factors. You should ask exactly 3 questions total, one at a time.

Start with an engaging introduction that feels like the beginning of an adventure, then ask your first question about their health journey.`
        },
        {
          role: 'user',
          content: 'Start the adventure!'
        }
      ];
      
      const response = await openAIService.current.sendMessage(initialPrompt);
      
      const aiMessage = {
        id: Date.now(),
        type: 'received',
        text: response,
        timestamp: 'now',
        isAI: true
      };
      
      setMessages([aiMessage]);
      setConversationHistory(prev => [...prev, 
        { role: 'user', content: 'Start the adventure!' },
        { role: 'assistant', content: response }
      ]);
      
    } catch (error) {
      console.error('Failed to get initial message:', error);
      const errorMessage = {
        id: Date.now(),
        type: 'received',
        text: "🌟 Welcome, brave explorer! I'm having trouble connecting to my adventure guide systems, but let's start your health journey anyway! \n\nTell me, what brings you on this quest to learn about your health?",
        timestamp: 'now',
        isAI: true
      };
      setMessages([errorMessage]);
    } finally {
      setIsAITyping(false);
    }
  }, []);

  // Initialize OpenAI service
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      openAIService.current = new OpenAIService(apiKey);
      
      // Initialize conversation with system prompt
      const systemMessage = {
        role: 'system',
        content: `You are to mimic a text adventure game. Ask questions to help the user discover their cancer risk factors. You should ask exactly 3 questions total, one at a time.

Guidelines:
- Make it feel like an adventure/story, not a medical questionnaire
- Ask about lifestyle, family history, or health habits in creative ways
- Keep responses engaging and story-like
- After each user response, acknowledge their answer and ask the next question
- Count the questions and stop after exactly 3 questions
- Make the experience feel like exploring a health journey

Start with an engaging introduction and your first question.`
      };
      
      setConversationHistory([systemMessage]);
      
      // Get initial message from AI
      getInitialMessage();
    } else {
      // No API key - show fallback
      showFallbackAdventure();
    }
  }, [getInitialMessage, showFallbackAdventure]);

  const getNextQuestion = useCallback(async (history, currentQuestionCount) => {
    if (!openAIService.current) return;
    
    setIsAITyping(true);
    try {
      const questionsRemaining = 3 - currentQuestionCount;
      const nextQuestionPrompt = [
        ...history,
        {
          role: 'user',
          content: `Continue the adventure. Ask question ${currentQuestionCount + 1} of 3. You have ${questionsRemaining - 1} questions remaining after this one. Keep it engaging and story-like.`
        }
      ];
      
      const response = await openAIService.current.sendMessage(nextQuestionPrompt);
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now(),
          type: 'received',
          text: response,
          timestamp: 'now',
          isAI: true
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setConversationHistory(prev => [...prev, { role: 'assistant', content: response }]);
        setIsAITyping(false);
      }, 1000);
      
    } catch (error) {
      console.error('Failed to get next question:', error);
      setTimeout(() => {
        const fallbackMessage = {
          id: Date.now(),
          type: 'received',
          text: `The adventure continues! Tell me more about your daily habits and lifestyle choices that might affect your health journey.`,
          timestamp: 'now',
          isAI: true
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setIsAITyping(false);
      }, 1000);
    }
  }, []);

  const generateAdventureSummary = useCallback(async (responses) => {
    setIsGeneratingSummary(true);
    
    setTimeout(async () => {
      const completionMessage = {
        id: Date.now(),
        type: 'received',
        text: "🎉 Congratulations, brave explorer! You've completed your health adventure! Let me analyze your journey and provide you with personalized insights...",
        timestamp: 'now',
        isAI: true
      };
      
      setMessages(prev => [...prev, completionMessage]);
      
      if (openAIService.current) {
        try {
          const summaryText = await openAIService.current.generateSummary(responses);
          setSummary(summaryText);
        } catch (error) {
          console.error('Failed to generate summary:', error);
          setSummary(`Thank you for completing your health adventure! Based on your responses, here are some general observations:

🔍 **Your Health Journey Summary:**
Your answers provide valuable insights into your health profile. Every individual's health journey is unique, and yours shows thoughtful consideration of important health factors.

💡 **Key Takeaways:**
- You've demonstrated awareness of important health factors
- Your responses suggest you're proactive about your health
- Consider discussing your responses with a healthcare professional

🏥 **Next Steps:**
- Schedule regular check-ups with your doctor
- Maintain healthy lifestyle choices
- Stay informed about screening recommendations for your age group

Remember: This adventure is for educational purposes only. Always consult with qualified healthcare professionals for personalized medical advice and screening recommendations.`);
        }
      } else {
        setSummary("Adventure completed! Please consult with healthcare professionals for personalized health advice.");
      }
      
      setIsGeneratingSummary(false);
    }, 1500);
  }, []);

  const handleSendMessage = useCallback(() => {
    const textToSend = inputText.trim();
    
    if (!textToSend || isAITyping || isComplete) return;

    const userMessage = {
      id: Date.now(),
      type: 'sent',
      text: textToSend,
      timestamp: 'now'
    };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInputText('');
    
    // Store user response and handle logic
    const newResponses = [...userResponses, textToSend];
    setUserResponses(newResponses);
    
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    
    // Update conversation history
    const newHistory = [...conversationHistory, { role: 'user', content: textToSend }];
    setConversationHistory(newHistory);
    
    // Check if we've reached 3 questions
    if (newQuestionCount >= 3) {
      // Adventure complete - generate summary
      setIsComplete(true);
      generateAdventureSummary(newResponses);
    } else {
      // Continue adventure with next question
      getNextQuestion(newHistory, newQuestionCount);
    }
  }, [inputText, isAITyping, isComplete, userResponses, questionCount, conversationHistory, getNextQuestion, generateAdventureSummary]);

  // Border component
  const Border = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100/80 via-rose-100/80 to-pink-200/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[700px] overflow-hidden border border-gray-300">
        {/* Mac-style Window Title Bar */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mac Window Control Buttons - ALL CLOSE */}
            <div className="flex items-center gap-2">
              <div 
                onClick={onClose}
                className="w-3 h-3 bg-red-400 rounded-full hover:bg-red-500 cursor-pointer"
              ></div>
              <div 
                onClick={onClose}
                className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500 cursor-pointer"
              ></div>
              <div 
                onClick={onClose}
                className="w-3 h-3 bg-green-400 rounded-full hover:bg-green-500 cursor-pointer"
              ></div>
            </div>
          </div>
          <div></div>
        </div>
        
        {/* Window Content */}
        <div className="h-[calc(700px-56px)] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-pink-50 flex justify-center items-center overflow-hidden">
      <Border onClose={onClose}>
        <div 
          className="h-full flex flex-col relative"
          style={{ 
            backgroundImage: "url('/waBackground.jpg')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundColor: '#fef7f7'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  🗺️
                </div>
                <div className="flex-1">
                  <h2 className="font-medium text-base text-white">AI Health Adventure</h2>
                  <div className="text-xs text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    {isComplete ? 'Adventure Complete!' : `Question ${questionCount} of 3`}
                  </div>
                </div>
              </div>
              
              {/* Skip button in header */}
              {showSkipOption && !isComplete && onSkip && (
                <button
                  onClick={onSkip}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors"
                >
                  Skip Adventure
                </button>
              )}
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
                  <span className="text-sm text-gray-600">Adventure Guide is thinking...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Summary Display */}
          {isComplete && summary && (
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-t border-pink-200 p-6 max-h-64 overflow-y-auto">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Your Adventure Summary</h3>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {summary}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Summary */}
          {isGeneratingSummary && (
            <div className="bg-pink-50 border-t border-pink-200 p-4">
              <div className="flex items-center justify-center space-x-2">
                <Loader className="w-5 h-5 animate-spin text-pink-500" />
                <span className="text-sm font-medium text-pink-700">
                  Generating your personalized adventure summary...
                </span>
              </div>
            </div>
          )}

          {/* Input Area */}
          {!isComplete && (
            <div className="bg-white p-4 border-t border-pink-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your response to continue the adventure..."
                  disabled={isAITyping}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  onBlur={(e) => {
                    // Prevent losing focus unless clicking on button
                    if (!e.relatedTarget || !e.relatedTarget.closest('button')) {
                      setTimeout(() => {
                        if (inputRef.current && !isComplete && !isAITyping) {
                          inputRef.current.focus();
                        }
                      }, 0);
                    }
                  }}
                  className="flex-1 p-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 bg-white placeholder-gray-500 text-sm disabled:opacity-50"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isAITyping}
                  className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                Adventure Progress: {questionCount} of 3 questions completed
              </div>
              
              {/* Skip Option */}
              {showSkipOption && !isComplete && onSkip && (
                <div className="mt-2 text-center">
                  <button
                    onClick={onSkip}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Skip this adventure and go to main app
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Completion Message */}
          {isComplete && summary && (
            <div className="bg-white border-t border-pink-200 p-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-pink-700">
                    Adventure Complete! Welcome to Screen-Play.
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Home size={16} />
                  Enter Screen-Play Platform
                </button>
              </div>
            </div>
          )}
        </div>
      </Border>
    </div>
  );
};

export default AITextAdventure;