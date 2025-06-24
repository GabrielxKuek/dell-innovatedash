// Enhanced src/services/api/AIRiskEngine.js
import { singaporeRiskFactors } from '../../data/singaporeRiskFactors.js';
import { singaporeHealthUtils } from '../../lib/singaporeHealthUtils.js';

class AIRiskEngine {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    this.riskFactors = singaporeRiskFactors;
    this.healthUtils = singaporeHealthUtils;
  }

  async calculateRisk(healthData, conversationContext = []) {
    try {
      if (!this.apiKey) {
        console.warn('OpenAI API key not configured, using fallback risk calculation');
        return this.calculateFallbackRisk(healthData);
      }

      const prompt = this.buildRiskAssessmentPrompt(healthData, conversationContext);
      const response = await this.callOpenAI(prompt);
      const riskAssessment = this.parseRiskResponse(response);
      
      // Apply Singapore-specific adjustments
      return this.applySingaporeAdjustments(riskAssessment, healthData);
    } catch (error) {
      console.error('AI risk calculation failed:', error);
      return this.calculateFallbackRisk(healthData);
    }
  }

  async calculateFinalRiskFromData(collectedInfo) {
    try {
      // Enhanced data cleaning with Singapore context
      const cleanData = {
        age: collectedInfo.age || 'Not provided',
        gender: collectedInfo.gender || 'Not provided',
        ethnicity: collectedInfo.ethnicity || 'Not provided',
        height: collectedInfo.height || 'Not provided',
        weight: collectedInfo.weight || 'Not provided',
        familyHistory: collectedInfo.familyHistory || 'Not provided',
        smokingStatus: collectedInfo.smoking?.status || 'Not provided',
        smokingDetails: collectedInfo.smoking?.details || 'Not provided',
        alcoholFrequency: collectedInfo.alcohol?.frequency || 'Not provided',
        occupation: collectedInfo.occupation || 'Not provided',
        location: collectedInfo.location || 'Singapore'
      };

      const prompt = this.buildSingaporeSpecificPrompt(cleanData);
      
      if (!this.apiKey) {
        return this.calculateDetailedFallbackRisk(cleanData);
      }

      const response = await this.callOpenAI(prompt);
      return this.parseFinalRiskResponse(response);
    } catch (error) {
      console.error('Final risk calculation failed:', error);
      return this.getErrorResponse();
    }
  }

  buildSingaporeSpecificPrompt(cleanData) {
    return `Analyze this health data for cancer risk assessment in Singapore context:

PATIENT DATA:
Age: ${cleanData.age}
Gender: ${cleanData.gender}
Ethnicity: ${cleanData.ethnicity}
Height: ${cleanData.height} cm
Weight: ${cleanData.weight} kg
Family History: ${cleanData.familyHistory}
Smoking Status: ${cleanData.smokingStatus}
Smoking Details: ${cleanData.smokingDetails}
Alcohol Frequency: ${cleanData.alcoholFrequency}
Occupation: ${cleanData.occupation}
Location: ${cleanData.location}

SINGAPORE CONTEXT:
- Consider ethnicity-specific risk variations (Chinese: higher colorectal, liver; Malay: higher cervical; Indian: variations in breast cancer)
- Singapore cancer statistics: 1 in 4 lifetime risk, colorectal most common (16.2%), breast (14.8%)
- Environmental factors: urban living, air quality, high-stress work culture
- Local diet patterns: hawker food, high sodium, processed foods
- Healthcare access: excellent screening programs, polyclinics, subsidized care

ANALYSIS REQUIREMENTS:
1. Calculate overall cancer risk percentage (0-100%) using Singapore population data
2. Identify ethnicity-specific risk factors
3. Consider Singapore lifestyle factors (hawker diet, work stress, urban environment)
4. Provide culturally appropriate recommendations
5. Reference Singapore health resources (polyclinics, MOH guidelines)
6. Include screening recommendations per Singapore guidelines

Respond with valid JSON in this format:
{
  "riskPercentage": 25,
  "riskLevel": "Low-Moderate",
  "confidence": "Medium",
  "keyFactors": ["Age over 40", "Ethnicity-specific factors"],
  "protectiveFactors": ["Non-smoker", "Regular exercise"],
  "recommendations": ["Regular screening at polyclinics", "Improve hawker food choices"],
  "singaporeSpecific": {
    "ethnicityRisk": "Moderate adjustment for Chinese ethnicity",
    "screeningGuidelines": "Follow MOH cervical screening every 5 years",
    "localResources": ["Nearest polyclinic", "HPB programs"]
  },
  "additionalInfo": "Based on Singapore population health data",
  "disclaimer": "For educational purposes only. Consult healthcare professionals.",
  "cancerTypesAssessed": ["colorectal", "breast", "cervical"]
}`;
  }

  applySingaporeAdjustments(riskAssessment, healthData) {
    // Apply ethnicity-based risk adjustments
    if (healthData.ethnicity && healthData.age) {
      const ethnicAdjustment = this.calculateEthnicRiskAdjustment(
        healthData.ethnicity, 
        riskAssessment.cancerTypesAssessed || ['general']
      );
      
      riskAssessment.riskPercentage = Math.min(100, 
        Math.max(0, riskAssessment.riskPercentage * ethnicAdjustment)
      );
      
      if (ethnicAdjustment !== 1.0) {
        riskAssessment.keyFactors = riskAssessment.keyFactors || [];
        riskAssessment.keyFactors.push(`Ethnicity-based risk adjustment (${ethnicAdjustment}x)`);
      }
    }

    // Add Singapore-specific recommendations
    riskAssessment.recommendations = [
      ...riskAssessment.recommendations || [],
      ...this.getSingaporeSpecificRecommendations(healthData)
    ];

    return riskAssessment;
  }

  calculateEthnicRiskAdjustment(ethnicity, cancerTypes) {
    const ethnicityLower = ethnicity.toLowerCase();
    const adjustments = this.riskFactors.ethnicity[ethnicityLower];
    
    if (!adjustments) return 1.0;

    // Calculate weighted average adjustment across cancer types
    let totalAdjustment = 0;
    let count = 0;

    cancerTypes.forEach(cancerType => {
      if (adjustments[cancerType]) {
        totalAdjustment += adjustments[cancerType].riskMultiplier;
        count++;
      }
    });

    return count > 0 ? totalAdjustment / count : 1.0;
  }

  getSingaporeSpecificRecommendations(healthData) {
    const recommendations = [];

    // Screening recommendations based on age and gender
    if (healthData.gender === 'female' && parseInt(healthData.age) >= 25) {
      recommendations.push('Schedule cervical cancer screening at polyclinic');
    }
    
    if (parseInt(healthData.age) >= 50) {
      recommendations.push('Annual FIT test for colorectal cancer screening');
    }

    // Lifestyle recommendations for Singapore context
    recommendations.push('Choose healthier options at hawker centers');
    recommendations.push('Use ActiveSG facilities for regular exercise');
    
    if (healthData.smoking?.status === 'current') {
      recommendations.push('Join HPB I Quit Programme for smoking cessation');
    }

    return recommendations;
  }

  calculateDetailedFallbackRisk(cleanData) {
    let riskScore = 20; // Base risk for Singapore population

    // Age adjustment
    const age = parseInt(cleanData.age);
    if (age > 50) riskScore += 15;
    else if (age > 40) riskScore += 10;
    else if (age > 30) riskScore += 5;

    // Lifestyle factors
    if (cleanData.smokingStatus === 'current') riskScore += 25;
    if (cleanData.alcoholFrequency === 'daily') riskScore += 10;

    // BMI calculation if height and weight provided
    const height = parseFloat(cleanData.height);
    const weight = parseFloat(cleanData.weight);
    if (height && weight) {
      const bmi = this.healthUtils.calculateBMI(height, weight);
      if (bmi > 27.5) riskScore += 12;
      else if (bmi > 23) riskScore += 6;
    }

    // Ethnicity adjustment
    if (cleanData.ethnicity) {
      const adjustment = this.calculateEthnicRiskAdjustment(cleanData.ethnicity, ['colorectal', 'breast']);
      riskScore *= adjustment;
    }

    return {
      riskPercentage: Math.min(100, Math.max(0, Math.round(riskScore))),
      riskLevel: riskScore < 25 ? 'Low' : riskScore < 50 ? 'Moderate' : 'High',
      confidence: 'Medium',
      keyFactors: this.identifyKeyFactors(cleanData),
      protectiveFactors: this.identifyProtectiveFactors(cleanData),
      recommendations: this.generateFallbackRecommendations(cleanData),
      singaporeSpecific: {
        ethnicityRisk: cleanData.ethnicity ? `Adjusted for ${cleanData.ethnicity} ethnicity` : 'No ethnicity data',
        screeningGuidelines: this.getScreeningGuidelines(cleanData),
        localResources: ['Visit nearest polyclinic', 'Contact HPB health hotline 1800-567-2020']
      },
      disclaimer: 'This is a simplified assessment. Please consult healthcare professionals for accurate evaluation.',
      isError: false
    };
  }

  identifyKeyFactors(data) {
    const factors = [];
    
    if (parseInt(data.age) > 40) factors.push('Age over 40');
    if (data.smokingStatus === 'current') factors.push('Current smoker');
    if (data.familyHistory?.includes('yes')) factors.push('Family history of cancer');
    if (data.alcoholFrequency === 'daily') factors.push('Daily alcohol consumption');
    
    const height = parseFloat(data.height);
    const weight = parseFloat(data.weight);
    if (height && weight) {
      const bmi = this.healthUtils.calculateBMI(height, weight);
      if (bmi > 27.5) factors.push('Obesity (BMI > 27.5)');
    }

    return factors;
  }

  identifyProtectiveFactors(data) {
    const factors = [];
    
    if (data.smokingStatus === 'never') factors.push('Non-smoker');
    if (data.alcoholFrequency === 'never' || data.alcoholFrequency === 'rarely') {
      factors.push('Low alcohol consumption');
    }
    
    const height = parseFloat(data.height);
    const weight = parseFloat(data.weight);
    if (height && weight) {
      const bmi = this.healthUtils.calculateBMI(height, weight);
      if (bmi >= 18.5 && bmi < 23) factors.push('Healthy BMI');
    }

    return factors;
  }

  generateFallbackRecommendations(data) {
    const recommendations = [];
    
    // Universal recommendations
    recommendations.push('Maintain regular physical activity');
    recommendations.push('Follow a balanced diet rich in fruits and vegetables');
    recommendations.push('Avoid processed and red meat');
    
    // Specific recommendations based on data
    if (data.smokingStatus === 'current') {
      recommendations.push('Quit smoking - call HPB I Quit Programme 1800-438-2000');
    }
    
    if (data.alcoholFrequency === 'daily') {
      recommendations.push('Reduce alcohol consumption');
    }

    // Singapore-specific
    recommendations.push('Choose healthier options at hawker centers');
    recommendations.push('Use park connectors for walking/jogging');
    
    // Screening based on age/gender
    const age = parseInt(data.age);
    if (data.gender === 'female' && age >= 25) {
      recommendations.push('Schedule cervical cancer screening');
    }
    if (age >= 50) {
      recommendations.push('Get annual colorectal cancer screening');
    }
    if (data.gender === 'female' && age >= 40) {
      recommendations.push('Schedule regular breast cancer screening');
    }

    return recommendations;
  }

  getScreeningGuidelines(data) {
    const age = parseInt(data.age);
    const gender = data.gender;
    const guidelines = [];

    if (gender === 'female' && age >= 25) {
      if (age < 30) {
        guidelines.push('Pap test every 3 years');
      } else {
        guidelines.push('HPV test every 5 years');
      }
    }

    if (age >= 50) {
      guidelines.push('Annual FIT test for colorectal cancer');
    }

    if (gender === 'female' && age >= 40) {
      guidelines.push('Mammogram every 2 years');
    }

    return guidelines.join(', ') || 'Consult healthcare provider for appropriate screening';
  }

  async generateFollowUpMessage(riskAssessment, userData) {
    if (!riskAssessment || riskAssessment.isError) {
      return "I'd like to gather more information to provide you with a better assessment. Could you tell me about your family history of cancer?";
    }

    const messages = [
      `Based on your information, your cancer risk is ${riskAssessment.riskLevel.toLowerCase()}. `,
      `Here's what I recommend focusing on: ${riskAssessment.recommendations.slice(0, 2).join(' and ')}.`,
      ` Would you like me to explain any of these recommendations in more detail?`
    ];

    return messages.join('');
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
        singaporeSpecific: parsed.singaporeSpecific || {},
        additionalInfo: parsed.additionalInfo || '',
        disclaimer: parsed.disclaimer || 'This assessment is for educational purposes only. Please consult a healthcare professional for proper medical evaluation.',
        cancerTypesAssessed: parsed.cancerTypesAssessed || ['general'],
        isError: false,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return this.getErrorResponse();
    }
  }

  getErrorResponse() {
    return {
      isError: true,
      message: "Unable to calculate risk assessment at this time. Please try again later or consult a healthcare professional.",
      riskPercentage: 0,
      riskLevel: 'Unable to Calculate',
      confidence: 'Low',
      keyFactors: [],
      protectiveFactors: [],
      recommendations: ['Consult a healthcare professional for proper assessment'],
      disclaimer: 'Technical error occurred. Please seek professional medical advice.'
    };
  }

  async callOpenAI(prompt) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a health assessment AI specialized in cancer risk evaluation for Singapore residents. Provide accurate, culturally sensitive health information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

export default AIRiskEngine;