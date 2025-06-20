// client/src/services/api/AIRiskEngine.js
class AIRiskEngine {
    constructor(apiKey, model = 'gpt-4o-mini') {
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
  
    async generateConversationalResponse(conversationHistory) {
      if (!this.apiKey) {
        throw new Error('OpenAI API key not configured');
      }
  
      const systemPrompt = this.getConversationalSystemPrompt();
      const conversationPrompt = this.buildConversationPrompt(conversationHistory);
  
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
                content: systemPrompt
              },
              {
                role: 'user', 
                content: conversationPrompt
              }
            ],
            temperature: 0.7,
            max_tokens: 300,
            response_format: { type: "json_object" }
          })
        });
  
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
  
        const result = await response.json();
        return this.parseConversationalResponse(result.choices[0].message.content);
      } catch (error) {
        console.error('Conversational response failed:', error);
        return this.getFallbackConversationalResponse();
      }
    }
  
    getConversationalSystemPrompt() {
      return `You are a caring AI health assistant conducting a cancer risk assessment interview. Your goal is to collect the following REQUIRED information through natural conversation:
  
  REQUIRED INFORMATION:
  1. Age (specific number)
  2. Sex/Gender (male/female) 
  3. Height and Weight (for BMI calculation)
  4. Family history of cancer (any relatives, what type)
  5. Smoking status and details (never/former/current, frequency, type)
  6. Alcohol consumption (frequency and amount)
  
  CRITICAL RULES:
  - NEVER repeat questions that have already been asked
  - ALWAYS acknowledge information the user has already provided
  - Build on previous answers rather than asking the same thing again
  - Ask ONE question at a time
  - Move systematically through missing information only
  
  CONVERSATION GUIDELINES:
  - Be warm, empathetic, and professional
  - Follow up on answers that need clarification (e.g., if they smoke, ask how often and what type)
  - Keep responses conversational and friendly
  - Don't overwhelm with medical jargon
  - Show that you're listening by acknowledging their responses
  - Reference what they've already told you to show you're paying attention
  
  COMPLETION CRITERIA:
  Only mark as complete when you have ALL required information with sufficient detail.
  
  RESPONSE FORMAT:
  Return JSON with:
  {
    "message": "Your conversational response",
    "isComplete": boolean (true only when ALL required info collected),
    "missingInfo": ["list", "of", "missing", "categories"],
    "needsFollowUp": "category that needs more detail or null"
  }`;
    }
  
    buildConversationPrompt(conversationHistory) {
      const conversation = conversationHistory.map(msg => 
        `${msg.type === 'sent' ? 'User' : 'AI'}: ${msg.text}`
      ).join('\n');
  
      return `Here is the conversation so far:
  
  ${conversation}
  
  ANALYSIS TASK:
  1. Carefully review what information the user has ALREADY PROVIDED
  2. Identify what information is still MISSING
  3. Check if any previous answers need follow-up clarification
  4. DO NOT ask questions that have already been answered
  
  INFORMATION CHECKLIST - Mark as COLLECTED or MISSING:
  - Age: Look for specific age number in user responses
  - Sex/Gender: Look for male/female identification
  - Height: Look for height measurement
  - Weight: Look for weight measurement  
  - Family history: Look for any mention of cancer in family members
  - Smoking: Look for smoking status (never/former/current) and details
  - Alcohol: Look for drinking habits and frequency
  
  RESPONSE STRATEGY:
  - If information is MISSING: Ask for it naturally
  - If information was PROVIDED but needs clarification: Ask follow-up
  - If ALL information is COLLECTED: Mark as complete
  - ALWAYS acknowledge what they've already shared before asking for new information
  
  Example good response: "Thanks for telling me you're 45 years old. Now, could you share your height and weight so I can calculate your BMI?"
  
  Generate your response following these guidelines.`;
    }
  
    parseConversationalResponse(response) {
      try {
        const parsed = JSON.parse(response);
        return {
          message: parsed.message || "Could you tell me more about that?",
          isComplete: parsed.isComplete || false,
          missingInfo: parsed.missingInfo || [],
          needsFollowUp: parsed.needsFollowUp || null
        };
      } catch (error) {
        console.error('Failed to parse conversational response:', error);
        return this.getFallbackConversationalResponse();
      }
    }
  
    getFallbackConversationalResponse() {
      return {
        message: "Thank you for that information. To help me provide the best assessment, could you share your age?",
        isComplete: false,
        missingInfo: ['age'],
        needsFollowUp: null
      };
    }

  
    getFinalRiskSystemPrompt() {
      return `You are a medical AI specialist providing cancer risk assessments. Based on patient information, calculate a comprehensive risk assessment.
  
  ASSESSMENT CRITERIA:
  - Use established medical literature and risk factors
  - Consider age, sex, family history, lifestyle factors (smoking, alcohol, BMI)
  - Be conservative and evidence-based
  - Include both risk factors and protective factors
  - Provide actionable recommendations
  
  RISK CATEGORIES:
  - 0-15%: Low risk
  - 16-30%: Low-Moderate risk  
  - 31-50%: Moderate risk
  - 51-70%: Moderate-High risk
  - 71-100%: High risk
  
  IMPORTANT:
  - Always include medical disclaimers
  - Recommend professional consultation
  - Be specific about which cancer types the assessment covers
  - Include protective factors when present
  
  Return comprehensive JSON assessment with all fields filled.`;
    }
  
    async calculateFinalRiskFromData(collectedInfo) {
      if (!this.apiKey) {
        throw new Error('OpenAI API key not configured');
      }
  
      const systemPrompt = this.getFinalRiskSystemPrompt();
      const dataPrompt = this.buildDataAnalysisPrompt(collectedInfo);
  
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
                content: systemPrompt
              },
              {
                role: 'user',
                content: dataPrompt
              }
            ],
            temperature: 0.2,
            max_tokens: 800,
            response_format: { type: "json_object" }
          })
        });
  
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
  
        const result = await response.json();
        return this.parseFinalRiskResponse(result.choices[0].message.content);
      } catch (error) {
        console.error('Final risk calculation failed:', error);
        return this.getFallbackFinalRisk();
      }
    }
  
    buildDataAnalysisPrompt(collectedInfo) {
      // Clean and validate the data to prevent API errors
      const cleanData = {
        age: collectedInfo.age || 'Not provided',
        gender: collectedInfo.gender || 'Not provided',
        height: collectedInfo.height || 'Not provided',
        weight: collectedInfo.weight || 'Not provided',
        familyHistory: collectedInfo.familyHistory || 'Not provided',
        smokingStatus: collectedInfo.smoking?.status || 'Not provided',
        smokingDetails: collectedInfo.smoking?.details || 'Not provided',
        alcoholFrequency: collectedInfo.alcohol?.frequency || 'Not provided'
      };
  
      return `Analyze this structured health data and provide a comprehensive cancer risk assessment:
  
  PATIENT DATA:
  Age: ${cleanData.age}
  Gender: ${cleanData.gender}
  Height: ${cleanData.height}
  Weight: ${cleanData.weight}
  Family History: ${cleanData.familyHistory}
  Smoking Status: ${cleanData.smokingStatus}
  Smoking Details: ${cleanData.smokingDetails}
  Alcohol Frequency: ${cleanData.alcoholFrequency}
  
  ANALYSIS REQUIREMENTS:
  1. Calculate overall cancer risk percentage (0-100%) based on established risk factors
  2. Identify specific risk factors present in this patient
  3. Identify any protective factors
  4. Provide specific, actionable recommendations
  5. Consider age, gender, BMI, family history, and lifestyle factors
  6. Include appropriate medical disclaimers
  
  You must respond with valid JSON in this exact format:
  {
    "riskPercentage": 25,
    "riskLevel": "Low-Moderate",
    "confidence": "Medium",
    "keyFactors": ["Age over 40", "Family history"],
    "protectiveFactors": ["Non-smoker", "Regular exercise"],
    "recommendations": ["Regular screening", "Maintain healthy lifestyle"],
    "additionalInfo": "Based on provided health information",
    "disclaimer": "This assessment is for educational purposes only",
    "cancerTypesAssessed": ["general"]
  }`;
    }
  
    parseFinalRiskResponse(response) {
      try {
        const parsed = JSON.parse(response);
        
        return {
          riskPercentage: Math.min(Math.max(parsed.riskPercentage || 0, 0), 100),
          riskLevel: parsed.riskLevel || 'Moderate',
          confidence: parsed.confidence || 'Medium',
          keyFactors: parsed.keyFactors || [],
          protectiveFactors: parsed.protectiveFactors || [],
          recommendations: parsed.recommendations || [],
          additionalInfo: parsed.additionalInfo || '',
          disclaimer: parsed.disclaimer || 'This assessment is for educational purposes only. Please consult a healthcare professional for proper medical evaluation.',
          cancerTypesAssessed: parsed.cancerTypesAssessed || ['general'],
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.error('Failed to parse final risk response:', error);
        return this.getFallbackFinalRisk();
      }
    }
  
    getFallbackFinalRisk() {
      return {
        riskPercentage: 25,
        riskLevel: 'Moderate',
        confidence: 'Low',
        keyFactors: ['Assessment incomplete'],
        protectiveFactors: [],
        recommendations: ['Consult with a healthcare professional for proper assessment'],
        additionalInfo: 'Risk calculation was incomplete due to technical issues.',
        disclaimer: 'This assessment could not be completed. Please consult a healthcare professional.',
        cancerTypesAssessed: ['general'],
        timestamp: new Date().toISOString(),
        isError: true
      };
    }
  }
  
  export default AIRiskEngine;