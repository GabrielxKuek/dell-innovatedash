// client/src/services/api/ConversationTracker.js
class ConversationTracker {
    constructor() {
      this.collectedInfo = {
        age: null,
        gender: null,
        height: null,
        weight: null,
        familyHistory: null,
        smoking: {
          status: null, // never, former, current
          details: null // frequency, type, etc.
        },
        alcohol: {
          frequency: null,
          amount: null
        }
      };
      
      this.conversationState = {
        currentTopic: 'introduction',
        questionsAsked: new Set(),
        needsFollowUp: null
      };
    }
  
    // Extract information from user message
    extractInfoFromMessage(message) {
      const text = message.toLowerCase();
      let extracted = false;
  
      // Extract age
      const ageMatch = text.match(/\b(\d{1,3})\b.*?(?:years? old|age|yr)/i) || 
                       text.match(/(?:i'm|i am|age)\s*(\d{1,3})/i);
      if (ageMatch && !this.collectedInfo.age) {
        const age = parseInt(ageMatch[1]);
        if (age >= 1 && age <= 120) {
          this.collectedInfo.age = age;
          extracted = true;
        }
      }
  
      // Extract gender
      if (!this.collectedInfo.gender) {
        if (/\b(male|man|boy)\b/i.test(text)) {
          this.collectedInfo.gender = 'male';
          extracted = true;
        } else if (/\b(female|woman|girl)\b/i.test(text)) {
          this.collectedInfo.gender = 'female';
          extracted = true;
        }
      }
  
      // Extract height
      if (!this.collectedInfo.height) {
        const heightMatch = text.match(/(\d+)\s*(?:ft|feet|')\s*(\d+)?\s*(?:in|inches|")?/i) ||
                           text.match(/(\d+(?:\.\d+)?)\s*(?:cm|centimeters?)/i) ||
                           text.match(/(\d+(?:\.\d+)?)\s*(?:m|meters?)/i);
        if (heightMatch) {
          this.collectedInfo.height = heightMatch[0];
          extracted = true;
        }
      }
  
      // Extract weight
      if (!this.collectedInfo.weight) {
        const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lbs?|pounds?|kg|kilograms?)/i);
        if (weightMatch) {
          this.collectedInfo.weight = weightMatch[0];
          extracted = true;
        }
      }
  
      // Extract family history
      if (!this.collectedInfo.familyHistory) {
        const familyWords = /\b(?:mother|father|mom|dad|parent|sister|brother|sibling|grandmother|grandfather|family)\b/i;
        const cancerWords = /\b(?:cancer|tumor|malignant|oncology)\b/i;
        
        if (familyWords.test(text) && cancerWords.test(text)) {
          this.collectedInfo.familyHistory = 'yes_cancer';
          extracted = true;
        } else if (/\b(?:no|none|never)\b.*?\b(?:family|history)\b/i.test(text) ||
                   /\b(?:family|history)\b.*?\b(?:no|none|never)\b/i.test(text)) {
          this.collectedInfo.familyHistory = 'no_cancer';
          extracted = true;
        }
      }
  
      // Extract smoking status
      if (!this.collectedInfo.smoking.status) {
        if (/\b(?:never|don't|do not)\b.*?\bsmoke/i.test(text) || 
            /\bsmoke.*?\b(?:never|no)\b/i.test(text)) {
          this.collectedInfo.smoking.status = 'never';
          extracted = true;
        } else if (/\b(?:quit|stopped|former|used to)\b.*?\bsmoke/i.test(text) ||
                   /\bsmoke.*?\b(?:quit|stopped|former|used to)\b/i.test(text)) {
          this.collectedInfo.smoking.status = 'former';
          extracted = true;
        } else if (/\b(?:smoke|smoking|smoker)\b/i.test(text) && 
                   !/\b(?:never|quit|stopped|no)\b/i.test(text)) {
          this.collectedInfo.smoking.status = 'current';
          extracted = true;
        }
      }
  
      // Extract smoking details if they smoke
      if (this.collectedInfo.smoking.status === 'current' && !this.collectedInfo.smoking.details) {
        if (/\b(?:cigarettes?|pack|daily|day)\b/i.test(text)) {
          this.collectedInfo.smoking.details = text;
          extracted = true;
        }
      }
  
      // Extract alcohol consumption
      if (!this.collectedInfo.alcohol.frequency) {
        if (/\b(?:never|don't|do not)\b.*?\bdrink/i.test(text) ||
            /\bdrink.*?\b(?:never|no)\b/i.test(text)) {
          this.collectedInfo.alcohol.frequency = 'never';
          extracted = true;
        } else if (/\b(?:daily|every day)\b/i.test(text)) {
          this.collectedInfo.alcohol.frequency = 'daily';
          extracted = true;
        } else if (/\b(?:weekly|week)\b/i.test(text)) {
          this.collectedInfo.alcohol.frequency = 'weekly';
          extracted = true;
        } else if (/\b(?:monthly|month)\b/i.test(text)) {
          this.collectedInfo.alcohol.frequency = 'monthly';
          extracted = true;
        } else if (/\b(?:occasionally|sometimes|rarely)\b/i.test(text)) {
          this.collectedInfo.alcohol.frequency = 'occasionally';
          extracted = true;
        }
      }
  
      return extracted;
    }
  
    // Get next question to ask
    getNextQuestion() {
      console.log('Getting next question. Current state:', {
        collectedInfo: this.collectedInfo,
        questionsAsked: Array.from(this.conversationState.questionsAsked)
      });
      
      // Check what's missing and what we haven't asked yet
      
      if (!this.collectedInfo.age && !this.conversationState.questionsAsked.has('age')) {
        this.conversationState.questionsAsked.add('age');
        this.conversationState.currentTopic = 'age';
        return "Could you tell me your age? This helps me assess age-related risk factors.";
      }
  
      if (!this.collectedInfo.gender && !this.conversationState.questionsAsked.has('gender')) {
        this.conversationState.questionsAsked.add('gender');
        this.conversationState.currentTopic = 'gender';
        return "What is your gender? This affects certain cancer risk factors.";
      }
  
      if (!this.collectedInfo.height && !this.conversationState.questionsAsked.has('height')) {
        this.conversationState.questionsAsked.add('height');
        this.conversationState.currentTopic = 'height';
        return "Could you share your height? I need this along with weight to calculate your BMI.";
      }
  
      if (!this.collectedInfo.weight && !this.conversationState.questionsAsked.has('weight')) {
        this.conversationState.questionsAsked.add('weight');
        this.conversationState.currentTopic = 'weight';
        return "What is your current weight?";
      }
  
      if (!this.collectedInfo.familyHistory && !this.conversationState.questionsAsked.has('family')) {
        this.conversationState.questionsAsked.add('family');
        this.conversationState.currentTopic = 'family';
        return "Do you have any family history of cancer? Please tell me about any relatives who have had cancer.";
      }
  
      if (!this.collectedInfo.smoking.status && !this.conversationState.questionsAsked.has('smoking')) {
        this.conversationState.questionsAsked.add('smoking');
        this.conversationState.currentTopic = 'smoking';
        return "Do you smoke or have you ever smoked?";
      }
  
      // Follow-up for smoking details
      if (this.collectedInfo.smoking.status === 'current' && 
          !this.collectedInfo.smoking.details && 
          !this.conversationState.questionsAsked.has('smoking_details')) {
        this.conversationState.questionsAsked.add('smoking_details');
        this.conversationState.currentTopic = 'smoking_details';
        return "You mentioned you smoke. How often do you smoke, and what type of tobacco products do you use?";
      }
  
      if (!this.collectedInfo.alcohol.frequency && !this.conversationState.questionsAsked.has('alcohol')) {
        this.conversationState.questionsAsked.add('alcohol');
        this.conversationState.currentTopic = 'alcohol';
        return "How often do you drink alcohol? For example, daily, weekly, monthly, or never?";
      }
  
      // Check if assessment is complete
      console.log('No more questions needed. Assessment should be complete.');
      return null; // No more questions needed
    }
  
    // Check if we have enough information
    isAssessmentComplete() {
      const hasAge = this.collectedInfo.age !== null;
      const hasGender = this.collectedInfo.gender !== null;
      const hasHeight = this.collectedInfo.height !== null;
      const hasWeight = this.collectedInfo.weight !== null;
      const hasFamilyHistory = this.collectedInfo.familyHistory !== null;
      const hasSmokingStatus = this.collectedInfo.smoking.status !== null;
      const hasAlcoholFreq = this.collectedInfo.alcohol.frequency !== null;
      
      // If they smoke, we need details too
      const hasSmokingDetails = this.collectedInfo.smoking.status !== 'current' || 
                                this.collectedInfo.smoking.details !== null;
      
      const isComplete = hasAge && hasGender && hasHeight && hasWeight && 
                         hasFamilyHistory && hasSmokingStatus && hasAlcoholFreq && hasSmokingDetails;
      
      console.log('Assessment completion check:', {
        hasAge, hasGender, hasHeight, hasWeight, 
        hasFamilyHistory, hasSmokingStatus, hasAlcoholFreq, hasSmokingDetails,
        isComplete,
        collectedInfo: this.collectedInfo
      });
      
      return isComplete;
    }
  
    // Get collected information summary
    getCollectedInfo() {
      return { ...this.collectedInfo };
    }
  
    // Generate acknowledgment for user's response
    generateAcknowledgment(userMessage) {
      const extracted = this.extractInfoFromMessage(userMessage);
      
      if (!extracted) {
        return "I understand. ";
      }
  
      // Generate specific acknowledgments based on what was extracted
      let ack = "";
      
      if (this.conversationState.currentTopic === 'age' && this.collectedInfo.age) {
        ack = `Got it, you're ${this.collectedInfo.age} years old. `;
      } else if (this.conversationState.currentTopic === 'gender' && this.collectedInfo.gender) {
        ack = `Thank you for sharing that. `;
      } else if (this.conversationState.currentTopic === 'height' && this.collectedInfo.height) {
        ack = `Thanks, I have your height as ${this.collectedInfo.height}. `;
      } else if (this.conversationState.currentTopic === 'weight' && this.collectedInfo.weight) {
        ack = `Perfect, your weight is ${this.collectedInfo.weight}. `;
      } else if (this.conversationState.currentTopic === 'family' && this.collectedInfo.familyHistory) {
        ack = this.collectedInfo.familyHistory === 'yes_cancer' ? 
              "I understand you have family history of cancer. " : 
              "Thanks for letting me know about your family history. ";
      } else if (this.conversationState.currentTopic === 'smoking' && this.collectedInfo.smoking.status) {
        ack = `I see you're a ${this.collectedInfo.smoking.status} smoker. `;
      } else if (this.conversationState.currentTopic === 'alcohol' && this.collectedInfo.alcohol.frequency) {
        ack = `Thanks for sharing your drinking habits. `;
      }
  
      return ack;
    }
  
    // Reset tracker
    reset() {
      this.collectedInfo = {
        age: null,
        gender: null,
        height: null,
        weight: null,
        familyHistory: null,
        smoking: { status: null, details: null },
        alcohol: { frequency: null, amount: null }
      };
      this.conversationState = {
        currentTopic: 'introduction',
        questionsAsked: new Set(),
        needsFollowUp: null
      };
    }
  }
  
  export default ConversationTracker;