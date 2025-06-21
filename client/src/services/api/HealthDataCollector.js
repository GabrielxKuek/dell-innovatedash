// client/src/services/api/HealthDataCollector.js
class HealthDataCollector {
    constructor() {
      this.userData = {
        demographics: {},
        symptoms: {},
        medicalHistory: {},
        lifestyle: {},
        familyHistory: {}
      };
      this.conversationHistory = [];
      this.dataChangeListeners = [];
      this.riskUpdateThreshold = 3; // Update risk after every 3 new pieces of data
      this.dataPointsAdded = 0;
    }
  
    // Add health data and notify listeners
    addHealthData(category, data) {
      if (!this.userData[category]) {
        this.userData[category] = {};
      }
      
      const oldData = { ...this.userData[category] };
      this.userData[category] = { ...this.userData[category], ...data };
      
      // Check if new data was actually added
      const hasNewData = JSON.stringify(oldData) !== JSON.stringify(this.userData[category]);
      
      if (hasNewData) {
        this.dataPointsAdded++;
        this.notifyDataChange();
      }
    }
  
    // Extract health information from user messages
    extractHealthInfo(message) {
      const messageText = message.toLowerCase();
      const extractedData = {};
  
      // Demographics extraction
      const ageMatch = messageText.match(/(?:i'm|i am|age|years old|year old)\s*(\d+)/);
      if (ageMatch) {
        extractedData.demographics = { age: parseInt(ageMatch[1]) };
      }
  
      const genderMatch = messageText.match(/(?:i'm|i am)\s*(male|female|man|woman)/);
      if (genderMatch) {
        const gender = genderMatch[1] === 'man' ? 'male' : genderMatch[1] === 'woman' ? 'female' : genderMatch[1];
        extractedData.demographics = { ...extractedData.demographics, gender };
      }
  
      // Symptoms extraction
      const symptomKeywords = [
        'pain', 'ache', 'hurt', 'sore', 'tender', 'swelling', 'lump', 'bump',
        'tired', 'fatigue', 'exhausted', 'weak', 'nausea', 'sick', 'vomit',
        'cough', 'fever', 'headache', 'dizzy', 'shortness of breath',
        'weight loss', 'appetite', 'bleeding', 'discharge', 'rash'
      ];
  
      const foundSymptoms = symptomKeywords.filter(symptom => 
        messageText.includes(symptom)
      );
  
      if (foundSymptoms.length > 0) {
        extractedData.symptoms = {
          currentSymptoms: [...(this.userData.symptoms.currentSymptoms || []), ...foundSymptoms],
          reportedAt: new Date().toISOString()
        };
      }
  
      // Lifestyle extraction
      if (messageText.includes('smoke') || messageText.includes('smoking')) {
        const smokingStatus = messageText.includes('don\'t smoke') || messageText.includes('never smoked') 
          ? 'never' 
          : messageText.includes('quit') || messageText.includes('stopped')
          ? 'former'
          : 'current';
        
        extractedData.lifestyle = { 
          ...extractedData.lifestyle, 
          smoking: { status: smokingStatus, reportedAt: new Date().toISOString() }
        };
      }
  
      if (messageText.includes('drink') || messageText.includes('alcohol')) {
        const drinkingFrequency = this.extractFrequency(messageText);
        extractedData.lifestyle = {
          ...extractedData.lifestyle,
          alcohol: { frequency: drinkingFrequency, reportedAt: new Date().toISOString() }
        };
      }
  
      // Family history extraction
      if (messageText.includes('family') || messageText.includes('mother') || messageText.includes('father') || 
          messageText.includes('parent') || messageText.includes('sibling') || messageText.includes('grandmother') ||
          messageText.includes('grandfather')) {
        
        const cancerMention = messageText.includes('cancer');
        if (cancerMention) {
          const relation = this.extractFamilyRelation(messageText);
          extractedData.familyHistory = {
            cancerHistory: [
              ...(this.userData.familyHistory.cancerHistory || []),
              { relation, type: 'cancer', reportedAt: new Date().toISOString() }
            ]
          };
        }
      }
  
      // Medical history extraction
      if (messageText.includes('diagnosed') || messageText.includes('had cancer') || 
          messageText.includes('treatment') || messageText.includes('surgery')) {
        extractedData.medicalHistory = {
          ...extractedData.medicalHistory,
          previousConditions: messageText,
          reportedAt: new Date().toISOString()
        };
      }
  
      return Object.keys(extractedData).length > 0 ? extractedData : null;
    }
  
    extractFrequency(text) {
      if (text.includes('daily') || text.includes('every day')) return 'daily';
      if (text.includes('weekly') || text.includes('week')) return 'weekly';
      if (text.includes('monthly') || text.includes('month')) return 'monthly';
      if (text.includes('rarely') || text.includes('seldom')) return 'rarely';
      if (text.includes('never') || text.includes('don\'t drink')) return 'never';
      return 'occasionally';
    }
  
    extractFamilyRelation(text) {
      if (text.includes('mother')) return 'mother';
      if (text.includes('father')) return 'father';
      if (text.includes('sister')) return 'sister';
      if (text.includes('brother')) return 'brother';
      if (text.includes('grandmother')) return 'grandmother';
      if (text.includes('grandfather')) return 'grandfather';
      if (text.includes('parent')) return 'parent';
      if (text.includes('sibling')) return 'sibling';
      return 'family member';
    }
  
    // Add conversation message
    addConversationMessage(message) {
      this.conversationHistory.push({
        ...message,
        timestamp: new Date().toISOString()
      });
  
      // Extract health info from the message
      if (message.type === 'sent') {
        const healthInfo = this.extractHealthInfo(message.text);
        if (healthInfo) {
          Object.keys(healthInfo).forEach(category => {
            this.addHealthData(category, healthInfo[category]);
          });
        }
      }
  
      // Keep conversation history manageable (last 50 messages)
      if (this.conversationHistory.length > 50) {
        this.conversationHistory = this.conversationHistory.slice(-50);
      }
    }
  
    // Check if enough new data for risk update
    shouldUpdateRisk() {
      return this.dataPointsAdded >= this.riskUpdateThreshold;
    }
  
    // Reset data points counter after risk update
    resetDataPointsCounter() {
      this.dataPointsAdded = 0;
    }
  
    // Get current health data summary
    getHealthDataSummary() {
      const summary = {
        totalDataPoints: Object.keys(this.userData).reduce((count, category) => 
          count + Object.keys(this.userData[category]).length, 0
        ),
        categoriesWithData: Object.keys(this.userData).filter(category => 
          Object.keys(this.userData[category]).length > 0
        ),
        lastUpdated: new Date().toISOString()
      };
  
      return summary;
    }
  
    // Register listener for data changes
    onDataChange(callback) {
      this.dataChangeListeners.push(callback);
    }
  
    // Remove listener
    removeDataChangeListener(callback) {
      this.dataChangeListeners = this.dataChangeListeners.filter(listener => listener !== callback);
    }
  
    // Notify all listeners of data changes
    notifyDataChange() {
      this.dataChangeListeners.forEach(callback => {
        try {
          callback(this.userData, this.shouldUpdateRisk());
        } catch (error) {
          console.error('Error in data change listener:', error);
        }
      });
    }
  
    // Get conversation context for AI
    getConversationContext(messageLimit = 10) {
      return this.conversationHistory.slice(-messageLimit);
    }
  
    // Clear all data (for new session)
    clearData() {
      this.userData = {
        demographics: {},
        symptoms: {},
        medicalHistory: {},
        lifestyle: {},
        familyHistory: {}
      };
      this.conversationHistory = [];
      this.dataPointsAdded = 0;
      this.notifyDataChange();
    }
  
    // Export data for external use
    exportData() {
      return {
        userData: { ...this.userData },
        conversationHistory: [...this.conversationHistory],
        summary: this.getHealthDataSummary()
      };
    }
  
    // Import data from external source
    importData(data) {
      if (data.userData) {
        this.userData = { ...data.userData };
      }
      if (data.conversationHistory) {
        this.conversationHistory = [...data.conversationHistory];
      }
      this.notifyDataChange();
    }
  
    // Get missing critical information
    getMissingCriticalInfo() {
      const missing = [];
      
      if (!this.userData.demographics.age) missing.push('age');
      if (!this.userData.demographics.gender) missing.push('gender');
      if (!this.userData.symptoms.currentSymptoms || this.userData.symptoms.currentSymptoms.length === 0) {
        missing.push('symptoms');
      }
      if (!this.userData.familyHistory.cancerHistory) missing.push('family history');
      if (!this.userData.lifestyle.smoking) missing.push('smoking history');
  
      return missing;
    }
  
    // Generate suggested next questions based on missing data
    getSuggestedQuestions() {
      const missing = this.getMissingCriticalInfo();
      const questions = [];
  
      if (missing.includes('age')) {
        questions.push("Could you share your age? This helps with risk assessment.");
      }
      if (missing.includes('gender')) {
        questions.push("What is your gender? This affects certain cancer risk factors.");
      }
      if (missing.includes('symptoms')) {
        questions.push("Are you experiencing any symptoms or concerns?");
      }
      if (missing.includes('family history')) {
        questions.push("Do you have any family history of cancer?");
      }
      if (missing.includes('smoking history')) {
        questions.push("Do you smoke or have you smoked in the past?");
      }
  
      return questions;
    }
  }
  
  export default HealthDataCollector;