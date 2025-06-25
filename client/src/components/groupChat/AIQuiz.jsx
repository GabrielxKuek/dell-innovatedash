import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Loader, AlertCircle } from 'lucide-react';
import AIRiskEngine from '../../services/api/AIRiskEngine';
import TextBubble from '../messages/TextBubble';
import FinalRiskDisplay from './FinalRiskDisplay';

const AIQuiz = ({ group, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(8);
  const [isAwaitingSmokingDetails, setIsAwaitingSmokingDetails] = useState(false);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [finalRiskAssessment, setFinalRiskAssessment] = useState(null);
  const [isCalculatingFinalRisk, setIsCalculatingFinalRisk] = useState(false);
  
  const [aiEngine] = useState(() => new AIRiskEngine(import.meta.env.VITE_OPENAI_API_KEY));
  const messagesEndRef = useRef(null);

  // Define all questions in order
  const questions = [
    {
      id: 'name',
      text: "Hello! I'm an AI assistant that will help assess your cancer risk factors. This should take about 5-10 minutes. Let's start - what's your name?",
      key: 'name'
    },
    {
      id: 'age',
      text: "Thanks! Now, could you tell me your age? This helps me assess age-related risk factors.",
      key: 'age'
    },
    {
      id: 'gender',
      text: "What is your gender? This affects certain cancer risk factors.",
      key: 'gender'
    },
    {
      id: 'height',
      text: "Could you share your height? I need this along with weight to calculate your BMI.",
      key: 'height'
    },
    {
      id: 'weight',
      text: "What is your current weight?",
      key: 'weight'
    },
    {
      id: 'family_history',
      text: "Do you have any family history of cancer? Please tell me about any relatives who have had cancer, or say 'no' if there's no family history.",
      key: 'family_history'
    },
    {
      id: 'smoking',
      text: "Do you smoke or have you ever smoked? Please tell me your smoking status.",
      key: 'smoking'
    },
    {
      id: 'alcohol',
      text: "How often do you drink alcohol? For example, daily, weekly, monthly, or never?",
      key: 'alcohol'
    }
  ];

  // Initialize with first question
  useEffect(() => {
    const firstQuestion = {
      id: Date.now(),
      type: 'received',
      text: questions[0].text,
      timestamp: 'now',
      isAI: true
    };
    setMessages([firstQuestion]);
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
    
    // Handle smoking details follow-up differently
    if (isAwaitingSmokingDetails) {
      // Store smoking details and move to next question
      const newAnswers = {
        ...userAnswers,
        smoking_details: inputText.trim()
      };
      setUserAnswers(newAnswers);
      setIsAwaitingSmokingDetails(false);
      setInputText('');
      processUserResponse(newAnswers, true); // true = skip smoking follow-up check
      return;
    }
    
    // Normal question handling
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      console.error('No current question found for index:', currentQuestionIndex);
      return;
    }
    
    // Store the user's answer
    const newAnswers = {
      ...userAnswers,
      [currentQuestion.key]: inputText.trim()
    };
    setUserAnswers(newAnswers);
    
    setInputText('');
    
    // Process the response
    processUserResponse(newAnswers, false);
  };

  // Process user response and move to next question
  const processUserResponse = async (answers, skipSmokingCheck = false) => {
    setIsAITyping(true);
    
    try {
      console.log('Current question index:', currentQuestionIndex);
      console.log('User answers so far:', answers);
      console.log('Skip smoking check:', skipSmokingCheck);
      
      // Check if we need follow-up for smoking (only if not skipping)
      const needsSmokingFollowup = 
        !skipSmokingCheck &&
        currentQuestionIndex === 6 && // Just answered smoking question
        answers.smoking && 
        !answers.smoking.toLowerCase().includes('never') &&
        !answers.smoking.toLowerCase().includes('no') &&
        !answers.smoking_details;

      if (needsSmokingFollowup) {
        // Increase total questions to account for follow-up
        setTotalQuestions(9);
        setIsAwaitingSmokingDetails(true);
        
        // Ask follow-up smoking question
        setTimeout(() => {
          const followupMessage = {
            id: Date.now() + 1,
            type: 'received',
            text: "You mentioned you smoke or have smoked. Could you tell me more details - how often and what type of tobacco products?",
            timestamp: 'now',
            isAI: true
          };
          
          setMessages(prev => [...prev, followupMessage]);
          setIsAITyping(false);
          // Don't change currentQuestionIndex - stay on smoking question until details collected
        }, 1000);
        return;
      }

      // Calculate next question index
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      console.log('Next question index will be:', nextQuestionIndex);
      
      if (nextQuestionIndex < questions.length) {
        // Ask next question
        setTimeout(() => {
          const nextQuestion = questions[nextQuestionIndex];
          if (nextQuestion) {
            const nextMessage = {
              id: Date.now() + 1,
              type: 'received',
              text: nextQuestion.text,
              timestamp: 'now',
              isAI: true
            };
            
            setMessages(prev => [...prev, nextMessage]);
            setCurrentQuestionIndex(nextQuestionIndex);
          }
          setIsAITyping(false);
        }, 1000);
      } else {
        // Assessment complete
        console.log('Assessment complete! All questions answered.');
        setTimeout(() => {
          const completionMessage = {
            id: Date.now() + 1,
            type: 'received',
            text: "Perfect! I now have all the information I need for your cancer risk assessment. Let me analyze everything you've shared and calculate your personalized risk profile.",
            timestamp: 'now',
            isAI: true
          };
          
          setMessages(prev => [...prev, completionMessage]);
          setIsAITyping(false);
          setIsAssessmentComplete(true);
          
          // Calculate risk
          calculateFinalRisk(answers);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Response processing failed:', error);
      setIsAITyping(false);
    }
  };

  // Calculate final risk assessment
  const calculateFinalRisk = async (answers) => {
    console.log('Calculating final risk with answers:', answers);
    setIsCalculatingFinalRisk(true);
    
    try {
      // Convert answers to structured format
      const structuredData = {
        age: extractAge(answers.age),
        gender: extractGender(answers.gender),
        height: answers.height,
        weight: answers.weight,
        familyHistory: answers.family_history,
        smoking: {
          status: extractSmokingStatus(answers.smoking),
          details: answers.smoking_details || null
        },
        alcohol: {
          frequency: answers.alcohol,
          amount: null
        }
      };

      console.log('Structured data for AI:', structuredData);
      
      const riskAssessment = await aiEngine.calculateFinalRiskFromData(structuredData);
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
    }
  };

  // Helper functions to extract structured data
  const extractAge = (ageText) => {
    if (!ageText) return null;
    const match = ageText.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  const extractGender = (genderText) => {
    if (!genderText) return null;
    const text = genderText.toLowerCase();
    if (text.includes('male') && !text.includes('female')) return 'male';
    if (text.includes('female') || text.includes('woman')) return 'female';
    if (text.includes('man') && !text.includes('woman')) return 'male';
    return genderText; // Return as-is if unclear
  };

  const extractSmokingStatus = (smokingText) => {
    if (!smokingText) return null;
    const text = smokingText.toLowerCase();
    if (text.includes('never') || text.includes('no')) return 'never';
    if (text.includes('quit') || text.includes('stopped') || text.includes('former')) return 'former';
    if (text.includes('yes') || text.includes('smoke') || text.includes('do')) return 'current';
    return 'unclear';
  };

  return (
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
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className="mr-3 hover:bg-white/10 rounded-full p-1 transition-colors text-white"
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
              {isAssessmentComplete ? 'Assessment Complete' : 
               isAwaitingSmokingDetails ? `Follow-up Question ${currentQuestionIndex + 1} of ${totalQuestions}` :
               `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
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

      {/* Final Risk Assessment - Properly Contained */}
      {isAssessmentComplete && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="h-full overflow-hidden">
            <FinalRiskDisplay 
              riskAssessment={finalRiskAssessment}
              isCalculating={isCalculatingFinalRisk}
              onBack={onBack}
            />
          </div>
        </div>
      )}

      {/* Input Area - FIXED STYLING */}
      {!isAssessmentComplete && (
        <div className="bg-white p-4 border-t border-pink-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your response..."
              disabled={isAITyping}
              className="flex-1 p-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 bg-white placeholder-gray-500 text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAITyping}
              className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
          
          {/* Progress Indicator */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {isAwaitingSmokingDetails ? 
              `Follow-up Question ${currentQuestionIndex + 1} of ${totalQuestions} • Please provide more details` :
              `Question ${currentQuestionIndex + 1} of ${totalQuestions} • Answer each question to continue`
            }
          </div>
        </div>
      )}

      {/* Assessment Complete Message */}
      {isAssessmentComplete && !finalRiskAssessment && !isCalculatingFinalRisk && (
        <div className="bg-pink-50 border-t border-pink-200 p-4">
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-medium text-pink-700">
              Assessment completed! Your risk analysis is ready.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuiz;