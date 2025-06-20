// client/src/services/api/AIRiskEngine.js
class AIRiskEngine {
    constructor(apiKey, model = 'gpt-4') {
      this.apiKey = apiKey;
      this.model = model;
      this.baseURL = 'https://api.openai.com/v1/chat/completions';
    }
  
    async calculateRisk(healthData, conversationContext = []) {
      if (!this.apiKey) {
        throw new Error('OpenAI API key not configured');
      }
  
      const prompt = this.buildRiskAssessmentPrompt(healthData, conversationContext);
      
      try {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: this.model,
            messages: [
              {
                role: 'system',
                content: this.getSystemPrompt()
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.2,
            max_tokens: 600,
            response_format: { type: "json_object" }
          })
        });
  
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
  
        const result = await response.json();
        return this.parseRiskResponse(result.choices[0].message.content);
      } catch (error) {
        console.error('Risk calculation failed:', error);
        return this.getFallbackRisk();
      }
    }
  
    getSystemPrompt() {
      return `You are a medical AI assistant specialized in cancer risk assessment. Your role is to:
  
  1. Analyze patient data and provide risk assessment
  2. Identify key risk factors based on medical literature
  3. Provide actionable recommendations
  4. Always include appropriate medical disclaimers
  
  IMPORTANT GUIDELINES:
  - Risk percentages should be based on established medical research
  - Always recommend consulting healthcare professionals
  - Be conservative with risk estimates
  - Focus on modifiable risk factors
  - Provide educational information
  
  Return your response in valid JSON format with these exact fields:
  {
    "riskPercentage": number (0-100),
    "riskLevel": "Low" | "Low-Moderate" | "Moderate" | "Moderate-High" | "High",
    "keyFactors": ["factor1", "factor2"],
    "recommendations": ["recommendation1", "recommendation2"],
    "confidence": "Low" | "Medium" | "High",
    "disclaimer": "string",
    "nextQuestions": ["question1", "question2"]
  }`;
    }
  
    buildRiskAssessmentPrompt(healthData, conversationContext) {
      const contextSummary = conversationContext.length > 0 
        ? `Recent conversation: ${conversationContext.slice(-5).map(msg => `${msg.type}: ${msg.text}`).join('\n')}`
        : 'No previous conversation context.';
  
      return `Assess cancer risk based on this patient data:
  
  PATIENT INFORMATION:
  Demographics: ${JSON.stringify(healthData.demographics || {})}
  Symptoms: ${JSON.stringify(healthData.symptoms || {})}
  Medical History: ${JSON.stringify(healthData.medicalHistory || {})}
  Lifestyle Factors: ${JSON.stringify(healthData.lifestyle || {})}
  Family History: ${JSON.stringify(healthData.familyHistory || {})}
  
  CONVERSATION CONTEXT:
  ${contextSummary}
  
  ASSESSMENT REQUIREMENTS:
  1. Calculate overall cancer risk percentage based on established risk factors
  2. Identify the most significant risk factors present
  3. Provide specific, actionable recommendations
  4. Suggest 2-3 follow-up questions to gather more relevant information
  5. Include appropriate medical disclaimers
  
  Please provide a comprehensive risk assessment in the specified JSON format.`;
    }
  
    parseRiskResponse(response) {
      try {
        const parsed = JSON.parse(response);
        
        // Validate required fields
        const required = ['riskPercentage', 'riskLevel', 'keyFactors', 'recommendations', 'confidence'];
        for (const field of required) {
          if (!(field in parsed)) {
            console.warn(`Missing required field: ${field}`);
          }
        }
  
        // Ensure risk percentage is within bounds
        if (parsed.riskPercentage > 100) parsed.riskPercentage = 100;
        if (parsed.riskPercentage < 0) parsed.riskPercentage = 0;
  
        return {
          riskPercentage: parsed.riskPercentage || 0,
          riskLevel: parsed.riskLevel || 'Unknown',
          keyFactors: parsed.keyFactors || [],
          recommendations: parsed.recommendations || [],
          confidence: parsed.confidence || 'Medium',
          disclaimer: parsed.disclaimer || 'This assessment is for educational purposes only. Please consult a healthcare professional.',
          nextQuestions: parsed.nextQuestions || [],
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.error('Failed to parse AI response:', error);
        return this.getFallbackRisk();
      }
    }
  
    getFallbackRisk() {
      return {
        riskPercentage: 0,
        riskLevel: 'Unable to Calculate',
        keyFactors: ['Insufficient data'],
        recommendations: ['Please consult a healthcare professional for proper assessment'],
        confidence: 'Low',
        disclaimer: 'Risk calculation unavailable. Please consult a healthcare professional.',
        nextQuestions: ['What is your age?', 'Do you have any current symptoms?'],
        timestamp: new Date().toISOString(),
        isError: true
      };
    }
  
    async generateFollowUpMessage(riskAssessment, healthData) {
      const prompt = `Based on this risk assessment, generate a conversational follow-up message:
  
  Risk Assessment: ${JSON.stringify(riskAssessment)}
  Current Health Data: ${JSON.stringify(healthData)}
  
  Generate a caring, informative message that:
  1. Acknowledges the current risk level
  2. Explains key factors in simple terms
  3. Asks one specific follow-up question to gather more information
  4. Maintains a supportive tone
  
  Return only the message text, not JSON.`;
  
      try {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: this.model,
            messages: [
              {
                role: 'system',
                content: 'You are a caring health assistant who explains medical information in a warm, supportive way.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 200
          })
        });
  
        const result = await response.json();
        return result.choices[0].message.content.trim();
      } catch (error) {
        console.error('Follow-up generation failed:', error);
        return "Thank you for sharing that information. Can you tell me more about any symptoms you might be experiencing?";
      }
    }
  }
  
  export default AIRiskEngine;