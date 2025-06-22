// src/utils/singaporeHealthUtils.js
import { singaporeRiskFactors } from '../data/singaporeRiskFactors.js';
import { screeningGuidelines } from '../data/screeningGuidelines.js';
import { communityResources } from '../data/communityResources.js';

export const singaporeHealthUtils = {
  // BMI Calculations with Singapore/Asian standards
  calculateBMI(height, weight) {
    if (!height || !weight) return null;
    const heightInM = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (heightInM * heightInM);
    return Math.round(bmi * 10) / 10;
  },

  // BMI categorization for Asian populations (Singapore standards)
  categorizeBMI(bmi) {
    if (!bmi) return 'Unknown';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 23) return 'Normal'; // Lower threshold for Asians
    if (bmi < 27.5) return 'Overweight'; // Lower threshold for Asians
    return 'Obese';
  },

  // Get BMI health status and recommendations
  getBMIHealthStatus(bmi) {
    const category = this.categorizeBMI(bmi);
    const statuses = {
      'Underweight': {
        status: 'warning',
        color: 'yellow',
        message: 'Consider consulting a nutritionist to achieve healthy weight',
        recommendations: [
          'Increase caloric intake with nutritious foods',
          'Consider strength training exercises',
          'Consult healthcare provider if unintentional weight loss'
        ]
      },
      'Normal': {
        status: 'good',
        color: 'green',
        message: 'Your BMI is in the healthy range for Asian populations',
        recommendations: [
          'Maintain current healthy lifestyle',
          'Continue regular physical activity',
          'Keep balanced nutrition'
        ]
      },
      'Overweight': {
        status: 'warning',
        color: 'yellow',
        message: 'Consider lifestyle changes to reduce health risks',
        recommendations: [
          'Aim for 5-10% weight reduction',
          'Choose healthier options at hawker centers',
          'Increase physical activity to 150 minutes/week'
        ]
      },
      'Obese': {
        status: 'alert',
        color: 'red',
        message: 'Obesity increases cancer risk - seek professional guidance',
        recommendations: [
          'Consult healthcare provider for weight management plan',
          'Consider joining HPB weight management programs',
          'Focus on sustainable lifestyle changes'
        ]
      }
    };

    return statuses[category] || statuses['Unknown'];
  },

  // Risk adjustment for Singapore ethnicity
  adjustRiskForEthnicity(baseRisk, ethnicity, cancerType) {
    if (!ethnicity || !cancerType) return baseRisk;
    
    const adjustments = singaporeRiskFactors.ethnicity[ethnicity.toLowerCase()];
    if (!adjustments || !adjustments[cancerType]) return baseRisk;

    const multiplier = adjustments[cancerType].riskMultiplier;
    return Math.round(baseRisk * multiplier);
  },

  // Get ethnicity-specific cancer risks
  getEthnicityRisks(ethnicity) {
    if (!ethnicity) return null;
    
    const risks = singaporeRiskFactors.ethnicity[ethnicity.toLowerCase()];
    if (!risks) return null;

    return Object.entries(risks).map(([cancerType, data]) => ({
      cancerType,
      riskMultiplier: data.riskMultiplier,
      prevalence: data.prevalence,
      riskLevel: data.riskMultiplier > 1.2 ? 'Higher' : 
                 data.riskMultiplier < 0.8 ? 'Lower' : 'Average',
      description: `${data.riskMultiplier > 1 ? 'Increased' : 'Decreased'} risk compared to general population`
    }));
  },

  // Screening eligibility checker
  isEligibleForScreening(userData, screeningType) {
    const age = parseInt(userData.age);
    const gender = userData.gender?.toLowerCase();

    const guidelines = screeningGuidelines[screeningType];
    if (!guidelines) return false;

    switch(screeningType) {
      case 'cervical':
        return gender === 'female' && age >= 25 && age <= 69;
      case 'breast':
        return gender === 'female' && age >= 40 && age <= 69;
      case 'colorectal':
        return age >= 50 && age <= 75;
      case 'prostate':
        return gender === 'male' && age >= 50;
      default:
        return false;
    }
  },

  // Get all eligible screenings for a user
  getEligibleScreenings(userData) {
    const screeningTypes = ['cervical', 'breast', 'colorectal', 'prostate'];
    return screeningTypes.filter(type => this.isEligibleForScreening(userData, type))
                        .map(type => ({
                          type,
                          ...screeningGuidelines[type],
                          nextDue: this.calculateNextScreeningDue(userData.lastScreening?.[type], type)
                        }));
  },

  // Next screening due date calculator
  calculateNextScreeningDue(lastScreening, screeningType) {
    if (!lastScreening) return 'Schedule now';

    const guidelines = screeningGuidelines[screeningType];
    if (!guidelines) return 'Unknown';

    // Get interval from guidelines (different intervals for different age groups)
    let intervalYears;
    if (screeningType === 'cervical') {
      intervalYears = 3; // Simplified - in reality depends on age
    } else if (screeningType === 'breast') {
      intervalYears = 2;
    } else if (screeningType === 'colorectal') {
      intervalYears = 1;
    } else {
      intervalYears = 1;
    }

    const lastDate = new Date(lastScreening);
    const nextDate = new Date(lastDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);

    const now = new Date();
    if (nextDate <= now) {
      const overdueDays = Math.floor((now - nextDate) / (1000 * 60 * 60 * 24));
      return `Overdue by ${overdueDays} days`;
    }

    return nextDate.toLocaleDateString('en-SG');
  },

  // Calculate screening compliance score
  calculateScreeningComplianceScore(userData) {
    const eligibleScreenings = this.getEligibleScreenings(userData);
    if (eligibleScreenings.length === 0) return 100; // No screenings required

    const upToDateCount = eligibleScreenings.filter(screening => 
      screening.nextDue !== 'Schedule now' && !screening.nextDue.includes('Overdue')
    ).length;

    return Math.round((upToDateCount / eligibleScreenings.length) * 100);
  },

  // Risk factor scoring
  calculateLifestyleRiskScore(userData) {
    let score = 0;

    // Smoking (highest impact)
    if (userData.smoking?.status === 'current') {
      score += 30;
    } else if (userData.smoking?.status === 'former') {
      const quitYears = userData.smoking?.quitYears || 1;
      score += Math.max(5, 20 - quitYears * 2); // Risk decreases over time
    }

    // BMI
    const bmi = this.calculateBMI(userData.height, userData.weight);
    if (bmi) {
      if (bmi > 27.5) score += 15; // Obese
      else if (bmi > 23) score += 8; // Overweight
      else if (bmi < 18.5) score += 5; // Underweight
    }

    // Alcohol consumption
    const alcoholFreq = userData.alcohol?.frequency;
    if (alcoholFreq === 'daily') score += 10;
    else if (alcoholFreq === 'regular') score += 5;

    // Physical activity
    const exercise = userData.lifestyle?.exercise;
    if (exercise === 'sedentary') score += 15;
    else if (exercise === 'light') score += 8;
    else if (exercise === 'moderate') score += 3;

    // Stress levels (important in Singapore's work culture)
    const stress = userData.lifestyle?.stress;
    if (stress === 'high') score += 8;
    else if (stress === 'medium') score += 4;

    // Diet quality
    const diet = userData.lifestyle?.diet;
    if (Array.isArray(diet)) {
      if (diet.includes('poor') || diet.includes('high_sodium')) score += 8;
      else if (diet.includes('average')) score += 4;
    }

    // Family history
    if (userData.familyHistory?.includes('yes') || userData.familyHistory?.includes('multiple')) {
      score += 12;
    } else if (userData.familyHistory?.includes('some')) {
      score += 6;
    }

    // Age factor
    const age = parseInt(userData.age);
    if (age > 65) score += 10;
    else if (age > 50) score += 6;
    else if (age > 40) score += 3;

    // Occupation-based risks (Singapore context)
    const occupation = userData.occupation?.toLowerCase();
    if (occupation?.includes('construction') || occupation?.includes('manufacturing')) {
      score += 5; // Environmental exposure risks
    }

    return Math.min(score, 100); // Cap at 100
  },

  // Prevention score calculator
  calculatePreventionScore(userData) {
    let score = 100;

    // Deduct for risk factors (inverse of risk scoring)
    const riskScore = this.calculateLifestyleRiskScore(userData);
    score -= Math.floor(riskScore * 0.7); // 70% impact on prevention score

    // Add for positive behaviors
    if (userData.lifestyle?.exercise === 'regular') score += 15;
    if (userData.lifestyle?.exercise === 'vigorous') score += 20;
    
    if (userData.lifestyle?.diet?.includes('healthy')) score += 10;
    if (userData.lifestyle?.diet?.includes('mediterranean')) score += 15;
    
    if (userData.smoking?.status === 'never') score += 10;
    
    if (userData.alcohol?.frequency === 'never' || userData.alcohol?.frequency === 'rarely') {
      score += 5;
    }

    // Screening compliance bonus
    const screeningScore = this.calculateScreeningComplianceScore(userData);
    score += Math.floor(screeningScore * 0.1); // 10% of screening compliance

    // Preventive care
    if (userData.preventiveCare?.regularCheckups) score += 5;
    if (userData.preventiveCare?.vaccinations) score += 3;

    return Math.max(0, Math.min(100, Math.round(score)));
  },

  // Format Singapore phone numbers
  formatSingaporePhone(phone) {
    if (!phone) return '';
    
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Singapore mobile numbers (8 digits starting with 8 or 9)
    if (digits.length === 8 && (digits.startsWith('8') || digits.startsWith('9'))) {
      return `+65 ${digits.slice(0, 4)} ${digits.slice(4)}`;
    }
    
    // Singapore landline (8 digits starting with 6)
    if (digits.length === 8 && digits.startsWith('6')) {
      return `+65 ${digits.slice(0, 4)} ${digits.slice(4)}`;
    }

    // International format already
    if (digits.length > 8 && digits.startsWith('65')) {
      const localNumber = digits.slice(2);
      return `+65 ${localNumber.slice(0, 4)} ${localNumber.slice(4)}`;
    }

    return phone; // Return original if not recognized format
  },

  // Get nearest healthcare facility by location and type
  getNearestHealthcareFacility(userLocation = 'central', facilityType = 'polyclinic', maxResults = 5) {
    const allFacilities = [];
    
    // Flatten all regional facilities
    Object.entries(communityResources).forEach(([region, facilities]) => {
      facilities.forEach(facility => {
        allFacilities.push({
          ...facility,
          region,
          distance: this.calculateDistance(userLocation, region)
        });
      });
    });

    // Filter by facility type if specified
    const filteredFacilities = facilityType === 'all' 
      ? allFacilities 
      : allFacilities.filter(facility => 
          facility.services?.some(service => 
            service.toLowerCase().includes(facilityType.toLowerCase())
          )
        );

    // Sort by distance and return top results
    return filteredFacilities
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults)
      .map(facility => ({
        ...facility,
        distance: `${facility.distance.toFixed(1)}km`,
        formattedPhone: this.formatSingaporePhone(facility.phone)
      }));
  },

  // Simple distance calculation (simplified for Singapore)
  calculateDistance(userLocation, facilityRegion) {
    // Mock distance calculation - in real app, use geolocation API
    const distances = {
      'central-north': 8.5,
      'central-south': 12.3,
      'central-east': 15.2,
      'central-west': 18.7,
      'north-central': 8.5,
      'north-south': 20.8,
      'north-east': 16.4,
      'north-west': 22.1,
      // Add more combinations as needed
    };

    const key = `${userLocation}-${facilityRegion}`;
    const reverseKey = `${facilityRegion}-${userLocation}`;
    
    return distances[key] || distances[reverseKey] || Math.random() * 15 + 2;
  },

  // Get health recommendations based on user profile
  getPersonalizedHealthRecommendations(userData) {
    const recommendations = [];
    const age = parseInt(userData.age);
    const gender = userData.gender?.toLowerCase();
    const bmi = this.calculateBMI(userData.height, userData.weight);

    // Screening recommendations
    const eligibleScreenings = this.getEligibleScreenings(userData);
    eligibleScreenings.forEach(screening => {
      if (screening.nextDue === 'Schedule now' || screening.nextDue.includes('Overdue')) {
        recommendations.push({
          category: 'Screening',
          priority: 'high',
          title: `${screening.type.charAt(0).toUpperCase() + screening.type.slice(1)} Cancer Screening`,
          description: `You're due for ${screening.type} cancer screening`,
          action: 'Book appointment at nearest polyclinic',
          timeline: 'Within 2 weeks'
        });
      }
    });

    // Lifestyle recommendations
    if (userData.smoking?.status === 'current') {
      recommendations.push({
        category: 'Lifestyle',
        priority: 'high',
        title: 'Smoking Cessation',
        description: 'Quitting smoking is the most effective way to reduce cancer risk',
        action: 'Join HPB I Quit Programme',
        timeline: 'Start immediately',
        resources: ['Call 1800-438-2000', 'Visit quitline.hpb.gov.sg']
      });
    }

    if (bmi && bmi > 27.5) {
      recommendations.push({
        category: 'Lifestyle',
        priority: 'medium',
        title: 'Weight Management',
        description: 'Achieving healthy weight reduces cancer risk significantly',
        action: 'Join structured weight loss program',
        timeline: '3-6 months',
        resources: ['HPB Weight Management Programme', 'Consult nutritionist at polyclinic']
      });
    }

    if (userData.lifestyle?.exercise === 'sedentary') {
      recommendations.push({
        category: 'Lifestyle',
        priority: 'medium',
        title: 'Increase Physical Activity',
        description: 'Regular exercise reduces cancer risk and improves overall health',
        action: 'Start with 150 minutes moderate exercise per week',
        timeline: 'Start this week',
        resources: ['Use ActiveSG facilities', 'Join community sports programs', 'Walk in park connectors']
      });
    }

    // Diet recommendations (Singapore context)
    if (userData.lifestyle?.diet?.includes('high_sodium') || 
        userData.lifestyle?.hawkerFrequency === 'daily') {
      recommendations.push({
        category: 'Diet',
        priority: 'medium',
        title: 'Improve Dietary Habits',
        description: 'Healthier food choices reduce cancer risk',
        action: 'Choose healthier options at hawker centers',
        timeline: 'Start today',
        tips: [
          'Request less salt and oil when ordering',
          'Choose steamed over fried options',
          'Add more vegetables to your meals',
          'Opt for brown rice instead of white rice'
        ]
      });
    }

    // Age-specific recommendations
    if (age >= 50) {
      recommendations.push({
        category: 'Health Monitoring',
        priority: 'medium',
        title: 'Regular Health Checkups',
        description: 'Regular monitoring becomes more important with age',
        action: 'Schedule annual comprehensive health screening',
        timeline: 'Every 12 months',
        resources: ['Polyclinic health screening packages', 'Executive health checkups']
      });
    }

    // Stress management (important in Singapore)
    if (userData.lifestyle?.stress === 'high') {
      recommendations.push({
        category: 'Mental Health',
        priority: 'medium',
        title: 'Stress Management',
        description: 'Chronic stress may contribute to cancer risk',
        action: 'Practice stress reduction techniques',
        timeline: 'Start this week',
        tips: [
          'Try meditation or mindfulness apps',
          'Take regular breaks from work',
          'Spend time in nature (gardens, parks)',
          'Consider counseling if needed'
        ]
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  },

  // Generate health insights based on user data
  generateHealthInsights(userData) {
    const insights = [];
    const riskScore = this.calculateLifestyleRiskScore(userData);
    const preventionScore = this.calculatePreventionScore(userData);
    const bmi = this.calculateBMI(userData.height, userData.weight);

    // Risk level insight
    if (riskScore < 25) {
      insights.push({
        type: 'positive',
        title: 'Low Cancer Risk',
        message: 'Your lifestyle choices are contributing to lower cancer risk. Keep it up!',
        icon: '✅'
      });
    } else if (riskScore > 50) {
      insights.push({
        type: 'warning',
        title: 'Elevated Cancer Risk',
        message: 'Several risk factors identified. Consider lifestyle modifications.',
        icon: '⚠️'
      });
    }

    // Prevention score insight
    if (preventionScore > 80) {
      insights.push({
        type: 'positive',
        title: 'Excellent Prevention Score',
        message: 'You\'re doing great with cancer prevention strategies!',
        icon: '🌟'
      });
    } else if (preventionScore < 60) {
      insights.push({
        type: 'improvement',
        title: 'Room for Improvement',
        message: 'There are opportunities to boost your cancer prevention efforts.',
        icon: '💪'
      });
    }

    // Screening compliance
    const screeningScore = this.calculateScreeningComplianceScore(userData);
    if (screeningScore < 70) {
      insights.push({
        type: 'action',
        title: 'Screening Due',
        message: 'You have cancer screenings that are due or overdue.',
        icon: '📅'
      });
    }

    // BMI insight
    if (bmi) {
      const bmiCategory = this.categorizeBMI(bmi);
      if (bmiCategory === 'Normal') {
        insights.push({
          type: 'positive',
          title: 'Healthy Weight',
          message: 'Your BMI is in the healthy range for Asian populations.',
          icon: '⚖️'
        });
      } else if (bmiCategory === 'Overweight' || bmiCategory === 'Obese') {
        insights.push({
          type: 'improvement',
          title: 'Weight Management Opportunity',
          message: 'Achieving healthy weight can significantly reduce cancer risk.',
          icon: '🎯'
        });
      }
    }

    return insights;
  },

  // Validate Singapore health data
  validateHealthData(userData) {
    const errors = [];
    const warnings = [];

    // Age validation
    const age = parseInt(userData.age);
    if (!age || age < 0 || age > 120) {
      errors.push('Please provide a valid age');
    }

    // Gender validation
    if (!userData.gender || !['male', 'female', 'other'].includes(userData.gender.toLowerCase())) {
      errors.push('Please specify gender');
    }

    // BMI validation
    if (userData.height && userData.weight) {
      const bmi = this.calculateBMI(userData.height, userData.weight);
      if (bmi < 10 || bmi > 60) {
        warnings.push('BMI value seems unusual. Please check height and weight entries.');
      }
    }

    // Phone number validation (Singapore)
    if (userData.phone && !this.isValidSingaporePhone(userData.phone)) {
      warnings.push('Phone number format may be incorrect for Singapore');
    }

    return { errors, warnings, isValid: errors.length === 0 };
  },

  // Validate Singapore phone number
  isValidSingaporePhone(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    
    // Singapore numbers are 8 digits, mobile starts with 8/9, landline with 6
    return digits.length === 8 && /^[689]/.test(digits);
  },

  // Get health tips for today
  getDailyHealthTip() {
    const tips = [
      {
        category: 'Diet',
        tip: 'Choose steamed fish over fried when eating at hawker centers today',
        benefit: 'Reduces harmful compounds from frying'
      },
      {
        category: 'Exercise',
        tip: 'Take the stairs instead of escalators in MRT stations',
        benefit: 'Increases daily physical activity'
      },
      {
        category: 'Hydration',
        tip: 'Drink more water in Singapore\'s tropical climate',
        benefit: 'Supports cellular health and toxin elimination'
      },
      {
        category: 'Stress',
        tip: 'Take a 5-minute walk during lunch break',
        benefit: 'Reduces stress hormones that may affect immune function'
      },
      {
        category: 'Prevention',
        tip: 'Check if you\'re due for any cancer screenings this month',
        benefit: 'Early detection saves lives'
      }
    ];

    // Return tip based on day of week for consistency
    const dayIndex = new Date().getDay();
    return tips[dayIndex % tips.length];
  }
};

export default singaporeHealthUtils;