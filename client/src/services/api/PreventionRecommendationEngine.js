// src/services/api/PreventionRecommendationEngine.js
import { singaporeRiskFactors } from '../../data/singaporeRiskFactors.js';
// import { preventionPrograms } from '../../data/preventionPrograms.js';

class PreventionRecommendationEngine {
  constructor() {
    this.riskFactors = singaporeRiskFactors;
    this.programs = preventionPrograms;
  }

  generatePersonalizedPrevention(userData, riskAssessment) {
    const recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: [],
      screening: [],
      resources: []
    };

    // Smoking cessation (highest priority)
    if (userData.smoking?.status === 'current') {
      recommendations.immediate.push({
        priority: 'HIGH',
        category: 'Smoking Cessation',
        action: 'Quit smoking immediately',
        impact: 'Reduces cancer risk by 30-50% within 5 years',
        localProgram: this.programs.smoking_cessation,
        nextSteps: [
          'Call I Quit hotline: 1800-438-2000',
          'Visit nearest polyclinic for consultation',
          'Join smoking cessation support group'
        ]
      });
    }

    // BMI management
    const bmi = this.calculateBMI(userData.height, userData.weight);
    if (bmi && bmi > 25) {
      recommendations.shortTerm.push({
        priority: 'MEDIUM',
        category: 'Weight Management',
        action: `Reduce BMI to healthy range (current: ${bmi.toFixed(1)})`,
        impact: 'Reduces cancer risk by 15-25%',
        singaporeTips: [
          'Use Healthier Choice Symbol when shopping',
          'Choose steamed over fried at hawker centers',
          'Join ActiveSG fitness programs',
          'Walk or cycle for short distances'
        ],
        resources: [
          this.programs.healthy_diet,
          this.programs.physical_activity
        ]
      });
    }

    // Ethnicity-specific recommendations
    if (userData.ethnicity) {
      const ethnicRisks = this.riskFactors.ethnicity[userData.ethnicity.toLowerCase()];
      if (ethnicRisks) {
        this.addEthnicitySpecificRecommendations(ethnicRisks, recommendations);
      }
    }

    // Mental health (Singapore workplace stress)
    if (userData.lifestyle?.stress === 'high' || userData.occupation?.includes('finance')) {
      recommendations.longTerm.push({
        priority: 'MEDIUM',
        category: 'Stress Management',
        action: 'Develop stress management techniques',
        impact: 'Reduces cancer risk by 10-15%',
        singaporeOptions: [
          'Visit Botanic Gardens for nature therapy',
          'Join tai chi classes at Community Centers',
          'Use mindfulness apps (Calm, Headspace)',
          'Access workplace Employee Assistance Program'
        ],
        resources: [this.programs.mental_health]
      });
    }

    return recommendations;
  }

  addEthnicitySpecificRecommendations(ethnicRisks, recommendations) {
    // Add specific screening recommendations based on ethnicity
    Object.entries(ethnicRisks).forEach(([cancerType, data]) => {
      if (data.riskMultiplier > 1.1) {
        recommendations.screening.push({
          type: cancerType,
          reason: `Higher risk in your ethnic group (${(data.riskMultiplier * 100 - 100).toFixed(0)}% above average)`,
          recommendation: 'Consider earlier or more frequent screening',
          prevalence: `${data.prevalence}% of cases in Singapore`
        });
      }
    });
  }

  calculateBMI(height, weight) {
    if (!height || !weight) return null;
    const heightInM = parseFloat(height) / 100;
    return parseFloat(weight) / (heightInM * heightInM);
  }

  getLocalResources(userLocation = 'central') {
    // Return resources based on user's location in Singapore
    const resources = communityResources[userLocation] || communityResources.central;
    return resources.map(resource => ({
      ...resource,
      distance: this.calculateDistance(userLocation, resource.coordinates)
    }));
  }

  calculateDistance(userLocation, resourceCoords) {
    // Simplified distance calculation for Singapore context
    // In real implementation, use proper geolocation
    return Math.round(Math.random() * 5 + 0.5) + 'km';
  }
}


export { PreventionRecommendationEngine };