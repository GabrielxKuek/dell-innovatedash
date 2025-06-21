// client/src/lib/healthDataUtils.js

/**
 * Utility functions for processing and validating health data
 */

// Risk level mappings
export const RISK_LEVELS = {
    LOW: { min: 0, max: 20, label: 'Low', color: 'green' },
    LOW_MODERATE: { min: 21, max: 40, label: 'Low-Moderate', color: 'yellow' },
    MODERATE: { min: 41, max: 60, label: 'Moderate', color: 'orange' },
    MODERATE_HIGH: { min: 61, max: 80, label: 'Moderate-High', color: 'red' },
    HIGH: { min: 81, max: 100, label: 'High', color: 'red' }
  };
  
  // Cancer types and their common risk factors
  export const CANCER_RISK_FACTORS = {
    breast: {
      demographic: ['age', 'gender', 'family_history'],
      lifestyle: ['alcohol', 'obesity', 'physical_activity', 'hormone_therapy'],
      medical: ['previous_breast_cancer', 'breast_density', 'reproductive_history']
    },
    cervical: {
      demographic: ['age', 'sexual_history'],
      lifestyle: ['smoking', 'hpv_infection', 'multiple_pregnancies'],
      medical: ['immunosuppression', 'oral_contraceptives', 'screening_history']
    },
    lung: {
      demographic: ['age', 'gender', 'family_history'],
      lifestyle: ['smoking', 'secondhand_smoke', 'radon_exposure', 'asbestos_exposure'],
      medical: ['previous_radiation', 'copd', 'pulmonary_fibrosis']
    }
  };
  
  /**
   * Extract demographic information from text
   */
  export const extractDemographics = (text) => {
    const demographics = {};
    const lowerText = text.toLowerCase();
  
    // Age extraction
    const agePatterns = [
      /(?:i'm|i am|age|years old|year old)\s*(\d+)/,
      /(\d+)\s*(?:years old|year old)/,
      /age\s*:?\s*(\d+)/
    ];
  
    for (const pattern of agePatterns) {
      const match = lowerText.match(pattern);
      if (match && match[1]) {
        const age = parseInt(match[1]);
        if (age >= 1 && age <= 120) {
          demographics.age = age;
          break;
        }
      }
    }
  
    // Gender extraction
    const genderPatterns = [
      /(?:i'm|i am)\s*(male|female|man|woman)/,
      /gender\s*:?\s*(male|female|man|woman)/,
      /sex\s*:?\s*(male|female|man|woman)/
    ];
  
    for (const pattern of genderPatterns) {
      const match = lowerText.match(pattern);
      if (match && match[1]) {
        let gender = match[1];
        if (gender === 'man') gender = 'male';
        if (gender === 'woman') gender = 'female';
        demographics.gender = gender;
        break;
      }
    }
  
    return Object.keys(demographics).length > 0 ? demographics : null;
  };
  
  /**
   * Extract symptoms from text
   */
  export const extractSymptoms = (text) => {
    const lowerText = text.toLowerCase();
    const symptomKeywords = {
      pain: ['pain', 'ache', 'hurt', 'sore', 'tender', 'discomfort'],
      swelling: ['swelling', 'swollen', 'lump', 'bump', 'mass', 'growth'],
      fatigue: ['tired', 'fatigue', 'exhausted', 'weak', 'weakness', 'energy'],
      gastrointestinal: ['nausea', 'sick', 'vomit', 'stomach', 'appetite', 'eating'],
      respiratory: ['cough', 'shortness of breath', 'breathing', 'chest'],
      constitutional: ['fever', 'weight loss', 'night sweats', 'chills'],
      neurological: ['headache', 'dizzy', 'dizziness', 'confusion'],
      dermatological: ['rash', 'skin', 'mole', 'spot'],
      bleeding: ['bleeding', 'blood', 'discharge']
    };
  
    const foundSymptoms = [];
    
    for (const [category, keywords] of Object.entries(symptomKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          foundSymptoms.push({ category, symptom: keyword, severity: 'unknown' });
          break; // Only add category once
        }
      }
    }
  
    return foundSymptoms.length > 0 ? {
      currentSymptoms: foundSymptoms,
      reportedAt: new Date().toISOString()
    } : null;
  };
  
  /**
   * Extract lifestyle information from text
   */
  export const extractLifestyle = (text) => {
    const lowerText = text.toLowerCase();
    const lifestyle = {};
  
    // Smoking
    if (lowerText.includes('smoke') || lowerText.includes('smoking')) {
      if (lowerText.includes('never') || lowerText.includes('don\'t smoke')) {
        lifestyle.smoking = { status: 'never' };
      } else if (lowerText.includes('quit') || lowerText.includes('stopped')) {
        lifestyle.smoking = { status: 'former' };
      } else {
        lifestyle.smoking = { status: 'current' };
      }
    }
  
    // Alcohol
    if (lowerText.includes('drink') || lowerText.includes('alcohol')) {
      const frequency = extractFrequency(lowerText);
      lifestyle.alcohol = { frequency };
    }
  
    // Exercise
    if (lowerText.includes('exercise') || lowerText.includes('workout') || lowerText.includes('gym')) {
      const frequency = extractFrequency(lowerText);
      lifestyle.exercise = { frequency };
    }
  
    return Object.keys(lifestyle).length > 0 ? lifestyle : null;
  };
  
  /**
   * Extract frequency from text
   */
  export const extractFrequency = (text) => {
    if (text.includes('daily') || text.includes('every day')) return 'daily';
    if (text.includes('weekly') || text.includes('week')) return 'weekly';
    if (text.includes('monthly') || text.includes('month')) return 'monthly';
    if (text.includes('rarely') || text.includes('seldom')) return 'rarely';
    if (text.includes('never') || text.includes('don\'t')) return 'never';
    if (text.includes('often') || text.includes('frequently')) return 'often';
    return 'occasionally';
  };
  
  /**
   * Extract family history from text
   */
  export const extractFamilyHistory = (text) => {
    const lowerText = text.toLowerCase();
    const familyMembers = ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'parent', 'sibling'];
    
    const cancerMention = lowerText.includes('cancer');
    if (!cancerMention) return null;
  
    const foundRelations = [];
    for (const member of familyMembers) {
      if (lowerText.includes(member)) {
        foundRelations.push({
          relation: member,
          condition: 'cancer',
          reportedAt: new Date().toISOString()
        });
      }
    }
  
    return foundRelations.length > 0 ? { cancerHistory: foundRelations } : null;
  };
  
  /**
   * Validate health data completeness
   */
  export const validateHealthData = (healthData) => {
    const validation = {
      isComplete: false,
      missingRequired: [],
      dataQuality: 'low',
      suggestions: []
    };
  
    const required = ['demographics.age', 'demographics.gender'];
    const recommended = ['symptoms', 'familyHistory', 'lifestyle.smoking'];
  
    // Check required fields
    for (const field of required) {
      const value = getNestedValue(healthData, field);
      if (!value) {
        validation.missingRequired.push(field);
      }
    }
  
    // Check recommended fields
    let recommendedCount = 0;
    for (const field of recommended) {
      const value = getNestedValue(healthData, field);
      if (value) recommendedCount++;
    }
  
    // Determine completeness and quality
    validation.isComplete = validation.missingRequired.length === 0;
    
    if (recommendedCount >= 3) validation.dataQuality = 'high';
    else if (recommendedCount >= 2) validation.dataQuality = 'medium';
    else validation.dataQuality = 'low';
  
    // Generate suggestions
    if (validation.missingRequired.includes('demographics.age')) {
      validation.suggestions.push('Age is required for accurate risk assessment');
    }
    if (validation.missingRequired.includes('demographics.gender')) {
      validation.suggestions.push('Gender helps determine relevant risk factors');
    }
    if (!getNestedValue(healthData, 'symptoms')) {
      validation.suggestions.push('Share any symptoms or concerns you might have');
    }
  
    return validation;
  };
  
  /**
   * Calculate basic risk score based on available data
   */
  export const calculateBasicRisk = (healthData) => {
    let riskScore = 0;
    const factors = [];
  
    // Age factor
    const age = healthData.demographics?.age;
    if (age) {
      if (age > 50) {
        riskScore += 15;
        factors.push('Age over 50');
      } else if (age > 40) {
        riskScore += 8;
        factors.push('Age over 40');
      }
    }
  
    // Family history factor
    if (healthData.familyHistory?.cancerHistory?.length > 0) {
      riskScore += 20;
      factors.push('Family history of cancer');
    }
  
    // Smoking factor
    if (healthData.lifestyle?.smoking?.status === 'current') {
      riskScore += 25;
      factors.push('Current smoking');
    } else if (healthData.lifestyle?.smoking?.status === 'former') {
      riskScore += 10;
      factors.push('Former smoking');
    }
  
    // Symptoms factor
    if (healthData.symptoms?.currentSymptoms?.length > 0) {
      riskScore += 15;
      factors.push('Reported symptoms');
    }
  
    return {
      riskPercentage: Math.min(riskScore, 100),
      riskLevel: getRiskLevel(riskScore),
      keyFactors: factors,
      confidence: factors.length >= 3 ? 'Medium' : 'Low'
    };
  };
  
  /**
   * Get risk level from percentage
   */
  export const getRiskLevel = (percentage) => {
    for (const [level, config] of Object.entries(RISK_LEVELS)) {
      if (percentage >= config.min && percentage <= config.max) {
        return config.label;
      }
    }
    return 'Unknown';
  };
  
  /**
   * Get nested object value safely
   */
  export const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };
  
  /**
   * Format health data for display
   */
  export const formatHealthDataForDisplay = (healthData) => {
    const formatted = {};
  
    if (healthData.demographics) {
      formatted.Demographics = [];
      if (healthData.demographics.age) formatted.Demographics.push(`Age: ${healthData.demographics.age}`);
      if (healthData.demographics.gender) formatted.Demographics.push(`Gender: ${healthData.demographics.gender}`);
    }
  
    if (healthData.symptoms?.currentSymptoms?.length > 0) {
      formatted.Symptoms = healthData.symptoms.currentSymptoms.map(s => s.symptom || s);
    }
  
    if (healthData.lifestyle) {
      formatted.Lifestyle = [];
      if (healthData.lifestyle.smoking) formatted.Lifestyle.push(`Smoking: ${healthData.lifestyle.smoking.status}`);
      if (healthData.lifestyle.alcohol) formatted.Lifestyle.push(`Alcohol: ${healthData.lifestyle.alcohol.frequency}`);
      if (healthData.lifestyle.exercise) formatted.Lifestyle.push(`Exercise: ${healthData.lifestyle.exercise.frequency}`);
    }
  
    if (healthData.familyHistory?.cancerHistory?.length > 0) {
      formatted['Family History'] = healthData.familyHistory.cancerHistory.map(h => `${h.relation}: ${h.condition}`);
    }
  
    return formatted;
  };
  
  export default {
    extractDemographics,
    extractSymptoms,
    extractLifestyle,
    extractFamilyHistory,
    validateHealthData,
    calculateBasicRisk,
    getRiskLevel,
    formatHealthDataForDisplay,
    RISK_LEVELS,
    CANCER_RISK_FACTORS
  };